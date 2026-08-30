"use client";

import React, { useRef, useState } from "react";
import { useSoundEnabled, setSoundEnabled } from "./sound-manager";

export function MusicPlayerWidget() {
  const soundEnabled = useSoundEnabled();
  const [pos, setPos] = useState({ x: window.innerWidth - 320, y: 60 });
  const drag = useRef({ active: false, sx: 0, sy: 0, px: 0, py: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { active: true, sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.sx;
    const dy = e.clientY - drag.current.sy;
    setPos({
      x: Math.max(0, Math.min(window.innerWidth - 260, drag.current.px + dx)),
      y: Math.max(0, Math.min(window.innerHeight - 100, drag.current.py + dy)),
    });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /**/ }
    drag.current.active = false;
  };

  return (
    <div
      style={{ position: "absolute", left: pos.x, top: pos.y, zIndex: 40 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="w-[260px] bg-[#1a0816] border-2 border-[#ff4fa3] shadow-[4px_4px_0px_rgba(0,0,0,0.8)] font-mono select-none flex flex-col"
    >
      {/* Title bar */}
      <div className="bg-gradient-to-r from-[#ff4fa3] to-[#8b1d5c] px-2 py-1 flex items-center justify-between cursor-move">
        <span className="font-vt323 text-white text-sm tracking-widest">WINAMP_MINI</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[#12060f] border border-[#ff85be]" />
          <div className="w-2 h-2 bg-[#ff85be]" />
        </div>
      </div>

      {/* Body */}
      <div className="p-3 space-y-3">
        {/* Display screen */}
        <div className="bg-[#12060f] border border-[#ff4fa3]/30 p-2 text-[#7df9c2] font-vt323 tracking-wider text-xs flex flex-col justify-center h-[46px] overflow-hidden relative shadow-[inset_1px_1px_4px_#000]">
          <div className="flex items-center justify-between opacity-70 mb-0.5">
            <span>{soundEnabled ? "▶ PLAYING" : "⏸ PAUSED"}</span>
            <span className="animate-pulse">{soundEnabled ? "kbps: 128" : ""}</span>
          </div>
          <div className="truncate text-sm text-[#ff85be]">
            {soundEnabled ? (
              <span className="inline-block animate-[marquee_5s_linear_infinite]">
                Simple Minds - Don't You (Forget About Me)
              </span>
            ) : (
              "Simple Minds - Don't You..."
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-12 h-6 flex items-center justify-center bg-[#12060f] border border-[#ff4fa3] text-[#ff85be] hover:bg-[#ff4fa3] hover:text-[#12060f] active:translate-y-px text-xs"
            >
              {soundEnabled ? "PAUSE" : "PLAY"}
            </button>
            <button className="w-8 h-6 flex items-center justify-center bg-[#12060f] border border-[#ff4fa3]/40 text-[#ff4fa3]/40 cursor-not-allowed text-xs">
              ■
            </button>
          </div>
          
          {/* Fake EQ visualization */}
          <div className="flex items-end gap-1 h-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-1.5 bg-[#ff4fa3] transition-all duration-150 ${
                  soundEnabled ? "animate-pulse" : "h-1 opacity-40"
                }`}
                style={{
                  height: soundEnabled ? `${40 + Math.random() * 60}%` : "4px",
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}} />
    </div>
  );
}
