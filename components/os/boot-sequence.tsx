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
  }, [currentLineIndex, onComplete]);

  // Click or keypress to skip
  useEffect(() => {
    const handleSkip = () => {
      finishBoot();
    };

    window.addEventListener("keydown", handleSkip);
    return () => window.removeEventListener("keydown", handleSkip);
  }, []);

  if (isDone) return null;

  return (
    <div
      onClick={finishBoot}
      role="status"
      aria-label="Booting PRIYANSHI_OS. Click or press any key to skip."
      className={`fixed inset-0 z-[99999] bg-black text-[#ff85be] font-mono p-6 sm:p-12 overflow-hidden flex flex-col justify-start cursor-pointer select-none transition-opacity duration-500 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="max-w-2xl space-y-1 text-xs sm:text-sm leading-relaxed">
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

      <div className="mt-auto pt-8 text-[11px] text-[#c2a9ba]/60 font-vt323 tracking-widest flex items-center justify-between border-t border-[#ff4fa3]/20">
        <span>[PRESS ANY KEY OR CLICK TO SKIP]</span>
        <span>BOOT SEQUENCE ACTIVE</span>
      </div>
    </div>
  );
}
