"use client";

import React, { useState, useRef } from "react";
import { WindowId } from "./types";
import { useWindowManager } from "./window-manager-context";
import { PixelFile, PixelFolder, PixelTerminal } from "./pixel-icons";
import { playSound } from "./sound-manager";

interface DesktopIconProps {
  id: WindowId;
  label: string;
  iconType: "folder" | "file" | "terminal";
  pos?: { x: number; y: number };
  onMove?: (id: WindowId, pos: { x: number; y: number }) => void;
}

export function DesktopIcon({ id, label, iconType, pos, onMove }: DesktopIconProps) {
  const { openWindow } = useWindowManager();
  const [isSelected, setIsSelected] = useState(false);
  const lastTapRef = useRef<number>(0);
  const drag = useRef({ active: false, moved: false, sx: 0, sy: 0, px: 0, py: 0 });

  const handleOpen = () => {
    openWindow(id);
    setIsSelected(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    playSound("click");
    setIsSelected(true);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (drag.current.moved) return;
    handleOpen();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !onMove || !pos) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { active: true, moved: false, sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !onMove || !pos) return;
    const dx = e.clientX - drag.current.sx;
    const dy = e.clientY - drag.current.sy;
    if (!drag.current.moved && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      drag.current.moved = true;
    }
    if (drag.current.moved) {
      onMove(id, {
        x: Math.max(0, Math.min(window.innerWidth - 96, drag.current.px + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 52 - 104, drag.current.py + dy)),
      });
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /**/ }
    drag.current.active = false;
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
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={pos ? { position: "absolute", left: pos.x, top: pos.y, zIndex: 10, touchAction: "none" } : undefined}
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

