"use client";

import React, { useRef, useState } from "react";
import { useSoundEnabled, setSoundEnabled } from "./sound-manager";

export function MusicPlayerWidget() {
  const soundEnabled = useSoundEnabled();
  const [isOpen, setIsOpen] = useState(true);
  const [pos, setPos] = useState({ x: window.innerWidth - 220, y: 60 });
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
      x: Math.max(0, Math.min(window.innerWidth - 180, drag.current.px + dx)),
      y: Math.max(0, Math.min(window.innerHeight - 180, drag.current.py + dy)),
    });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /**/ }
    drag.current.active = false;
  };

  // When skipping to beginning, we can temporarily disable and re-enable to restart it.
  // Actually, since we control `<audio loop>` via Desktop, resetting time requires an event or ref.
  // For now, the button can just visually exist or trigger a pause/play.
  const handleRestart = () => {
    // If it was possible, we'd reset the audio time to 0. 
    // We can dispatch a custom event to tell Desktop to restart it.
    window.dispatchEvent(new Event("os-sound-restart"));
  };

  if (!isOpen) return null;

  return (
    <div
      style={{ position: "absolute", left: pos.x, top: pos.y, zIndex: 40 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="w-[180px] h-[180px] bg-[#1a0816] border-2 border-[#ff4fa3] shadow-[4px_4px_0px_rgba(0,0,0,0.8)] font-mono select-none flex flex-col"
    >
      {/* Title bar */}
      <div className="bg-gradient-to-r from-[#ff4fa3] to-[#8b1d5c] px-2 py-1 flex items-center justify-between cursor-move shrink-0">
        <span className="font-vt323 text-white text-sm tracking-widest">WINAMP_MINI</span>
        <div className="flex gap-1 items-center">
          <div className="w-2 h-2 bg-[#12060f] border border-[#ff85be]" />
          <div className="w-2 h-2 bg-[#ff85be] mr-1" />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-red-300 font-bold leading-none text-xs ml-1 bg-black/20 px-1 border border-white/20 active:translate-y-px"
          >
            x
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-3 flex flex-col justify-between">
        
        {/* Display screen */}
        <div className="bg-[#12060f] border border-[#ff4fa3]/30 p-2 text-[#7df9c2] font-vt323 tracking-wider text-xs flex flex-col justify-center h-[54px] overflow-hidden relative shadow-[inset_1px_1px_4px_#000]">
          <div className="flex items-center justify-between opacity-70 mb-1">
            <span>{soundEnabled ? "▶ PLAYING" : "⏸ PAUSED"}</span>
          </div>
          <div className="truncate text-sm text-[#ff85be]">
            {soundEnabled ? (
              <span className="inline-block animate-[marquee_5s_linear_infinite]">
                Don't You (Forget About Me)
              </span>
            ) : (
              "Don't You (Forget About Me)"
            )}
          </div>
        </div>

        {/* Fake EQ visualization */}
        <div className="flex items-end justify-center gap-1.5 h-10 mt-2">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className={`w-2 bg-[#ff4fa3] transition-all duration-150 ${
                soundEnabled ? "animate-pulse" : "h-1 opacity-40"
              }`}
              style={{
                height: soundEnabled ? `${40 + Math.random() * 60}%` : "4px",
                animationDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <button
            onClick={handleRestart}
            className="w-8 h-8 flex items-center justify-center bg-[#12060f] border border-[#ff4fa3] text-[#ff85be] hover:bg-[#ff4fa3] hover:text-[#12060f] active:translate-y-px text-sm"
            aria-label="Restart"
          >
            ⏮
          </button>
          
          {soundEnabled ? (
            <button
              onClick={() => setSoundEnabled(false)}
              className="w-8 h-8 flex items-center justify-center bg-[#12060f] border border-[#ff4fa3] text-[#ff85be] hover:bg-[#ff4fa3] hover:text-[#12060f] active:translate-y-px text-sm"
              aria-label="Pause"
            >
              ⏸
            </button>
          ) : (
            <button
              onClick={() => setSoundEnabled(true)}
              className="w-8 h-8 flex items-center justify-center bg-[#12060f] border border-[#ff4fa3] text-[#ff85be] hover:bg-[#ff4fa3] hover:text-[#12060f] active:translate-y-px text-sm pl-0.5"
              aria-label="Play"
            >
              ▶
            </button>
          )}
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
