import { ArrowDown, Brain, CircuitBoard, Eye, Layers3 } from "lucide-react";
import { AnimatedTicker } from "@/components/animated-ticker";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { capabilities, metrics } from "@/lib/portfolio-data";

export default function HomePage() {
  return (
    <main id="main">
      <section className="relative flex min-h-[92vh] items-end overflow-hidden pb-12 pt-28">
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 h-full w-full object-cover opacity-32"
          loop
          muted
          playsInline
          poster=""
          preload="metadata"
        >
          <source src="/media/intelligence-field.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/78 to-ink" />
        <Container className="relative z-10">
          <Reveal className="max-w-5xl">
            <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
              <CircuitBoard aria-hidden="true" className="h-4 w-4" />
              AI/ML · Systems · Strategy
            </p>
            <h1 className="text-balance font-display text-5xl font-semibold leading-[0.98] text-pearl sm:text-6xl lg:text-8xl">
              Engineering Intelligence. Architecting Strategy.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-mist sm:text-xl">
              Priyanshi Shah is a Computer Science & Business Systems student specializing in applied AI/ML,
              predictive modeling, and scalable software systems.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/projects">View Projects</ButtonLink>
              <ButtonLink href="/about" variant="secondary">About Me</ButtonLink>
            </div>
          </Reveal>
          <div className="mt-16 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-mist">
            <ArrowDown aria-hidden="true" className="h-4 w-4" />
            Selected intelligence systems
          </div>
        </Container>
      </section>

      <AnimatedTicker />

      <Container as="section" className="py-24 sm:py-32">
        <Reveal className="mx-auto max-w-5xl text-center">
          <Brain aria-hidden="true" className="mx-auto mb-8 h-10 w-10 text-brass" />
          <blockquote className="text-balance font-display text-3xl font-semibold leading-tight text-pearl sm:text-5xl">
            “Where high-dimensional architecture meets strategic intelligence, I engineer systems that don&apos;t just process data—they drive decisions.”
          </blockquote>
        </Reveal>
      </Container>

      <Container as="section" className="py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Core Capabilities"
            title="From model logic to operational systems."
            copy="A focused practice across applied AI, perception, and robust platform foundations."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Reveal
                as="article"
                className="rounded-lg border border-line bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:bg-white/[0.065]"
                delay={index * 0.08}
                key={capability.title}
              >
                <Icon aria-hidden="true" className="h-8 w-8 text-cyan" />
                <h3 className="mt-8 font-display text-2xl font-semibold text-pearl">{capability.title}</h3>
                <p className="mt-4 leading-7 text-mist">{capability.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <Container as="section" className="py-20 sm:py-28">
        <div className="grid gap-4 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Reveal
                as="article"
                className="rounded-lg border border-line bg-panel/70 p-6"
                delay={index * 0.06}
                key={metric.label}
              >
                <Icon aria-hidden="true" className="h-6 w-6 text-brass" />
                <p className="mt-8 font-display text-4xl font-semibold text-pearl">{metric.value}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-mist">{metric.label}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <Container as="section" className="py-20">
        <div className="grid gap-6 border-y border-line py-14 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div className="flex gap-3 text-cyan">
            <Layers3 aria-hidden="true" className="h-7 w-7" />
            <Eye aria-hidden="true" className="h-7 w-7" />
          </div>
          <p className="text-balance font-display text-2xl font-semibold leading-tight text-pearl sm:text-3xl">
            Built for work that needs both technical precision and strategic clarity.
          </p>
        </div>
      </Container>
    </main>
  );
}
