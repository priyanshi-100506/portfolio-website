import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { aboutHighlights, experiencePillars, skillGroups } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "About",
  description: "About Priyanshi Shah: AI/ML engineering, software systems, leadership, and strategy."
};

export default function AboutPage() {
  return (
    <main id="main">
      <Container className="pb-16 pt-32 sm:pt-40">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="An engineering mind with a strategy operator's discipline."
            copy="Priyanshi Shah bridges applied intelligence, scalable software, and business execution."
          />
        </Reveal>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
          <Reveal className="rounded-lg border border-line bg-panel/70 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan">Profile</p>
            <h2 className="mt-6 font-display text-3xl font-semibold leading-tight text-pearl">
              Production-ready AI is where research quality meets delivery discipline.
            </h2>
            <p className="mt-5 leading-8 text-mist">
              Her work centers on building intelligent systems that can be understood, shipped, measured, and improved.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {aboutHighlights.map((highlight, index) => (
              <Reveal
                className="flex gap-4 rounded-lg border border-line bg-white/[0.04] p-5"
                delay={index * 0.05}
                key={highlight}
              >
                <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-signal" />
                <p className="leading-7 text-mist">{highlight}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {experiencePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal as="article" className="rounded-lg border border-line bg-panel/70 p-6" delay={index * 0.05} key={pillar.label}>
                <Icon aria-hidden="true" className="h-7 w-7 text-brass" />
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-mist">{pillar.label}</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-pearl">{pillar.value}</h2>
              </Reveal>
            );
          })}
        </section>

        <section className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="A focused stack for intelligent products."
              copy="Categorized capabilities across modeling, engineering, and execution."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <Reveal as="article" className="rounded-lg border border-line bg-white/[0.04] p-6" delay={index * 0.08} key={group.title}>
                  <Icon aria-hidden="true" className="h-8 w-8 text-cyan" />
                  <h2 className="mt-7 font-display text-2xl font-semibold text-pearl">{group.title}</h2>
                  <ul className="mt-6 space-y-3">
                    {group.skills.map((skill) => (
                      <li className="flex items-center gap-3 text-mist" key={skill}>
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brass" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </section>
      </Container>
    </main>
  );
}
