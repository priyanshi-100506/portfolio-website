import React from "react";
import { aboutHighlights, skillGroups } from "@/lib/portfolio-data";
import { PixelFile } from "../pixel-icons";

export function AboutWindowContent() {
  return (
    <div className="space-y-6 text-sm text-[#f5e9f0] leading-relaxed select-text font-mono">
      {/* File Header */}
      <div className="border-b border-[#ff4fa3]/30 pb-3">
        <div className="flex items-center gap-2 text-xs text-[#ff85be] font-vt323 tracking-wider uppercase">
          <PixelFile className="w-4 h-4" />
          <span>FILE: C:\PRIYANSHI\ABOUT_ME.TXT</span>
        </div>
        <h2 className="mt-1 text-xl font-bold text-[#ff4fa3] font-vt323 tracking-wide">
          An engineer who ships — backend systems first, AI where it earns its place.
        </h2>
      </div>

      {/* Profile Overview */}
      <div className="bg-[#12060f] p-4 border border-[#ff4fa3]/40 shadow-[2px_2px_0px_#ff4fa3]">
        <p className="text-xs uppercase tracking-widest text-[#ff85be] font-vt323 mb-1">
          &gt; PROFILE_OVERVIEW
        </p>
        <p className="text-[#f5e9f0]">
          Priyanshi Shah builds backend services and applied AI features, with an emphasis on reliability, testing, and production discipline. Good AI features sit on top of good backends — not instead of them.
        </p>
      </div>

      {/* Highlights List */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-[#ff85be] font-vt323">
          &gt; SYSTEM_LOGS / HIGHLIGHTS:
        </p>
        <ul className="space-y-2.5">
          {aboutHighlights.map((highlight, idx) => (
            <li key={idx} className="flex items-start gap-2.5 bg-[#1a0816] p-2.5 border-l-2 border-[#ff4fa3]">
              <span className="text-[#ff4fa3] font-bold select-none">[0{idx + 1}]</span>
              <span className="text-xs sm:text-sm text-[#f5e9f0]">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Categorized Skills */}
      <div className="space-y-3 pt-2">
        <p className="text-xs uppercase tracking-widest text-[#ff85be] font-vt323">
          &gt; TECHNICAL_CAPABILITIES:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {skillGroups
            .filter((g) => g.title !== "Also Worked With")
            .map((group) => (
              <div key={group.title} className="bg-[#12060f] border border-[#ff4fa3]/30 p-3">
                <p className="text-xs font-bold text-[#ff4fa3] font-vt323 tracking-wide uppercase border-b border-[#ff4fa3]/20 pb-1 mb-2">
                  {group.title}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-xs bg-[#200b1c] border border-[#ff4fa3]/40 text-[#f5e9f0]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Footnote / Also worked with */}
        <div className="p-3 bg-[#12060f]/60 border border-[#ff4fa3]/20 text-xs text-[#c2a9ba]">
          <span className="text-[#ff85be] font-semibold">also worked with: </span>
          <span>Deep Learning · Computer Vision (OpenCV, YOLO) · SHAP / Model Interpretability</span>
        </div>
      </div>
    </div>
  );
}
