"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { WindowState } from "./types";
import { useWindowManager } from "./window-manager-context";
import { AboutWindowContent } from "./windows/about-window";
import { ProjectsWindowContent } from "./windows/projects-window";
import { ContactWindowContent } from "./windows/contact-window";
import { ResumeWindowContent } from "./windows/resume-window";
import { PixelFile, PixelFolder, PixelTerminal } from "./pixel-icons";
import { playSound } from "./sound-manager";

const ANIM_DURATION = 140; // ms — must match CSS

export function Window({ windowState }: { windowState: WindowState }) {
  const { id, title, isOpen, isMinimized, isMaximized, zIndex, position, size } =
    windowState;
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, activeWindowId } =
    useWindowManager();

  const isFocused = activeWindowId === id;
  const windowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile]   = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [animKey, setAnimKey]     = useState(0); // bump to replay enter anim

  // Bump animKey whenever the window goes from closed→open (play enter anim)
  const prevOpen = useRef(false);
  useEffect(() => {
    if (isOpen && !isMinimized && !prevOpen.current) {
      setAnimKey((k) => k + 1);
      playSound("open");
    }
    prevOpen.current = isOpen && !isMinimized;
  }, [isOpen, isMinimized]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Drag state
  const drag = useRef({ active: false, sx: 0, sy: 0, px: 0, py: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    if (isMaximized || e.button !== 0) return;
    focusWindow(id);
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { active: true, sx: e.clientX, sy: e.clientY, px: position.x, py: position.y };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el  = windowRef.current;
    const ww  = el ? el.offsetWidth  : size.width;
    const vw  = window.innerWidth;
    const vh  = window.innerHeight;
    const newX = Math.max(0, Math.min(vw - ww, drag.current.px + e.clientX - drag.current.sx));
    const newY = Math.max(0, Math.min(vh - 44 - 36, drag.current.py + e.clientY - drag.current.sy));
    updatePosition(id, { x: newX, y: newY });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current.active) {
      try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /**/ }
      drag.current.active = false;
    }
  };

  // Animated close: play exit anim then actually close
  const handleClose = useCallback(() => {
    playSound("close");
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      closeWindow(id);
    }, ANIM_DURATION);
  }, [closeWindow, id]);

  const handleMinimize = useCallback(() => {
    playSound("minimize");
    minimizeWindow(id);
  }, [minimizeWindow, id]);

  const handleMaximize = useCallback(() => {
    playSound("maximize");
    maximizeWindow(id);
  }, [maximizeWindow, id]);

  if (!isOpen || isMinimized) return null;

  const content = () => {
    switch (id) {
      case "about":    return <AboutWindowContent />;
      case "projects": return <ProjectsWindowContent />;
      case "contact":  return <ContactWindowContent />;
      case "resume":   return <ResumeWindowContent />;
    }
  };

  const icon = () => {
    switch (id) {
      case "projects": return <PixelFolder className="w-4 h-4 text-white" />;
      case "contact":  return <PixelTerminal className="w-4 h-4 text-white" />;
      default:         return <PixelFile className="w-4 h-4 text-white" />;
    }
  };

  const style: React.CSSProperties = isMaximized
    ? { position: "fixed", left: 0, top: 0, width: "100vw", height: "calc(100vh - 44px)", zIndex }
    : isMobile
    ? { position: "fixed", left: "8px", top: `${Math.min(position.y, 60)}px`, width: "calc(100vw - 16px)", maxHeight: "calc(100vh - 60px)", zIndex }
    : { position: "fixed", left: `${position.x}px`, top: `${position.y}px`, width: `${size.width}px`, maxWidth: "calc(100vw - 16px)", zIndex };

  return (
    <div
      key={animKey} // re-mount triggers CSS enter anim
      ref={windowRef}
      role="dialog"
      aria-label={title}
      onMouseDown={() => focusWindow(id)}
      onTouchStart={() => focusWindow(id)}
      style={style}
      className={`flex flex-col font-mono select-none bg-[#160814] border-2
        ${isFocused
          ? "border-[#ff4fa3] shadow-[6px_6px_0px_rgba(0,0,0,0.9)]"
          : "border-[#ff4fa3]/50 shadow-[4px_4px_0px_rgba(0,0,0,0.7)]"}
        ${isExiting ? "window-exiting" : "window-entering"}`}
    >
      {/* Title bar */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={`flex items-center justify-between px-3 py-1.5 border-b-2 touch-none select-none
          ${isMaximized ? "cursor-default" : "cursor-move"}
          ${isFocused
            ? "bg-gradient-to-r from-[#ff4fa3] via-[#d42d82] to-[#8b1d5c] text-white border-[#ff4fa3]"
            : "bg-gradient-to-r from-[#5a1a3e] to-[#3a0d27] text-[#f5e9f0]/70 border-[#ff4fa3]/40"}`}
      >
        <div className="flex items-center gap-2 truncate pointer-events-none">
          {icon()}
          <span className="font-vt323 text-lg font-bold tracking-wider truncate">{title}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); handleMinimize(); }}
            title="Minimize"
            className="w-6 h-5 flex items-center justify-center text-[11px] font-bold bg-[#12060f] text-[#ff85be] border border-[#ff4fa3]/80 hover:bg-[#ffb347] hover:text-[#12060f] active:translate-x-px active:translate-y-px cursor-pointer">
            −
          </button>
          <button type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            title={isMaximized ? "Restore" : "Maximize"}
            className="w-6 h-5 flex items-center justify-center text-[11px] font-bold bg-[#12060f] text-[#ff85be] border border-[#ff4fa3]/80 hover:bg-[#7df9c2] hover:text-[#12060f] active:translate-x-px active:translate-y-px cursor-pointer">
            {isMaximized ? "❐" : "□"}
          </button>
          <button type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            title="Close"
            className="w-6 h-5 flex items-center justify-center text-[11px] font-bold bg-[#12060f] text-[#ff85be] border border-[#ff4fa3]/80 hover:bg-[#ff4fa3] hover:text-[#12060f] active:translate-x-px active:translate-y-px cursor-pointer">
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-y-auto p-4 sm:p-5 bg-[#160814] select-text
        ${isMaximized ? "max-h-none" : "max-h-[calc(100vh-120px)] sm:max-h-[520px]"}`}>
        {content()}
      </div>

      {/* Status bar */}
      <div className="px-3 py-0.5 bg-[#12060f] border-t border-[#ff4fa3]/30 text-[11px] text-[#c2a9ba] flex items-center justify-between font-vt323 tracking-wider shrink-0">
        <span>STATUS: READY</span>
        <span className="text-[#ff85be]">{isMaximized ? "MAXIMIZED" : "WINDOWED"}</span>
      </div>
    </div>
  );
}
