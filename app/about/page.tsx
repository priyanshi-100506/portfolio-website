import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { aboutHighlights, experiencePillars, skillGroups } from "@/lib/portfolio-data";
import { SilkFlower } from "@/components/silk-flower";

export const metadata: Metadata = {
  title: "About",
  description: "About Priyanshi Shah: Backend engineering, applied AI, automated testing, and systems discipline."
};

export default function AboutPage() {
  return (
    <main id="main">
      <Container className="pb-16 pt-24 sm:pt-36 lg:pt-40">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="An engineer who ships — backend systems first, AI where it earns its place."
            copy="Priyanshi Shah builds backend services and applied AI features, with an emphasis on reliability, testing, and production discipline."
          />
        </Reveal>

        <section className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 lg:grid-cols-[0.9fr_1.4fr]">
          <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-panel/70 p-5 sm:p-8">
            <div className="absolute -right-8 -top-8 h-40 w-40 text-rose/10 pointer-events-none">
              <SilkFlower size={160} className="text-rose/15" />
            </div>
            <div className="relative">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-blush">
                <SilkFlower className="h-3.5 w-3.5 text-rose" />
                Profile
              </p>
              <h2 className="mt-4 sm:mt-6 font-display text-2xl sm:text-3xl font-semibold leading-tight text-pearl">
                Good AI features sit on top of good backends — not instead of them.
              </h2>
              <p className="mt-4 sm:mt-5 leading-7 sm:leading-8 text-mist font-normal text-sm sm:text-base">
                Her work centers on systems that are tested, deployable, and understandable — whether or not an LLM is part of the pipeline.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:gap-4">
            {aboutHighlights.map((highlight, index) => (
              <Reveal
                className="flex gap-3 sm:gap-4 rounded-xl border border-line bg-white/[0.03] p-4 sm:p-5 transition duration-300 hover:border-rose/40 hover:bg-white/[0.05]"
                delay={index * 0.05}
                key={highlight}
              >
                <CheckCircle2 aria-hidden="true" className="mt-1 h-4 sm:h-5 w-4 sm:w-5 shrink-0 text-blush" />
                <p className="leading-6 sm:leading-7 text-mist font-normal text-sm sm:text-base">{highlight}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-10 sm:mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {experiencePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal as="article" className="group relative overflow-hidden rounded-2xl border border-line bg-panel/70 p-5 sm:p-6 transition duration-500 hover:-translate-y-1 hover:border-rose/40" delay={index * 0.05} key={pillar.label}>
                <div className="flex items-center justify-between">
                  <Icon aria-hidden="true" className="h-5 sm:h-6 w-5 sm:w-6 text-blush" />
                  <SilkFlower className="h-4 w-4 text-rose/30 group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <p className="mt-6 sm:mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-mist/90">{pillar.label}</p>
                <h2 className="mt-2 sm:mt-3 font-display text-xl sm:text-2xl font-semibold text-pearl">{pillar.value}</h2>
              </Reveal>
            );
          })}
        </section>

        <section className="mt-16 sm:mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="A focused stack for reliable systems."
              copy="Categorized capabilities across backend services, applied AI integration, and systems tooling."
            />
          </Reveal>
          <div className="mt-8 sm:mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <Reveal as="article" className="group relative overflow-hidden rounded-2xl border border-line bg-white/[0.035] p-5 sm:p-6 transition duration-500 hover:-translate-y-1.5 hover:border-rose/50 hover:bg-white/[0.05]" delay={index * 0.08} key={group.title}>
                  <div className="flex items-center justify-between">
                    <Icon aria-hidden="true" className="h-6 sm:h-7 w-6 sm:w-7 text-blush" />
                    <SilkFlower className="h-4 w-4 text-rose/30 group-hover:rotate-90 transition-transform duration-500" />
                  </div>
                  <h2 className="mt-5 sm:mt-7 font-display text-xl sm:text-2xl font-semibold text-pearl">{group.title}</h2>
                  <ul className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3">
                    {group.skills.map((skill) => (
                      <li className="flex items-center gap-2.5 sm:gap-3 text-mist font-normal text-xs sm:text-sm" key={skill}>
                        <SilkFlower className="h-3 w-3 text-rose/80 shrink-0" />
                        <span>{skill}</span>
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
