import React from "react";
import { projects } from "@/lib/portfolio-data";
import { PixelFolder } from "../pixel-icons";

export function ProjectsWindowContent() {
  return (
    <div className="space-y-6 text-sm text-[#f5e9f0] select-text font-mono">
      {/* Header Banner */}
      <div className="border-b border-[#ff4fa3]/30 pb-3">
        <div className="flex items-center gap-2 text-xs text-[#ff85be] font-vt323 tracking-wider uppercase">
          <PixelFolder className="w-4 h-4" />
          <span>DIRECTORY: C:\PRIYANSHI\PROJECTS</span>
        </div>
        <p className="mt-1 text-xs text-[#c2a9ba]">
          Backend systems and applied AI, built and shipped end to end with automated test suites.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project, idx) => (
          <article
            key={project.title}
            className="bg-[#12060f] border-2 border-[#ff4fa3]/40 p-4 sm:p-5 shadow-[4px_4px_0px_#2a0820] transition hover:border-[#ff4fa3]"
          >
            {/* Project Header & Links */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#ff4fa3]/20 pb-3 mb-3">
              <div>
                <span className="text-xs font-vt323 text-[#ff85be] tracking-widest uppercase">
                  [EXEC_BIN 0{idx + 1}]
                </span>
                <h3 className="text-xl font-bold text-[#ff4fa3] font-vt323 tracking-wider">
                  {project.title}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs font-bold bg-[#ff4fa3] text-[#12060f] border border-[#ff85be] shadow-[2px_2px_0px_#000000] hover:bg-[#ff85be] active:translate-x-0.5 active:translate-y-0.5"
                  >
                    LIVE DEMO ↗
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs font-bold bg-[#200b1c] text-[#ff85be] border border-[#ff4fa3]/60 shadow-[2px_2px_0px_#000000] hover:bg-[#ff4fa3]/20 active:translate-x-0.5 active:translate-y-0.5"
                  >
                    GITHUB ↗
                  </a>
                )}
              </div>
            </div>

            {/* Tagline */}
            <p className="text-sm font-semibold text-[#f5e9f0] mb-3">
              {project.tagline}
            </p>

            {/* Problem & Solution Grid */}
            <div className="grid gap-3 sm:grid-cols-2 text-xs bg-[#1a0816] p-3 border border-[#ff4fa3]/20 mb-3">
              <div>
                <span className="text-[#ff85be] font-bold uppercase font-vt323 tracking-wide">
                  &gt; PROBLEM:
                </span>
                <p className="mt-1 text-[#f5e9f0]/90 leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <span className="text-[#ff85be] font-bold uppercase font-vt323 tracking-wide">
                  &gt; SOLUTION:
                </span>
                <p className="mt-1 text-[#f5e9f0]/90 leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[11px] bg-[#200b1c] border border-[#ff4fa3]/30 text-[#f5e9f0]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Outcome Line (DOXA note: deliberately frames deterministic engineering judgment) */}
            <div className="pt-2 border-t border-[#ff4fa3]/20 text-xs text-[#ff85be]">
              <span className="font-bold">&gt; OUTCOME: </span>
              <span className="text-[#f5e9f0]">{project.outcome}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
