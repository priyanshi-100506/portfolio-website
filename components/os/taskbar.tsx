"use client";

import React, { useState, useEffect } from "react";
import { useWindowManager } from "./window-manager-context";
import { WindowId } from "./types";
import { PixelFile, PixelFolder, PixelTerminal } from "./pixel-icons";
import { SilkFlower } from "@/components/silk-flower";

export function Taskbar() {
  const {
    windows,
    activeWindowId,
    isStartMenuOpen,
    toggleStartMenu,
    focusWindow,
    minimizeWindow,
    restoreWindow
  } = useWindowManager();

  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTimeStr(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openWindows = Object.values(windows).filter((w) => w.isOpen);

  const handleTabClick = (id: WindowId) => {
    const w = windows[id];
    if (!w) return;

    if (w.isMinimized) {
      restoreWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const getTabIcon = (id: WindowId) => {
    switch (id) {
      case "about":
        return <PixelFile className="w-3.5 h-3.5" />;
      case "projects":
        return <PixelFolder className="w-3.5 h-3.5" />;
      case "contact":
        return <PixelTerminal className="w-3.5 h-3.5" />;
      case "resume":
        return <PixelFile className="w-3.5 h-3.5" />;
    }
  };

  return (
    <footer
      role="region"
      aria-label="Desktop Taskbar"
      className="fixed bottom-0 inset-x-0 h-[44px] z-[9995] bg-[#1a0816] border-t-2 border-[#ff4fa3] flex items-center justify-between px-2 gap-2 font-mono select-none"
    >
      {/* Left: START Button */}
      <div className="flex items-center">
        <button
          id="os-start-button"
          type="button"
          aria-expanded={isStartMenuOpen}
          aria-label="Toggle Start Menu"
          onClick={toggleStartMenu}
          className={`flex items-center justify-center w-10 h-8 border-2 transition active:translate-x-0.5 active:translate-y-0.5 ${
            isStartMenuOpen
              ? "bg-[#ff4fa3] border-[#ff85be] shadow-[inset_2px_2px_0px_#8b1d5c]"
              : "bg-[#12060f] border-[#ff4fa3] shadow-[2px_2px_0px_#000000] hover:bg-[#ff4fa3]/20"
          }`}
        >
          <SilkFlower
            size={20}
            className={`transition-transform duration-300 ${
              isStartMenuOpen ? "text-[#12060f] rotate-45" : "text-[#ff85be] hover:text-white"
            }`}
          />
        </button>
      </div>

      {/* Center: Open Window Tabs */}
      <div className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {openWindows.map((w) => {
          const isActive = activeWindowId === w.id && !w.isMinimized;
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => handleTabClick(w.id)}
              aria-label={`Switch to ${w.title}`}
              className={`flex items-center gap-2 px-2.5 py-1 text-xs font-vt323 tracking-wide truncate max-w-[160px] sm:max-w-[200px] border transition ${
                isActive
                  ? "bg-[#ff4fa3] text-[#12060f] border-[#ff85be] font-bold shadow-[inset_1px_1px_0px_#8b1d5c]"
                  : w.isMinimized
                  ? "bg-[#12060f]/60 text-[#c2a9ba] border-[#ff4fa3]/30 hover:border-[#ff4fa3]"
                  : "bg-[#12060f] text-[#f5e9f0] border-[#ff4fa3]/60 hover:bg-[#ff4fa3]/20 shadow-[1px_1px_0px_#000000]"
              }`}
            >
              <span className={isActive ? "text-[#12060f]" : "text-[#ff85be]"}>
                {getTabIcon(w.id)}
              </span>
              <span className="truncate">{w.filename}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Tray & Digital Clock */}
      <div className="flex items-center gap-2.5 shrink-0 bg-[#12060f] border border-[#ff4fa3]/40 px-2.5 py-1 shadow-[inset_1px_1px_0px_rgba(0,0,0,0.8)]">
        <span className="hidden sm:inline-block w-2 h-2 rounded-none bg-[#ff4fa3] animate-pulse" />
        <span className="text-xs sm:text-sm font-vt323 tracking-widest text-[#ff85be] font-bold">
          {timeStr || "00:00:00"}
        </span>
      </div>
    </footer>
  );
}
