import { ArrowUpRight, GitBranch, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SilkFlower } from "@/components/silk-flower";

type ProjectCardProps = {
  project: {
    title: string;
    tagline: string;
    problem: string;
    solution: string;
    technologies: string[];
    outcome: string;
    github?: string;
    liveDemo?: string;
  };
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Reveal
      as="article"
      className="group relative overflow-hidden rounded-2xl border border-line bg-panel/70 p-5 sm:p-8 shadow-glow transition duration-500 hover:-translate-y-1.5 hover:border-rose/60"
      delay={index * 0.06}
    >
      <div className="absolute -right-8 -top-8 h-44 w-44 text-rose/10 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-125 pointer-events-none">
        <SilkFlower size={176} className="text-rose/15" />
      </div>
      <div className="relative">
        <div className="mb-6 sm:mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-blush">
              <SilkFlower className="h-3.5 w-3.5 text-rose" />
              Project 0{index + 1}
            </p>
            <h2 className="mt-2 sm:mt-3 font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-pearl">{project.title}</h2>
          </div>
          <div className="mt-1 flex items-center gap-2.5 sm:gap-3">
            {project.github && (
              <a
                aria-label={`${project.title} GitHub repository`}
                className="text-mist transition hover:text-pearl p-1"
                href={project.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <GitBranch className="h-4 sm:h-5 w-4 sm:w-5" />
              </a>
            )}
            {project.liveDemo && (
              <a
                aria-label={`${project.title} live demo`}
                className="text-mist transition hover:text-blush p-1"
                href={project.liveDemo}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="h-4 sm:h-5 w-4 sm:w-5" />
              </a>
            )}
            <ArrowUpRight aria-hidden="true" className="h-4 sm:h-5 w-4 sm:w-5 text-rose transition group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </div>
        <p className="text-base sm:text-lg leading-relaxed sm:leading-8 text-pearl">{project.tagline}</p>
        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-line/60 bg-white/[0.02] p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-blush">Problem</h3>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed sm:leading-7 text-mist font-normal">{project.problem}</p>
          </div>
          <div className="rounded-xl border border-line/60 bg-white/[0.02] p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-blush">Solution</h3>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed sm:leading-7 text-mist font-normal">{project.solution}</p>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 flex flex-wrap gap-1.5 sm:gap-2">
          {project.technologies.map((technology) => (
            <span className="rounded-full border border-line bg-white/[0.04] px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-mist" key={technology}>
              {technology}
            </span>
          ))}
        </div>
        <p className="mt-6 sm:mt-8 border-t border-line pt-4 sm:pt-5 text-xs sm:text-sm font-medium leading-relaxed sm:leading-7 text-blush">{project.outcome}</p>
        {(project.liveDemo || project.github) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveDemo && (
              <a
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blush to-rose px-4 py-2 text-xs font-semibold text-ink shadow-sm shadow-rose/20 transition-all duration-300 hover:from-pearl hover:to-blush hover:shadow-md hover:scale-105"
                href={project.liveDemo}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="h-3.5 w-3.5 text-ink" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                className="inline-flex items-center gap-1.5 rounded-full border border-rose/50 bg-rose/[0.12] px-4 py-2 text-xs font-semibold text-pearl backdrop-blur-sm transition-all duration-300 hover:border-rose hover:bg-rose/25 hover:text-pearl hover:scale-105"
                href={project.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <GitBranch className="h-3.5 w-3.5 text-blush" />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </Reveal>
  );
}
