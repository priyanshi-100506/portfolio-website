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
      className="group relative overflow-hidden rounded-2xl border border-line bg-panel/70 p-6 shadow-glow transition duration-500 hover:-translate-y-1.5 hover:border-rose/60 sm:p-8"
      delay={index * 0.06}
    >
      <div className="absolute -right-8 -top-8 h-44 w-44 text-rose/10 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-125 pointer-events-none">
        <SilkFlower size={176} className="text-rose/15" />
      </div>
      <div className="relative">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-blush">
              <SilkFlower className="h-3.5 w-3.5 text-rose" />
              Project 0{index + 1}
            </p>
            <h2 className="mt-3 font-display text-2xl font-normal italic text-pearl sm:text-3xl">{project.title}</h2>
          </div>
          <div className="mt-1 flex items-center gap-3">
            {project.github && (
              <a
                aria-label={`${project.title} GitHub repository`}
                className="text-mist transition hover:text-pearl"
                href={project.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <GitBranch className="h-5 w-5" />
              </a>
            )}
            {project.liveDemo && (
              <a
                aria-label={`${project.title} live demo`}
                className="text-mist transition hover:text-cyan"
                href={project.liveDemo}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-cyan transition group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </div>
        <p className="text-lg leading-8 text-pearl">{project.tagline}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">Problem</h3>
            <p className="mt-3 leading-7 text-mist">{project.problem}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">Solution</h3>
            <p className="mt-3 leading-7 text-mist">{project.solution}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span className="rounded-full border border-line bg-white/[0.04] px-3 py-1 text-xs font-medium text-mist" key={technology}>
              {technology}
            </span>
          ))}
        </div>
        <p className="mt-8 border-t border-line pt-5 text-sm font-medium leading-7 text-signal">{project.outcome}</p>
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
