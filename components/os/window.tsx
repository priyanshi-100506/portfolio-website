"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { WindowState } from "./types";
import { useWindowManager } from "./window-manager-context";
import { AboutWindowContent } from "./windows/about-window";
import { ProjectsWindowContent } from "./windows/projects-window";
import { ContactWindowContent } from "./windows/contact-window";
import { ResumeWindowContent } from "./windows/resume-window";
import { PixelFile, PixelFolder, PixelTerminal } from "./pixel-icons";

interface WindowProps {
  windowState: WindowState;
}

export function Window({ windowState }: WindowProps) {
  const { id, title, isOpen, isMinimized, zIndex, position, size } = windowState;
  const { closeWindow, minimizeWindow, focusWindow, updatePosition, activeWindowId } =
    useWindowManager();

  const isFocused = activeWindowId === id;
  const windowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    isDragging: boolean;
    startX: number;
    startY: number;
    initialPosX: number;
    initialPosY: number;
    pointerId: number | null;
  }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    initialPosX: 0,
    initialPosY: 0,
    pointerId: null
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pointer event drag handler
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag with primary pointer button and on title bar
    if (e.button !== 0) return;
    focusWindow(id);

    const titlebar = e.currentTarget;
    titlebar.setPointerCapture(e.pointerId);

    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      initialPosX: position.x,
      initialPosY: position.y,
      pointerId: e.pointerId
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    const el = windowRef.current;
    const windowWidth = el ? el.offsetWidth : size.width;
    const windowHeight = el ? el.offsetHeight : size.height;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const taskbarHeight = 44;

    // Clamped coordinates
    const newX = Math.max(0, Math.min(viewportWidth - windowWidth, dragRef.current.initialPosX + dx));
    const newY = Math.max(0, Math.min(viewportHeight - taskbarHeight - 36, dragRef.current.initialPosY + dy));

    updatePosition(id, { x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Safe capture release fallback
      }
      dragRef.current.isDragging = false;
      dragRef.current.pointerId = null;
    }
  };

  if (!isOpen || isMinimized) {
    return null;
  }

  // Render appropriate content
  const renderContent = () => {
    switch (id) {
      case "about":
        return <AboutWindowContent />;
      case "projects":
        return <ProjectsWindowContent />;
      case "contact":
        return <ContactWindowContent />;
      case "resume":
        return <ResumeWindowContent />;
      default:
        return null;
    }
  };

  const getWindowIcon = () => {
    switch (id) {
      case "about":
        return <PixelFile className="w-4 h-4 text-white" />;
      case "projects":
        return <PixelFolder className="w-4 h-4 text-white" />;
      case "contact":
        return <PixelTerminal className="w-4 h-4 text-white" />;
      case "resume":
        return <PixelFile className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div
      ref={windowRef}
      role="dialog"
      aria-label={title}
      onMouseDown={() => focusWindow(id)}
      onTouchStart={() => focusWindow(id)}
      style={{
        position: "fixed",
        left: isMobile ? "8px" : `${position.x}px`,
        top: isMobile ? `${Math.min(position.y, 60)}px` : `${position.y}px`,
        width: isMobile ? "calc(100vw - 16px)" : `${size.width}px`,
        maxWidth: "calc(100vw - 16px)",
        maxHeight: "calc(100vh - 60px)",
        zIndex
      }}
      className={`flex flex-col bg-[#160814] border-2 ${
        isFocused ? "border-[#ff4fa3] shadow-[6px_6px_0px_rgba(0,0,0,0.85)]" : "border-[#ff4fa3]/50 shadow-[4px_4px_0px_rgba(0,0,0,0.7)]"
      } font-mono select-none`}
    >
      {/* Title Bar (Draggable) */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`flex items-center justify-between px-3 py-1.5 cursor-move touch-none border-b-2 ${
          isFocused
            ? "bg-gradient-to-r from-[#ff4fa3] via-[#d42d82] to-[#8b1d5c] text-white border-[#ff4fa3]"
            : "bg-gradient-to-r from-[#5a1a3e] to-[#3a0d27] text-[#f5e9f0]/70 border-[#ff4fa3]/40"
        }`}
      >
        <div className="flex items-center gap-2 truncate pointer-events-none">
          {getWindowIcon()}
          <span className="font-vt323 text-lg font-bold tracking-wider truncate">
            {title}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(id);
            }}
            aria-label={`Minimize ${title}`}
            className="w-5 h-5 flex items-center justify-center font-bold text-xs bg-[#12060f] text-[#ff85be] border border-[#ff4fa3]/80 hover:bg-[#ff4fa3] hover:text-[#12060f] active:translate-x-0.5 active:translate-y-0.5 leading-none"
          >
            _
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
            aria-label={`Close ${title}`}
            className="w-5 h-5 flex items-center justify-center font-bold text-xs bg-[#12060f] text-[#ff85be] border border-[#ff4fa3]/80 hover:bg-[#ff4fa3] hover:text-[#12060f] active:translate-x-0.5 active:translate-y-0.5 leading-none"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Body (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-[#160814] select-text max-h-[calc(100vh-120px)] sm:max-h-[520px]">
        {renderContent()}
      </div>

      {/* Window Status Bar */}
      <div className="px-3 py-1 bg-[#12060f] border-t border-[#ff4fa3]/30 text-[11px] text-[#c2a9ba] flex items-center justify-between font-vt323 tracking-wider">
        <span>STATUS: READY</span>
        <span className="text-[#ff85be]">PRIYANSHI_OS</span>
      </div>
    </div>
  );
}
