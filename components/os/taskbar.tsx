"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useWindowManager } from "./window-manager-context";
import { WindowId } from "./types";
import { PixelFile, PixelFolder, PixelTerminal } from "./pixel-icons";
import { SilkFlower } from "@/components/silk-flower";
import { isSoundEnabled, setSoundEnabled, playSound } from "./sound-manager";

// ── Typing status ticker ─────────────────────────────────────────────────────
const MESSAGES = [
  "system ready.",
  "drag icons to arrange.",
  "double-click to open.",
  "backend engineer + applied ai.",
  "available for opportunities.",
  "right-click for options.",
  "priyanshicshah@gmail.com",
];

function TypingTicker() {
  const [display, setDisplay]  = useState("");
  const [msgIdx, setMsgIdx]    = useState(0);
  const [phase, setPhase]      = useState<"typing" | "pause" | "erasing">("typing");
  const charRef = useRef(0);

  useEffect(() => {
    const msg = MESSAGES[msgIdx];

    if (phase === "typing") {
      if (charRef.current > msg.length) {
        setPhase("pause");
        return;
      }
      const t = setTimeout(() => {
        setDisplay(msg.slice(0, charRef.current));
        charRef.current++;
      }, 55 + Math.random() * 35);
      return () => clearTimeout(t);
    }

    if (phase === "pause") {
      const t = setTimeout(() => setPhase("erasing"), 2800);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (charRef.current < 0) {
        charRef.current = 0;
        setMsgIdx((i) => (i + 1) % MESSAGES.length);
        setPhase("typing");
        return;
      }
      const t = setTimeout(() => {
        setDisplay(msg.slice(0, charRef.current));
        charRef.current--;
      }, 28);
      return () => clearTimeout(t);
    }
  }, [display, phase, msgIdx]);

  return (
    <span className="font-vt323 text-sm text-[#ff4fa3]/60 tracking-wider hidden sm:inline truncate max-w-[200px]">
      <span className="text-[#ff4fa3]/30 mr-1">›</span>
      {display}
      <span className="animate-pulse text-[#ff4fa3]/70">_</span>
    </span>
  );
}

// ── Taskbar ──────────────────────────────────────────────────────────────────
export function Taskbar() {
  const {
    windows, activeWindowId, isStartMenuOpen,
    toggleStartMenu, focusWindow, minimizeWindow, restoreWindow,
  } = useWindowManager();

  const [timeStr, setTimeStr]     = useState("");
  const [soundOn, setSoundOn]     = useState(isSoundEnabled);

  // Clock
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTimeStr(
        `${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleSound = useCallback(() => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSound("click");
  }, [soundOn]);

  const openWindows = Object.values(windows).filter((w) => w.isOpen);

  const handleTabClick = (id: WindowId) => {
    const w = windows[id];
    if (!w) return;
    if (w.isMinimized) { restoreWindow(id); }
    else if (activeWindowId === id) { minimizeWindow(id); }
    else { focusWindow(id); }
  };

  const getTabIcon = (id: WindowId) => {
    switch (id) {
      case "projects": return <PixelFolder  className="w-3.5 h-3.5 shrink-0" />;
      case "contact":  return <PixelTerminal className="w-3.5 h-3.5 shrink-0" />;
      default:         return <PixelFile     className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  return (
    <footer
      role="region"
      aria-label="Desktop Taskbar"
      className="fixed bottom-0 inset-x-0 h-[44px] z-[9995] bg-[#1a0816] border-t-2 border-[#ff4fa3] flex items-center gap-2 px-2 font-mono select-none"
    >
      {/* Start button */}
      <button
        id="os-start-button"
        type="button"
        aria-expanded={isStartMenuOpen}
        aria-label="Toggle Start Menu"
        onClick={toggleStartMenu}
        className={`flex items-center justify-center w-10 h-8 border-2 transition shrink-0 active:translate-x-0.5 active:translate-y-0.5
          ${isStartMenuOpen
            ? "bg-[#ff4fa3] border-[#ff85be] shadow-[inset_2px_2px_0px_#8b1d5c]"
            : "bg-[#12060f] border-[#ff4fa3] shadow-[2px_2px_0px_#000000] hover:bg-[#ff4fa3]/20"}`}
      >
        <SilkFlower size={20}
          className={`transition-transform duration-300 ${isStartMenuOpen ? "text-[#12060f] rotate-45" : "text-[#ff85be]"}`}
        />
      </button>

      {/* Separator */}
      <div className="w-px h-6 bg-[#ff4fa3]/30 shrink-0" />

      {/* Window tabs */}
      <div className="flex-1 flex items-center gap-1.5 overflow-x-auto overflow-y-hidden py-1 no-scrollbar min-w-0">
        {openWindows.map((w) => {
          const isActive = activeWindowId === w.id && !w.isMinimized;
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => handleTabClick(w.id)}
              title={w.title}
              className={`flex items-center gap-1.5 px-2 h-7 text-xs font-vt323 tracking-wider border transition shrink-0 max-w-[140px] truncate
                ${isActive
                  ? "bg-[#ff4fa3]/20 border-[#ff4fa3] text-[#ff85be] shadow-[inset_1px_1px_0px_#8b1d5c]"
                  : w.isMinimized
                  ? "bg-transparent border-[#ff4fa3]/30 text-[#f5e9f0]/40 hover:border-[#ff4fa3]/60"
                  : "bg-transparent border-[#ff4fa3]/40 text-[#f5e9f0]/70 hover:bg-[#ff4fa3]/10 hover:border-[#ff4fa3]/70"}`}
            >
              {getTabIcon(w.id)}
              <span className="truncate">{w.filename}</span>
            </button>
          );
        })}
      </div>

      {/* Typing ticker */}
      <TypingTicker />

      {/* Separator */}
      <div className="w-px h-6 bg-[#ff4fa3]/30 shrink-0" />

      {/* Sound toggle */}
      <button
        type="button"
        onClick={toggleSound}
        title={soundOn ? "Mute sounds" : "Enable sounds"}
        aria-label={soundOn ? "Mute sounds" : "Enable sounds"}
        className="w-7 h-7 flex items-center justify-center text-[13px] border border-[#ff4fa3]/40 hover:border-[#ff4fa3] hover:bg-[#ff4fa3]/10 transition shrink-0"
      >
        {soundOn ? "♪" : "♩"}
      </button>

      {/* Clock */}
      <div className="font-vt323 text-sm text-[#ff85be] tracking-widest shrink-0 border border-[#ff4fa3]/30 px-2 h-7 flex items-center">
        {timeStr || "00:00:00"}
      </div>
    </footer>
  );
}
