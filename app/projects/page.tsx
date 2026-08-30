import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Backend systems and applied AI projects by Priyanshi Shah."
};

export default function ProjectsPage() {
  return (
    <main id="main">
      <Container className="pb-16 pt-24 sm:pt-36 lg:pt-40">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Backend systems and applied AI, built and shipped end to end."
            copy="Each project is a real, deployed system — not a notebook or a demo. Built with the same testing and reliability discipline whether or not AI is in the loop."
          />
        </Reveal>
        <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.title} />
          ))}
        </div>
      </Container>
    </main>
  );
}
