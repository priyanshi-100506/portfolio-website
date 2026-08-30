"use client";

import React, { useEffect, useRef } from "react";
import { useWindowManager } from "./window-manager-context";
import { WindowId } from "./types";
import { PixelFile, PixelFolder, PixelTerminal } from "./pixel-icons";

export function StartMenu() {
  const { isStartMenuOpen, closeStartMenu, openWindow } = useWindowManager();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // Don't close if clicking start button itself (it handles toggle)
        const startBtn = document.getElementById("os-start-button");
        if (startBtn && startBtn.contains(e.target as Node)) return;
        closeStartMenu();
      }
    };

    if (isStartMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isStartMenuOpen, closeStartMenu]);

  if (!isStartMenuOpen) return null;

  const menuItems: { id: WindowId; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: "about",
      label: "About_Me.txt",
      icon: <PixelFile className="w-5 h-5" />,
      desc: "Bio & Technical Skills"
    },
    {
      id: "projects",
      label: "Projects",
      icon: <PixelFolder className="w-5 h-5" />,
      desc: "ATHENA, METIS, DOXA"
    },
    {
      id: "contact",
      label: "Contact",
      icon: <PixelTerminal className="w-5 h-5" />,
      desc: "Direct Channels & Ports"
    },
    {
      id: "resume",
      label: "Resume.pdf",
      icon: <PixelFile className="w-5 h-5" />,
      desc: "Credentials & Export"
    }
  ];

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Start menu"
      className="fixed bottom-[44px] left-0 z-[9990] w-64 sm:w-72 bg-[#160814] border-2 border-[#ff4fa3] shadow-[6px_6px_0px_rgba(0,0,0,0.9)] flex font-mono select-none"
    >
      {/* Side Banner */}
      <div className="w-9 bg-gradient-to-t from-[#8b1d5c] to-[#ff4fa3] flex items-end justify-center pb-4 text-white font-vt323 tracking-widest text-lg border-r-2 border-[#ff4fa3]">
        <span className="-rotate-90 origin-center whitespace-nowrap font-bold">
          PRIYANSHI_OS
        </span>
      </div>

      {/* Menu Options */}
      <div className="flex-1 p-2 space-y-1">
        <div className="px-2 py-1 border-b border-[#ff4fa3]/30 text-[11px] text-[#ff85be] font-vt323 tracking-wider">
          PROGRAMS & FILES
        </div>

        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            onClick={() => {
              openWindow(item.id);
            }}
            className="w-full flex items-center gap-3 p-2 text-left hover:bg-[#ff4fa3] hover:text-[#12060f] group transition active:translate-x-0.5"
          >
            <div className="text-[#ff4fa3] group-hover:text-[#12060f] shrink-0">
              {item.icon}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-vt323 tracking-wider font-bold truncate text-[#f5e9f0] group-hover:text-[#12060f]">
                {item.label}
              </div>
              <div className="text-[10px] text-[#c2a9ba] group-hover:text-[#12060f]/80 truncate">
                {item.desc}
              </div>
            </div>
          </button>
        ))}

        <div className="pt-2 border-t border-[#ff4fa3]/30 px-2 text-[10px] text-[#c2a9ba] font-vt323 flex items-center justify-between">
          <span>v1.0.0-RELEASE</span>
          <span className="text-[#ff4fa3]">SYSTEM READY</span>
        </div>
      </div>
    </div>
  );
}
