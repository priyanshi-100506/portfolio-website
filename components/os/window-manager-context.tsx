"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { WindowId, WindowState, Position, Size } from "./types";

interface WindowManagerContextType {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  isStartMenuOpen: boolean;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updatePosition: (id: WindowId, pos: Position) => void;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
}

const INITIAL_WINDOWS: Record<WindowId, WindowState> = {
  about: {
    id: "about",
    title: "About_Me.txt",
    filename: "About_Me.txt",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    position: { x: 40, y: 40 },
    size: { width: 560, height: 500 }
  },
  projects: {
    id: "projects",
    title: "Projects_Directory",
    filename: "Projects",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    position: { x: 70, y: 65 },
    size: { width: 620, height: 540 }
  },
  contact: {
    id: "contact",
    title: "Contact_Channels.exe",
    filename: "Contact",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    position: { x: 100, y: 90 },
    size: { width: 500, height: 460 }
  },
  resume: {
    id: "resume",
    title: "Resume_Viewer.pdf",
    filename: "Resume.pdf",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    position: { x: 130, y: 115 },
    size: { width: 520, height: 440 }
  }
};

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const highestZIndexRef = useRef(20);
  const cascadeCountRef = useRef(0);

  // Focus a window and bring it to front
  const focusWindow = useCallback((id: WindowId) => {
    highestZIndexRef.current += 1;
    const newZ = highestZIndexRef.current;

    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: false,
          zIndex: newZ
        }
      };
    });
    setActiveWindowId(id);
  }, []);

  // Open window with responsive position and cascading offset
  const openWindow = useCallback(
    (id: WindowId) => {
      highestZIndexRef.current += 1;
      const newZ = highestZIndexRef.current;
      cascadeCountRef.current = (cascadeCountRef.current + 1) % 6;

      setIsStartMenuOpen(false);

      setWindows((prev) => {
        const target = prev[id];
        if (!target) return prev;

        // If window is already open, just restore and focus it
        if (target.isOpen) {
          return {
            ...prev,
            [id]: {
              ...target,
              isMinimized: false,
              zIndex: newZ
            }
          };
        }

        // Calculate responsive position
        const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
        let x = 30 + cascadeCountRef.current * 28;
        let y = 30 + cascadeCountRef.current * 28;

        if (isMobile) {
          x = 10;
          y = 12 + cascadeCountRef.current * 16;
        } else if (typeof window !== "undefined") {
          // Clamp inside viewport
          const maxWidth = Math.min(target.size.width, window.innerWidth - 40);
          x = Math.min(x, Math.max(10, window.innerWidth - maxWidth - 40));
          y = Math.min(y, Math.max(10, window.innerHeight - 520));
        }

        return {
          ...prev,
          [id]: {
            ...target,
            isOpen: true,
            isMinimized: false,
            zIndex: newZ,
            position: { x, y }
          }
        };
      });

      setActiveWindowId(id);
    },
    []
  );

  // Close window
  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
          isMinimized: false
        }
      };
    });
    setActiveWindowId((current) => (current === id ? null : current));
  }, []);

  // Minimize window
  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true
        }
      };
    });
    setActiveWindowId((current) => (current === id ? null : current));
  }, []);

  // Restore minimized window
  const restoreWindow = useCallback(
    (id: WindowId) => {
      focusWindow(id);
    },
    [focusWindow]
  );

  // Update window position (drag)
  const updatePosition = useCallback((id: WindowId, pos: Position) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          position: pos
        }
      };
    });
  }, []);

  const toggleStartMenu = useCallback(() => {
    setIsStartMenuOpen((prev) => !prev);
  }, []);

  const closeStartMenu = useCallback(() => {
    setIsStartMenuOpen(false);
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        activeWindowId,
        isStartMenuOpen,
        openWindow,
        closeWindow,
        minimizeWindow,
        restoreWindow,
        focusWindow,
        updatePosition,
        toggleStartMenu,
        closeStartMenu
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error("useWindowManager must be used within a WindowManagerProvider");
  }
  return context;
}
