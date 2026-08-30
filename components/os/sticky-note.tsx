"use client";

import React, { useRef, useState } from "react";

export function StickyNoteWidget() {
  const [pos, setPos] = useState({ x: window.innerWidth - 220, y: window.innerHeight - 260 });
  const drag = useRef({ active: false, sx: 0, sy: 0, px: 0, py: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { active: true, sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.sx;
    const dy = e.clientY - drag.current.sy;
    setPos({
      x: Math.max(0, Math.min(window.innerWidth - 200, drag.current.px + dx)),
      y: Math.max(0, Math.min(window.innerHeight - 200, drag.current.py + dy)),
    });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /**/ }
    drag.current.active = false;
  };

  return (
    <div
      style={{ position: "absolute", left: pos.x, top: pos.y, zIndex: 30 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="w-[180px] h-[180px] bg-[#f9e589] border border-[#d6be45] shadow-[4px_4px_0px_rgba(0,0,0,0.6)] font-mono select-none flex flex-col p-3 cursor-move transform -rotate-2 hover:rotate-0 transition-transform duration-300"
    >
      <div className="w-full flex justify-center mb-2">
        <div className="w-10 h-3 bg-[#e8a9ab] opacity-80 rounded-sm -mt-4 shadow-sm" />
      </div>
      <div className="flex-1 font-vt323 text-[#12060f] text-lg leading-tight tracking-wider overflow-hidden">
        <p>Hey there!</p>
        <p className="mt-2 text-sm leading-snug">
          I'm currently available for backend & applied AI opportunities.
        </p>
        <p className="mt-2 text-sm">
          - Priyanshi
        </p>
      </div>
      <div className="text-right text-[10px] text-[#12060f]/40 font-mono">
        TODO.txt
      </div>
    </div>
  );
}
