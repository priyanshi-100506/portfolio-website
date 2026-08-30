"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { WindowManagerProvider, useWindowManager } from "./window-manager-context";
import { BootSequence } from "./boot-sequence";
import { DesktopIcon } from "./desktop-icon";
import { Window } from "./window";
import { Taskbar } from "./taskbar";
import { StartMenu } from "./start-menu";
import { WindowId } from "./types";

const DESKTOP_ICONS: { id: WindowId; label: string; iconType: "folder" | "file" | "terminal" }[] = [
  { id: "about",    label: "About_Me",   iconType: "file" },
  { id: "projects", label: "Projects",   iconType: "folder" },
  { id: "contact",  label: "Contact",    iconType: "terminal" },
  { id: "resume",   label: "Resume.pdf", iconType: "file" }
];

const ICON_W = 96;
const ICON_H = 104;
const TASKBAR_H = 52;
const DRAG_THRESHOLD = 5; // px — below this we treat pointer-up as a click, not a drag

interface IconPos { x: number; y: number }

// ── Draggable wrapper for a single desktop icon ───────────────────────────────
interface DraggableIconWrapperProps {
  icon: typeof DESKTOP_ICONS[number];
  pos: IconPos;
  onMove: (id: WindowId, pos: IconPos) => void;
}

function DraggableIconWrapper({ icon, pos, onMove }: DraggableIconWrapperProps) {
  const drag = useRef({
    active: false,
    moved: false,
    sx: 0, sy: 0,   // start client position
    px: 0, py: 0,   // start icon position
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { active: true, moved: false, sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.sx;
    const dy = e.clientY - drag.current.sy;
    if (!drag.current.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
      drag.current.moved = true;
    }
    if (drag.current.moved) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      onMove(icon.id, {
        x: Math.max(0, Math.min(vw - ICON_W, drag.current.px + dx)),
        y: Math.max(0, Math.min(vh - TASKBAR_H - ICON_H, drag.current.py + dy)),
      });
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* */ }
    drag.current.active = false;
  };

  // If the pointer moved enough to count as a drag, intercept the click before
  // DesktopIcon's own click handler fires, so the window doesn't open on drag-end.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div
      style={{ position: "absolute", left: pos.x, top: pos.y, zIndex: 10, touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
    >
      <DesktopIcon {...icon} />
    </div>
  );
}

// ── Main desktop surface ──────────────────────────────────────────────────────
function DesktopInner() {
  const { windows, closeStartMenu, openWindow } = useWindowManager();
  const [iconPositions, setIconPositions] = useState<Partial<Record<WindowId, IconPos>>>({});

  // Scatter icons randomly on first mount
  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const positions: Partial<Record<WindowId, IconPos>> = {};
    DESKTOP_ICONS.forEach((icon) => {
      positions[icon.id] = {
        x: Math.round(20 + Math.random() * Math.max(0, vw - ICON_W - 40)),
        y: Math.round(20 + Math.random() * Math.max(0, vh - TASKBAR_H - ICON_H - 40)),
      };
    });
    setIconPositions(positions);
  }, []);

  const handleIconMove = useCallback((id: WindowId, pos: IconPos) => {
    setIconPositions((prev) => ({ ...prev, [id]: pos }));
  }, []);

  // Auto-open About_Me 2.5s after boot
  useEffect(() => {
    const t = setTimeout(() => openWindow("about"), 2500);
    return () => clearTimeout(t);
  }, [openWindow]);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      onClick={closeStartMenu}
    >
      {/* Background video */}
      <video
        aria-hidden="true"
        autoPlay loop muted playsInline preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
      >
        <source src="/media/intelligence-field.mp4" type="video/mp4" />
      </video>

      {/* Bottom bleed for taskbar legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(18,6,15,0.75) 0%, transparent 100%)" }}
      />

      {/* CRT scanlines + vignette */}
      <div className="crt-scanlines" aria-hidden="true" />
      <div className="crt-vignette"  aria-hidden="true" />

      {/* Desktop icons — draggable, scattered */}
      {DESKTOP_ICONS.map((icon) => {
        const pos = iconPositions[icon.id];
        if (!pos) return null;
        return (
          <DraggableIconWrapper
            key={icon.id}
            icon={icon}
            pos={pos}
            onMove={handleIconMove}
          />
        );
      })}

      {/* Brand watermark */}
      <div className="absolute bottom-[52px] right-4 text-right pointer-events-none" aria-hidden="true">
        <p className="font-vt323 text-2xl text-[#ff4fa3]/20 tracking-widest">PRIYANSHI_OS</p>
        <p className="font-vt323 text-xs text-[#ff4fa3]/15 tracking-wider">v1.0 · ALL SYSTEMS GO</p>
      </div>

      {/* Open Windows */}
      {Object.values(windows)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((w) => w.isOpen ? <Window key={w.id} windowState={w} /> : null)}

      <StartMenu />
      <Taskbar />
    </div>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────
export function Desktop() {
  const [booted, setBooted] = useState(false);
  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <WindowManagerProvider>
      <BootSequence onComplete={handleBootComplete} />
      {booted && <DesktopInner />}
    </WindowManagerProvider>
  );
}
