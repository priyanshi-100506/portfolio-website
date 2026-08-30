import React from "react";
import { contactLinks, siteConfig } from "@/lib/portfolio-data";
import { PixelTerminal } from "../pixel-icons";

export function ContactWindowContent() {
  return (
    <div className="space-y-6 text-sm text-[#f5e9f0] select-text font-mono">
      {/* Header */}
      <div className="border-b border-[#ff4fa3]/30 pb-3">
        <div className="flex items-center gap-2 text-xs text-[#ff85be] font-vt323 tracking-wider uppercase">
          <PixelTerminal className="w-4 h-4" />
          <span>PROGRAM: C:\PRIYANSHI\CONTACT_CHANNELS.EXE</span>
        </div>
        <h2 className="mt-1 text-xl font-bold text-[#ff4fa3] font-vt323 tracking-wide">
          Let&apos;s build something reliable.
        </h2>
        <p className="mt-1 text-xs text-[#c2a9ba]">
          Currently seeking Backend Engineering and Applied AI internships.
        </p>
      </div>

      {/* Direct Channel Cards */}
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-[#ff85be] font-vt323">
          &gt; AVAILABLE_COMMUNICATION_PORTS:
        </p>
        <div className="space-y-2.5">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center justify-between gap-4 p-3 bg-[#12060f] border border-[#ff4fa3]/40 shadow-[2px_2px_0px_#2a0820] hover:border-[#ff4fa3] hover:bg-[#1a0816] transition group"
            >
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 text-xs font-vt323 font-bold bg-[#ff4fa3] text-[#12060f]">
                  PORT::{link.label.toUpperCase()}
                </span>
                <span className="text-xs sm:text-sm text-[#f5e9f0] group-hover:text-[#ff85be] transition">
                  {link.value}
                </span>
              </div>
              <span className="text-xs font-bold text-[#ff4fa3] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition">
                CONNECT ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Quick Action */}
      <div className="p-4 bg-[#1a0816] border-2 border-[#ff4fa3]/40 text-center">
        <p className="text-xs text-[#c2a9ba] mb-3">
          Direct email transmission link ready
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="inline-block px-5 py-2 text-sm font-bold bg-[#ff4fa3] text-[#12060f] border-2 border-[#ff85be] shadow-[3px_3px_0px_#000000] hover:bg-[#ff85be] active:translate-x-0.5 active:translate-y-0.5 font-vt323 tracking-wider text-base"
        >
          &gt; SEND_EMAIL_PACKET ({siteConfig.email})
        </a>
      </div>
    </div>
  );
}
