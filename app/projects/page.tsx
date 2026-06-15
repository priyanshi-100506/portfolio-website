import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI, data, and software engineering projects by Priyanshi Shah."
};

export default function ProjectsPage() {
  return (
    <main id="main">
      <Container className="pb-16 pt-32 sm:pt-40">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Impact-focused systems across AI, data, and product engineering."
            copy="Each project is designed around a measurable problem, a production-minded solution, and outcomes that improve decision quality."
          />
        </Reveal>
        <div className="mt-14 grid gap-6">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.title} />
          ))}
        </div>
      </Container>
    </main>
  );
}
