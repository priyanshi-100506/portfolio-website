import React from "react";

export function PixelFolder({ className = "w-10 h-10 text-magenta" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* Retro Pixel Folder tab & body */}
      <path d="M4 6h10v2h2v2h12v16H4V6z" fill="#ff4fa3" />
      <path d="M6 10h20v12H6V10z" fill="#2d0b25" />
      <path d="M4 10h24v14H4V10z" fill="#ff4fa3" />
      <path d="M6 12h20v10H6V12z" fill="#8b1d5c" />
      {/* Front flap highlight */}
      <path d="M4 12h24v2H4v-2z" fill="#ff85be" />
      <path d="M26 12v12h2V12h-2z" fill="#520e36" />
      <path d="M4 24h24v2H4v-2z" fill="#520e36" />
    </svg>
  );
}

export function PixelFile({ className = "w-10 h-10 text-magenta" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* Retro Document with folded corner */}
      <path d="M6 4h14v6h6v18H6V4z" fill="#ff4fa3" />
      <path d="M8 6h10v6h6v14H8V6z" fill="#200a1b" />
      <path d="M20 4l6 6h-6V4z" fill="#ff85be" />
      {/* Text lines */}
      <path d="M10 14h12v2H10v-2z" fill="#ff85be" />
      <path d="M10 18h12v2H10v-2z" fill="#f5e9f0" />
      <path d="M10 22h8v2H10v-2z" fill="#ff4fa3" />
    </svg>
  );
}

export function PixelTerminal({ className = "w-10 h-10 text-magenta" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path d="M4 4h24v24H4V4z" fill="#ff4fa3" />
      <path d="M6 8h20v18H6V8z" fill="#12060f" />
      <path d="M8 12l4 4-4 4v-2l2-2-2-2v-2z" fill="#ff85be" />
      <path d="M14 20h6v2h-6v-2z" fill="#f5e9f0" />
    </svg>
  );
}

export function PixelFloppy({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path d="M2 1h10l2 2v12H2V1z" fill="#ff4fa3" />
      <path d="M4 2h6v4H4V2z" fill="#f5e9f0" />
      <path d="M4 8h8v6H4V8z" fill="#12060f" />
      <path d="M6 9h4v4H6V9z" fill="#ff85be" />
    </svg>
  );
}
