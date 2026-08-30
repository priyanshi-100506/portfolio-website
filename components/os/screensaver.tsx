"use client";

import React, { useEffect, useRef, useState } from "react";

// ── Symbols used for the matrix rain ────────────────────────────────────────
const SYMBOLS = "░▒▓█▄▀◆♦❖✦✧★☆♥♠♣♪♫✿❀❁❂❃✽✼✻✺✹✸✷✶✵✴✳✲✱✰✯✮✭✬✫✪✩✨✧✦✥✤✣✢✡✠✟✞✝✜✛✚".split("");
const COL_W = 18; // px per column

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
}

function randomChar() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function makeDrops(cols: number, rows: number): Drop[] {
  return Array.from({ length: cols }, (_, i) => ({
    x: i * COL_W,
    y: Math.random() * rows * COL_W * -1,
    speed: 0.4 + Math.random() * 0.8,
    length: 6 + Math.floor(Math.random() * 14),
    chars: Array.from({ length: 20 }, randomChar),
  }));
}

// ── Screensaver component ────────────────────────────────────────────────────
export function Screensaver({ onDismiss }: { onDismiss: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef  = useRef<Drop[]>([]);
  const rafRef    = useRef<number>(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const hintTimer = setTimeout(() => setShowHint(true), 2000);
    return () => clearTimeout(hintTimer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.ceil(canvas.width  / COL_W);
      const rows = Math.ceil(canvas.height / COL_W);
      dropsRef.current = makeDrops(cols, rows);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      // Fade trail
      ctx.fillStyle = "rgba(18, 6, 15, 0.18)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${COL_W - 2}px 'VT323', monospace`;

      dropsRef.current.forEach((drop) => {
        drop.y += drop.speed * COL_W * 0.12;

        drop.chars.forEach((ch, i) => {
          const yPos = drop.y - i * COL_W;
          if (yPos < 0 || yPos > height) return;
          const alpha = Math.max(0, 1 - i / drop.length);
          const head  = i === 0;
          ctx.fillStyle = head
            ? `rgba(255, 133, 190, ${alpha})`
            : i < 3
            ? `rgba(255, 79, 163, ${alpha * 0.9})`
            : `rgba(180, 50, 120, ${alpha * 0.6})`;
          ctx.fillText(ch, drop.x, yPos);
        });

        // Randomly mutate chars
        if (Math.random() < 0.08) {
          const idx = Math.floor(Math.random() * drop.chars.length);
          drop.chars[idx] = randomChar();
        }

        // Reset when fully off-screen
        if (drop.y - drop.length * COL_W > height) {
          drop.y = -COL_W * (2 + Math.random() * 4);
          drop.speed = 0.4 + Math.random() * 0.8;
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[99999] cursor-pointer"
      onClick={onDismiss}
      onKeyDown={onDismiss}
      role="button"
      tabIndex={0}
      aria-label="Click to dismiss screensaver"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {showHint && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="font-vt323 text-4xl text-[#ff85be]/70 tracking-[0.5em] animate-pulse">
            CLICK TO WAKE
          </p>
          <p className="font-vt323 text-lg text-[#ff4fa3]/40 tracking-widest mt-2">
            PRIYANSHI_OS · v1.0
          </p>
        </div>
      )}
    </div>
  );
}

// ── Idle detection hook ──────────────────────────────────────────────────────
const IDLE_MS = 30_000; // 30 seconds

export function useIdleScreensaver() {
  const [active, setActive] = useState(false);
  const lastRef = useRef(Date.now());

  useEffect(() => {
    const reset = () => { lastRef.current = Date.now(); setActive(false); };
    const check = setInterval(() => {
      if (Date.now() - lastRef.current >= IDLE_MS) setActive(true);
    }, 1000);

    const events = ["pointermove", "pointerdown", "keydown", "touchstart"] as const;
    events.forEach((ev) => window.addEventListener(ev, reset, { passive: true }));

    return () => {
      clearInterval(check);
      events.forEach((ev) => window.removeEventListener(ev, reset));
    };
  }, []);

  return { active, dismiss: () => setActive(false) };
}
