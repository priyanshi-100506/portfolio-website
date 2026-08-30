"use client";

import React, { useEffect, useRef } from "react";
import { WindowId } from "./types";

interface ContextMenuProps {
  x: number;
  y: number;
  soundEnabled: boolean;
  onClose: () => void;
  onRefreshIcons: () => void;
  onToggleSound: () => void;
  onAbout: () => void;
}

export function ContextMenu({
  x, y,
  soundEnabled,
  onClose,
  onRefreshIcons,
  onToggleSound,
  onAbout,
}: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    const handleDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("pointerdown", handleDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  // Clamp to viewport
  const menuW = 200;
  const menuH = 160;
  const cx = Math.min(x, window.innerWidth  - menuW - 8);
  const cy = Math.min(y, window.innerHeight - menuH - 8);

  const item = (label: string, onClick: () => void, accent?: boolean) => (
    <button
      key={label}
      type="button"
      onClick={() => { onClick(); onClose(); }}
      className={`w-full text-left px-4 py-2 font-vt323 text-base tracking-wider transition-colors
        ${accent
          ? "text-[#ff85be] hover:bg-[#ff4fa3] hover:text-[#12060f]"
          : "text-[#f5e9f0] hover:bg-[#ff4fa3]/30 hover:text-white"
        }`}
    >
      {label}
    </button>
  );

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Desktop context menu"
      style={{ position: "fixed", left: cx, top: cy, zIndex: 99990, width: menuW }}
      className="bg-[#1a0816] border-2 border-[#ff4fa3] shadow-[4px_4px_0px_rgba(0,0,0,0.9)] py-1 flex flex-col"
    >
      {/* Header */}
      <div className="px-4 py-1 border-b border-[#ff4fa3]/30 font-vt323 text-xs text-[#ff4fa3]/60 tracking-widest uppercase">
        Desktop
      </div>

      {item("⟳  Refresh Icons", onRefreshIcons)}
      {item("♪  Sound: " + (soundEnabled ? "ON" : "OFF"), onToggleSound, !soundEnabled)}
      <div className="border-t border-[#ff4fa3]/20 my-1" />
      {item("?  About This OS", onAbout)}
    </div>
  );
}

// ── "About This OS" modal ────────────────────────────────────────────────────
export function AboutOSModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[99995] flex items-center justify-center"
      style={{ background: "rgba(18,6,15,0.7)" }}
      onClick={onClose}
    >
      <div
        className="bg-[#160814] border-2 border-[#ff4fa3] shadow-[6px_6px_0px_rgba(0,0,0,0.9)] w-[340px] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-[#ff4fa3] to-[#8b1d5c] border-b-2 border-[#ff4fa3]">
          <span className="font-vt323 text-lg text-white tracking-wider">About PRIYANSHI_OS</span>
          <button type="button" onClick={onClose}
            className="w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-[#12060f] text-[#ff85be] border border-[#ff85be]/60 hover:bg-[#ff4fa3] hover:text-[#12060f]">
            ✕
          </button>
        </div>
        {/* Body */}
        <div className="p-5 font-mono text-sm text-[#f5e9f0]/80 space-y-3">
          <div className="font-vt323 text-3xl text-[#ff4fa3] tracking-widest text-center">
            PRIYANSHI_OS
          </div>
          <div className="text-center font-vt323 text-[#ff85be]/70 text-sm tracking-widest">
            Version 1.0.0 · Build 2024
          </div>
          <hr className="border-[#ff4fa3]/20" />
          <p className="text-xs leading-relaxed text-[#f5e9f0]/70">
            A personal portfolio disguised as a retro operating system.
            Built with Next.js, TypeScript, and too much magenta.
          </p>
          <p className="text-xs leading-relaxed text-[#f5e9f0]/70">
            Drag icons. Open windows. Pretend it's 1994.
          </p>
          <hr className="border-[#ff4fa3]/20" />
          <p className="text-xs text-[#ff85be]/60 text-center">
            © 2024 Priyanshi Shah · All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
