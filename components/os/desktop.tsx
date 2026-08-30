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
      {/* ── Background video ── */}
      <video
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
      >
        <source src="/media/intelligence-field.mp4" type="video/mp4" />
      </video>

      {/* Very subtle dark bleed only at bottom so taskbar text stays legible */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(18,6,15,0.75) 0%, transparent 100%)" }}
      />

      {/* CRT scanlines + vignette */}
      <div className="crt-scanlines" aria-hidden="true" />
      <div className="crt-vignette"  aria-hidden="true" />

      {/* Desktop icons — left column */}
      <nav
        aria-label="Desktop icons"
        className="absolute top-6 left-4 flex flex-col gap-1 z-10"
      >
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIcon key={icon.id} {...icon} />
        ))}
      </nav>

      {/* Brand watermark bottom-right */}
      <div className="absolute bottom-[52px] right-4 text-right pointer-events-none" aria-hidden="true">
        <p className="font-vt323 text-2xl text-[#ff4fa3]/18 tracking-widest">PRIYANSHI_OS</p>
        <p className="font-vt323 text-xs text-[#ff4fa3]/12 tracking-wider">v1.0 · ALL SYSTEMS GO</p>
      </div>

      {/* Open Windows (rendered in z-index order) */}
      {Object.values(windows)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((w) => w.isOpen ? <Window key={w.id} windowState={w} /> : null)}

      {/* Start Menu (above taskbar) */}
      <StartMenu />

      {/* Taskbar */}
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
