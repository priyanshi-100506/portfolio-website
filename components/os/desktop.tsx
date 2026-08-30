"use client";

import React, { useState, useEffect, useCallback } from "react";
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

function DesktopInner() {
  const { windows, closeStartMenu, openWindow } = useWindowManager();
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>({});

  // Scatter icons randomly on first mount
  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const TASKBAR = 52;
    const ICON_W = 96;
    const ICON_H = 100;
    const positions: Record<string, { x: number; y: number }> = {};
    DESKTOP_ICONS.forEach((icon) => {
      positions[icon.id] = {
        x: Math.round(20 + Math.random() * Math.max(0, vw - ICON_W - 40)),
        y: Math.round(20 + Math.random() * Math.max(0, vh - TASKBAR - ICON_H - 40)),
      };
    });
    setIconPositions(positions);
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

      {/* Desktop icons — scattered */}
      {DESKTOP_ICONS.map((icon) => {
        const pos = iconPositions[icon.id];
        if (!pos) return null;
        return (
          <div
            key={icon.id}
            className="absolute z-10"
            style={{ left: pos.x, top: pos.y }}
          >
            <DesktopIcon {...icon} />
          </div>
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
