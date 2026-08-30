import React from "react";

type SilkFlowerProps = {
  className?: string;
  size?: number;
};

export function SilkFlower({ className = "text-rose", size = 24 }: SilkFlowerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(255, 245, 245)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="rgb(247, 214, 208)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgb(226, 180, 189)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer flowing silk petals */}
      <g transform="translate(50,50)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <path
            key={`outer-${i}`}
            d="M 0 0 C -16 -24, -22 -44, 0 -48 C 22 -44, 16 -24, 0 0 Z"
            fill="url(#petalGrad)"
            transform={`rotate(${angle})`}
            className="transition-transform duration-700 hover:scale-105"
            style={{ mixBlendMode: "screen" }}
          />
        ))}

        {/* Inner delicate layered petals */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
          <path
            key={`inner-${i}`}
            d="M 0 0 C -11 -16, -15 -32, 0 -35 C 15 -32, 11 -16, 0 0 Z"
            fill="currentColor"
            fillOpacity="0.4"
            transform={`rotate(${angle})`}
          />
        ))}

        {/* Blossom Core & Pistil Accents */}
        <circle cx="0" cy="0" r="14" fill="url(#centerGlow)" />
        <circle cx="0" cy="0" r="5" fill="rgb(255, 245, 245)" fillOpacity="0.9" />

        {/* Stamen dots */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <circle
            key={`stamen-${i}`}
            cx={Math.cos((angle * Math.PI) / 180) * 8}
            cy={Math.sin((angle * Math.PI) / 180) * 8}
            r="1.2"
            fill="rgb(255, 245, 245)"
          />
        ))}
      </g>
    </svg>
  );
}
