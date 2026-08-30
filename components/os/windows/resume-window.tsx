import React from "react";
import { siteConfig } from "@/lib/portfolio-data";
import { PixelFile, PixelFloppy } from "../pixel-icons";

export function ResumeWindowContent() {
  return (
    <div className="space-y-6 text-sm text-[#f5e9f0] select-text font-mono">
      {/* Header */}
      <div className="border-b border-[#ff4fa3]/30 pb-3">
        <div className="flex items-center gap-2 text-xs text-[#ff85be] font-vt323 tracking-wider uppercase">
          <PixelFile className="w-4 h-4" />
          <span>DOCUMENT: C:\PRIYANSHI\RESUME.PDF</span>
        </div>
        <h2 className="mt-1 text-xl font-bold text-[#ff4fa3] font-vt323 tracking-wide">
          Priyanshi Shah — Resume & Credentials
        </h2>
        <p className="mt-1 text-xs text-[#c2a9ba]">
          3rd-year B.Tech CSBS @ PDEU (CGPA 9.17) · Backend & Applied AI Engineer
        </p>
      </div>

      {/* Overview Block */}
      <div className="bg-[#12060f] p-4 border border-[#ff4fa3]/40 space-y-3">
        <p className="text-xs uppercase tracking-widest text-[#ff85be] font-vt323">
          &gt; EXECUTIVE_SUMMARY
        </p>
        <p className="text-xs sm:text-sm leading-relaxed text-[#f5e9f0]">
          Hands-on experience building backend services, REST APIs, and third-party integrations using Python, FastAPI, and PostgreSQL. Comfortable with Unix/Linux environments, containerized deployments (Docker), CI/CD pipelines, and automated test suites (Pytest).
        </p>
      </div>

      {/* Key Resume Sections Summary */}
      <div className="grid gap-3 sm:grid-cols-2 text-xs">
        <div className="p-3 bg-[#1a0816] border border-[#ff4fa3]/20 space-y-1">
          <span className="text-[#ff85be] font-bold font-vt323 text-sm">EXPERIENCE:</span>
          <p className="text-[#f5e9f0] font-semibold">Pegasus Lab</p>
          <p className="text-[#c2a9ba]">Co-Founder & Testing Engineer (2026 – Present)</p>
          <p className="text-[#c2a9ba] text-[11px] mt-1">Automated Pytest suites for multi-agent AI workflows & CI/CD pipelines</p>
        </div>

        <div className="p-3 bg-[#1a0816] border border-[#ff4fa3]/20 space-y-1">
          <span className="text-[#ff85be] font-bold font-vt323 text-sm">EDUCATION:</span>
          <p className="text-[#f5e9f0] font-semibold">PDEU, Gandhinagar</p>
          <p className="text-[#c2a9ba]">B.Tech in CSBS (Expected May 2028)</p>
          <p className="text-[#ff4fa3] font-bold text-[11px] mt-1">Index: 9.17 / 10.00 CGPA</p>
        </div>
      </div>

      {/* Download Action */}
      <div className="p-5 bg-[#12060f] border-2 border-[#ff4fa3] text-center space-y-3 shadow-[4px_4px_0px_#ff4fa3]">
        <div className="flex items-center justify-center gap-2 text-[#ff85be]">
          <PixelFloppy className="w-5 h-5" />
          <span className="font-vt323 text-lg font-bold">EXPORT_BINARY_FILE</span>
        </div>
        <p className="text-xs text-[#c2a9ba]">
          Download official PDF resume directly to local drive
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <a
            href={siteConfig.resume}
            download
            className="px-5 py-2 text-sm font-bold bg-[#ff4fa3] text-[#12060f] border-2 border-[#ff85be] shadow-[3px_3px_0px_#000000] hover:bg-[#ff85be] active:translate-x-0.5 active:translate-y-0.5 font-vt323 tracking-wider text-base"
          >
            &gt; DOWNLOAD RESUME.PDF
          </a>
          <a
            href="/resume/Priyanshi-Shah-Resume.md"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-bold bg-[#200b1c] text-[#ff85be] border border-[#ff4fa3]/60 shadow-[2px_2px_0px_#000000] hover:bg-[#ff4fa3]/20 active:translate-x-0.5 active:translate-y-0.5 font-vt323 text-sm"
          >
            VIEW MARKDOWN SOURCE
          </a>
        </div>
      </div>
    </div>
  );
}
