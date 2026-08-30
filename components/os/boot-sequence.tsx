"use client";

import React, { useState, useEffect, useRef } from "react";

const BOOT_LINES = [
  { text: "PRIYANSHI_OS v1.0", delay: 200 },
  { text: "Copyright (c) 2026 — all systems tested before shipped.", delay: 350 },
  { text: "", delay: 150 },
  { text: "Initializing PRIYANSHI_OS ...", delay: 400 },
  { text: "Loading backend services ......... OK", delay: 350 },
  { text: "Mounting PostgreSQL data layer .... OK", delay: 350 },
  { text: "Starting async runtime ............ OK", delay: 350 },
  { text: "Integrating applied-AI modules .... OK", delay: 350 },
  { text: "Running test suite ................ 47 passed", delay: 450 },
  { text: "", delay: 200 },
  { text: "Welcome, recruiter.", delay: 600 }
];

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [isDone, setIsDone] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const hasFinishedRef = useRef(false);

  const finishBoot = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    try {
      sessionStorage.setItem("priyanshi_os_booted", "true");
    } catch {
      // safe fallback
    }
    setIsFadingOut(true);
    setTimeout(() => {
      setIsDone(true);
      onComplete();
    }, 450);
  };

  useEffect(() => {
    // Check if already booted in this session
    try {
      if (sessionStorage.getItem("priyanshi_os_booted") === "true") {
        setIsDone(true);
        onComplete();
        return;
      }
    } catch {
      // Continue normal boot if sessionStorage blocked
    }

    // Check prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      finishBoot();
      return;
    }

    // Wait for user to initiate start
    if (!hasStarted) return;

    if (currentLineIndex < BOOT_LINES.length) {
      const line = BOOT_LINES[currentLineIndex];
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line.text]);
        setCurrentLineIndex((prev) => prev + 1);
      }, line.delay);

      return () => clearTimeout(timer);
    } else {
      // All lines printed, wait a brief moment then finish
      const endTimer = setTimeout(() => {
        finishBoot();
      }, 700);
      return () => clearTimeout(endTimer);
    }
  }, [currentLineIndex, onComplete, hasStarted]);

  // Click or keypress to skip/start
  useEffect(() => {
    const handleAction = () => {
      if (!hasStarted) {
        setHasStarted(true);
      } else {
        finishBoot();
      }
    };

    window.addEventListener("keydown", handleAction);
    return () => window.removeEventListener("keydown", handleAction);
  }, [hasStarted]);

  if (isDone) return null;

  return (
    <div
      onClick={() => {
        if (!hasStarted) setHasStarted(true);
        else finishBoot();
      }}
      role="status"
      aria-label="Booting PRIYANSHI_OS. Click or press any key to skip."
      className={`fixed inset-0 z-[99999] bg-black text-[#ff85be] font-mono p-6 sm:p-12 overflow-hidden flex flex-col justify-center cursor-pointer select-none transition-opacity duration-500 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {!hasStarted ? (
        <div className="text-center animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-2 border-[#ff4fa3] rounded-sm flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-[#ff4fa3]" />
          </div>
          <span className="text-xl sm:text-2xl font-vt323 tracking-widest text-[#ff4fa3]">
            SYSTEM STANDBY
          </span>
          <span className="text-xs sm:text-sm text-[#ff85be]/80 tracking-wider">
            [ CLICK TO INITIALIZE_OS ]
          </span>
        </div>
      ) : (
        <>
          <div className="max-w-2xl space-y-1 text-xs sm:text-sm leading-relaxed absolute top-6 sm:top-12 left-6 sm:left-12">
            {displayedLines.map((line, idx) => (
              <div key={idx} className="min-h-[1.25rem]">
                {line === "" ? (
                  <span className="block">&nbsp;</span>
                ) : (
                  <span className="text-[#f5e9f0]">
                    {line.endsWith("OK") ? (
                      <>
                        {line.slice(0, -2)}
                        <span className="text-[#7df9c2] font-bold">OK</span>
                      </>
                    ) : line.includes("47 passed") ? (
                      <>
                        {line.split("47 passed")[0]}
                        <span className="text-[#7df9c2] font-bold">47 passed</span>
                      </>
                    ) : line.includes("Welcome") ? (
                      <span className="text-[#ff4fa3] font-bold text-sm sm:text-base font-vt323 tracking-wider">
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </span>
                )}
              </div>
            ))}
            {!isFadingOut && (
              <div className="inline-block w-2.5 h-4 bg-[#ff4fa3] animate-pulse align-middle ml-1" />
            )}
          </div>

          <div className="absolute bottom-6 sm:bottom-12 left-6 right-6 sm:left-12 sm:right-12 text-[11px] text-[#c2a9ba]/60 font-vt323 tracking-widest flex items-center justify-between border-t border-[#ff4fa3]/20 pt-4">
            <span>[PRESS ANY KEY OR CLICK TO SKIP]</span>
            <span>BOOT SEQUENCE ACTIVE</span>
          </div>
        </>
      )}
    </div>
  );
}
