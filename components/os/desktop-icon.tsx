"use client";

import React, { useState, useRef } from "react";
import { WindowId } from "./types";
import { useWindowManager } from "./window-manager-context";
import { PixelFile, PixelFolder, PixelTerminal } from "./pixel-icons";

interface DesktopIconProps {
  id: WindowId;
  label: string;
  iconType: "folder" | "file" | "terminal";
}

export function DesktopIcon({ id, label, iconType }: DesktopIconProps) {
  const { openWindow } = useWindowManager();
  const [isSelected, setIsSelected] = useState(false);
  const lastTapRef = useRef<number>(0);

  const handleOpen = () => {
    openWindow(id);
    setIsSelected(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleOpen();
  };

  // Touch support for double-tap
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 350;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      handleOpen();
    } else {
      setIsSelected(true);
    }
    lastTapRef.current = now;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  const renderIcon = () => {
    switch (iconType) {
      case "folder":
        return <PixelFolder className="w-11 h-11 text-[#e2dce0] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />;
      case "terminal":
        return <PixelTerminal className="w-11 h-11 text-[#e2dce0] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />;
      case "file":
      default:
        return <PixelFile className="w-11 h-11 text-[#e2dce0] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />;
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open ${label}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      onBlur={() => setIsSelected(false)}
      className={`group flex flex-col items-center justify-center w-20 sm:w-24 p-2 cursor-pointer transition select-none outline-none ${
        isSelected
          ? "bg-[#ff4fa3]/25 border border-[#ff4fa3] shadow-[2px_2px_0px_#ff4fa3]"
          : "hover:bg-[#ff4fa3]/10 border border-transparent hover:border-[#ff4fa3]/30"
      }`}
    >
      <div className="transition-transform group-hover:scale-105 group-active:scale-95 pointer-events-none">
        {renderIcon()}
      </div>
      <span
        className={`mt-1.5 text-xs sm:text-sm font-vt323 tracking-wider text-center px-1 break-all ${
          isSelected
            ? "bg-[#ff4fa3] text-[#12060f] font-bold"
            : "text-[#e2dce0] group-hover:text-[#ff85be]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function DesktopInner() {
  const { windows, closeStartMenu, openWindow } = useWindowManager();
  const [iconPositions, setIconPositions] = useState<Record<WindowId, { x: number; y: number }>>({});

  // Generate random positions for icons on mount
  useEffect(() => {
    const positions: Record<WindowId, { x: number; y: number }> = {};
    DESKTOP_ICONS.forEach((icon) => {
      if (typeof window !== "undefined") {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const maxX = Math.max(0, vw - 80);
        const maxY = Math.max(0, vh - 120);
        positions[icon.id] = {
          x: Math.round(40 + Math.random() * maxX * 0.6),
          y: Math.round(40 + Math.random() * maxY * 0.6),
        };
      } else {
        positions[icon.id] = { x: 40, y: 40 };
      }
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

      {/* Desktop icons — scattered positions */}
      {DESKTOP_ICONS.map((icon) => {
        const pos = iconPositions[icon.id] || { x: 40, y: 40 };
        return (
          <div
            key={icon.id}
            style={{ position: "absolute", left: pos.x, top: pos.y, zIndex: 10 }}
          >
            <DesktopIcon {...icon} />
          </div>
        );
      })}

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
