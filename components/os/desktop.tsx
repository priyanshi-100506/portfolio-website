"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { WindowManagerProvider, useWindowManager } from "./window-manager-context";
import { BootSequence } from "./boot-sequence";
import { DesktopIcon } from "./desktop-icon";
import { Window } from "./window";
import { Taskbar } from "./taskbar";
import { StartMenu } from "./start-menu";
import { ContextMenu, AboutOSModal } from "./context-menu";
import { Screensaver, useIdleScreensaver } from "./screensaver";
import { MusicPlayerWidget } from "./music-player";
import { WindowId } from "./types";
import { isSoundEnabled, setSoundEnabled, useSoundEnabled } from "./sound-manager";

const DESKTOP_ICONS: { id: WindowId; label: string; iconType: "folder" | "file" | "terminal" }[] = [
  { id: "about",    label: "About_Me",   iconType: "file" },
  { id: "projects", label: "Projects",   iconType: "folder" },
  { id: "contact",  label: "Contact",    iconType: "terminal" },
  { id: "resume",   label: "Resume.pdf", iconType: "file" }
];
const ICON_W  = 96;
const ICON_H  = 104;
const TASKBAR = 52;

export interface IconPos { x: number; y: number }

// ── Main desktop surface ─────────────────────────────────────────────────────
function DesktopInner() {
  const { windows, closeStartMenu, openWindow } = useWindowManager();
  const [iconPositions, setIconPositions] = useState<Partial<Record<WindowId, IconPos>>>({});

  // Context menu state
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [soundEnabled, setSoundState] = useState(isSoundEnabled);

  // Screensaver
  const { active: screensaverActive, dismiss: dismissScreensaver } = useIdleScreensaver();

  // Scatter icons on first mount
  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const positions: Partial<Record<WindowId, IconPos>> = {};
    DESKTOP_ICONS.forEach((icon) => {
      positions[icon.id] = {
        x: Math.round(20 + Math.random() * Math.max(0, vw - ICON_W - 40)),
        y: Math.round(20 + Math.random() * Math.max(0, vh - TASKBAR - ICON_H - 40)),
      };
    });
    setIconPositions(positions);
  }, []);

  const handleIconMove = useCallback((id: WindowId, pos: IconPos) => {
    setIconPositions((prev) => ({ ...prev, [id]: pos }));
  }, []);

  // Re-scatter icons
  const refreshIcons = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const positions: Partial<Record<WindowId, IconPos>> = {};
    DESKTOP_ICONS.forEach((icon) => {
      positions[icon.id] = {
        x: Math.round(20 + Math.random() * Math.max(0, vw - ICON_W - 40)),
        y: Math.round(20 + Math.random() * Math.max(0, vh - TASKBAR - ICON_H - 40)),
      };
    });
    setIconPositions(positions);
  }, []);

  const toggleSound = useCallback(() => {
    const next = !soundEnabled;
    setSoundState(next);
    setSoundEnabled(next);
  }, [soundEnabled]);

  // Auto-open About_Me 2.5s after boot
  useEffect(() => {
    const t = setTimeout(() => openWindow("about"), 2500);
    return () => clearTimeout(t);
  }, [openWindow]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    closeStartMenu();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDesktopClick = () => {
    closeStartMenu();
    setCtxMenu(null);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      {/* Background video */}
      <video
        aria-hidden="true"
        autoPlay loop muted playsInline preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
      >
        <source src="/media/intelligence-field.mp4" type="video/mp4" />
      </video>

      {/* Bottom bleed */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(18,6,15,0.75) 0%, transparent 100%)" }}
      />

      {/* CRT overlays */}
      <div className="crt-scanlines" aria-hidden="true" />
      <div className="crt-vignette"  aria-hidden="true" />

      {/* Draggable icons */}
      {DESKTOP_ICONS.map((icon) => {
        const pos = iconPositions[icon.id];
        if (!pos) return null;
        return (
          <DesktopIcon key={icon.id} {...icon} pos={pos} onMove={handleIconMove} />
        );
      })}

      {/* Brand watermark - Centered and glowing */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -z-10" aria-hidden="true">
        <p className="font-vt323 text-7xl sm:text-9xl text-white/30 font-bold tracking-[0.2em] mix-blend-screen"
           style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.5)" }}>
          PRIYANSHI SHAH
        </p>
      </div>

      {/* Widgets */}
      <MusicPlayerWidget />

      {/* Open Windows */}
      {Object.values(windows)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((w) => w.isOpen ? <Window key={w.id} windowState={w} /> : null)}

      <StartMenu />
      <Taskbar />

      {/* Right-click context menu */}
      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          soundEnabled={soundEnabled}
          onClose={() => setCtxMenu(null)}
          onRefreshIcons={refreshIcons}
          onToggleSound={toggleSound}
          onAbout={() => setShowAbout(true)}
        />
      )}

      {/* About OS modal */}
      {showAbout && <AboutOSModal onClose={() => setShowAbout(false)} />}

      {/* Screensaver */}
      {screensaverActive && <Screensaver onDismiss={dismissScreensaver} />}
    </div>
  );
}

// ── Root export ──────────────────────────────────────────────────────────────
export function Desktop() {
  const [booted, setBooted] = useState(false);
  const handleBootComplete = useCallback(() => setBooted(true), []);
  
  const soundEnabled = useSoundEnabled();
  const bgMusicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (bgMusicRef.current) {
      if (soundEnabled) {
        bgMusicRef.current.volume = 0.15;
        bgMusicRef.current.play().catch(() => {
          // Play requires user interaction; if it fails, it will play on next interaction
          const playOnInteract = () => {
            bgMusicRef.current?.play().catch(() => {});
            document.removeEventListener("pointerdown", playOnInteract);
            document.removeEventListener("keydown", playOnInteract);
          };
          document.addEventListener("pointerdown", playOnInteract);
          document.addEventListener("keydown", playOnInteract);
        });
      } else {
        bgMusicRef.current.pause();
      }
    }
  }, [soundEnabled]);

  useEffect(() => {
    const handleRestart = () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.currentTime = 0;
        if (!soundEnabled) {
          // If it was paused, maybe the user wants it to start playing when they hit restart?
          // For now, let's just reset the time.
        }
      }
    };
    window.addEventListener("os-sound-restart", handleRestart);
    return () => window.removeEventListener("os-sound-restart", handleRestart);
  }, [soundEnabled]);

  return (
    <WindowManagerProvider>
      <audio ref={bgMusicRef} src="/media/dont_you.mp3" loop preload="auto" />
      <BootSequence onComplete={handleBootComplete} />
      {booted && <DesktopInner />}
    </WindowManagerProvider>
  );
}
