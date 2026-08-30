"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { WindowId, WindowState, Position } from "./types";

interface WindowManagerContextType {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  isStartMenuOpen: boolean;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updatePosition: (id: WindowId, pos: Position) => void;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
}

const INITIAL_WINDOWS: Record<WindowId, WindowState> = {
  about: {
    id: "about", title: "About_Me.txt", filename: "About_Me.txt",
    isOpen: false, isMinimized: false, isMaximized: false,
    zIndex: 10, position: { x: 80, y: 60 }, size: { width: 560, height: 500 }
  },
  projects: {
    id: "projects", title: "Projects_Directory", filename: "Projects",
    isOpen: false, isMinimized: false, isMaximized: false,
    zIndex: 10, position: { x: 200, y: 100 }, size: { width: 640, height: 560 }
  },
  contact: {
    id: "contact", title: "Contact_Channels.exe", filename: "Contact",
    isOpen: false, isMinimized: false, isMaximized: false,
    zIndex: 10, position: { x: 350, y: 80 }, size: { width: 500, height: 460 }
  },
  resume: {
    id: "resume", title: "Resume_Viewer.pdf", filename: "Resume.pdf",
    isOpen: false, isMinimized: false, isMaximized: false,
    zIndex: 10, position: { x: 160, y: 160 }, size: { width: 520, height: 440 }
  }
};

/** Returns a random scattered position within safe viewport bounds */
function scatteredPosition(w: number, h: number): Position {
  if (typeof window === "undefined") return { x: 80, y: 60 };
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const TASKBAR = 44;
  const maxX = Math.max(10, vw - w - 20);
  const maxY = Math.max(10, vh - TASKBAR - h - 20);
  // Bias toward center-ish area, not fully random to edge
  const x = Math.round(80 + Math.random() * Math.max(0, maxX - 80));
  const y = Math.round(50 + Math.random() * Math.max(0, maxY - 50));
  return { x, y };
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const highestZRef = useRef(20);

  const focusWindow = useCallback((id: WindowId) => {
    highestZRef.current += 1;
    const z = highestZRef.current;
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return { ...prev, [id]: { ...prev[id], isMinimized: false, zIndex: z } };
    });
    setActiveWindowId(id);
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    highestZRef.current += 1;
    const z = highestZRef.current;
    setIsStartMenuOpen(false);
    setWindows((prev) => {
      const target = prev[id];
      if (!target) return prev;
      // Already open → just restore & focus
      if (target.isOpen) {
        return { ...prev, [id]: { ...target, isMinimized: false, zIndex: z } };
      }
      const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
      const pos = isMobile
        ? { x: 8, y: 50 }
        : scatteredPosition(target.size.width, target.size.height);
      return { ...prev, [id]: { ...target, isOpen: true, isMinimized: false, isMaximized: false, zIndex: z, position: pos } };
    });
    setActiveWindowId(id);
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return { ...prev, [id]: { ...prev[id], isOpen: false, isMinimized: false, isMaximized: false } };
    });
    setActiveWindowId((cur) => (cur === id ? null : cur));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return { ...prev, [id]: { ...prev[id], isMinimized: true } };
    });
    setActiveWindowId((cur) => (cur === id ? null : cur));
  }, []);

  const maximizeWindow = useCallback((id: WindowId) => {
    highestZRef.current += 1;
    const z = highestZRef.current;
    setWindows((prev) => {
      const w = prev[id];
      if (!w) return prev;
      if (w.isMaximized) {
        // Restore to saved position/size
        return {
          ...prev, [id]: {
            ...w,
            isMaximized: false,
            zIndex: z,
            position: w.savedPosition ?? w.position,
            size: w.savedSize ?? w.size
          }
        };
      }
      // Save current before maximizing
      return {
        ...prev, [id]: {
          ...w,
          isMaximized: true,
          isMinimized: false,
          zIndex: z,
          savedPosition: { ...w.position },
          savedSize: { ...w.size }
        }
      };
    });
    setActiveWindowId(id);
  }, []);

  const restoreWindow = useCallback((id: WindowId) => {
    highestZRef.current += 1;
    const z = highestZRef.current;
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return { ...prev, [id]: { ...prev[id], isMinimized: false, zIndex: z } };
    });
    setActiveWindowId(id);
  }, []);

  const updatePosition = useCallback((id: WindowId, pos: Position) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return { ...prev, [id]: { ...prev[id], position: pos } };
    });
  }, []);

  return (
    <WindowManagerContext.Provider value={{
      windows, activeWindowId, isStartMenuOpen,
      openWindow, closeWindow, minimizeWindow, maximizeWindow,
      restoreWindow, focusWindow, updatePosition,
      toggleStartMenu: () => setIsStartMenuOpen((p) => !p),
      closeStartMenu: () => setIsStartMenuOpen(false)
    }}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used within WindowManagerProvider");
  return ctx;
}
