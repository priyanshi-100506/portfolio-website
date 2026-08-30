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
  { id: "about", label: "About_Me", iconType: "file" },
  { id: "projects", label: "Projects", iconType: "folder" },
  { id: "contact", label: "Contact", iconType: "terminal" },
  { id: "resume", label: "Resume.pdf", iconType: "file" }
];

function DesktopInner() {
  const { windows, closeStartMenu, openWindow } = useWindowManager();

  const handleDesktopClick = () => closeStartMenu();

  // Auto-open About_Me 2.5s after desktop appears
  useEffect(() => {
    const t = setTimeout(() => openWindow("about"), 2500);
    return () => clearTimeout(t);
  }, [openWindow]);

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: "radial-gradient(ellipse at 30% 20%, #2a0820 0%, #12060f 60%)" }}
      onClick={handleDesktopClick}
    >
      {/* CRT scanlines overlay */}
      <div className="crt-scanlines" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />

      {/* Desktop Icons */}
      <div className="absolute top-6 left-4 flex flex-col gap-2 z-10" role="list" aria-label="Desktop icons">
        {DESKTOP_ICONS.map((icon) => (
          <div key={icon.id} role="listitem">
            <DesktopIcon {...icon} />
          </div>
        ))}
      </div>

      {/* Desktop brand watermark */}
      <div className="absolute bottom-[52px] right-4 text-right pointer-events-none" aria-hidden="true">
        <p className="font-vt323 text-2xl text-[#ff4fa3]/20 tracking-widest">PRIYANSHI_OS</p>
        <p className="font-vt323 text-xs text-[#ff4fa3]/15 tracking-wider">v1.0 · ALL SYSTEMS GO</p>
      </div>

      {/* Open Windows */}
      {Object.values(windows).map((w) =>
        w.isOpen ? <Window key={w.id} windowState={w} /> : null
      )}

      {/* Start Menu */}
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
