import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

type ProjectCardProps = {
  project: {
    title: string;
    tagline: string;
    problem: string;
    solution: string;
    technologies: string[];
    outcome: string;
  };
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Reveal
      as="article"
      className="group relative overflow-hidden rounded-lg border border-line bg-panel/70 p-6 shadow-glow transition duration-300 hover:-translate-y-1 hover:border-cyan/50 sm:p-8"
      delay={index * 0.06}
    >
      <div className="absolute right-0 top-0 h-32 w-32 bg-cyan/10 blur-3xl transition group-hover:bg-iris/20" />
      <div className="relative">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass">Project 0{index + 1}</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-pearl sm:text-3xl">{project.title}</h2>
          </div>
          <ArrowUpRight aria-hidden="true" className="mt-1 h-5 w-5 text-cyan transition group-hover:-translate-y-1 group-hover:translate-x-1" />
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
      </div>
    </Reveal>
  );
}
