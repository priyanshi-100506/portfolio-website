import { ArrowDown, Sparkles, Heart, Server, Bot, Terminal, ShieldCheck } from "lucide-react";
import { AnimatedTicker } from "@/components/animated-ticker";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { capabilities, metrics } from "@/lib/portfolio-data";
import { SilkFlower } from "@/components/silk-flower";

export default function HomePage() {
  return (
    <main id="main">
      <section className="relative flex min-h-[90vh] sm:min-h-[92vh] items-end overflow-hidden pb-10 sm:pb-12 pt-24 sm:pt-28">
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          loop
          muted
          playsInline
          poster=""
          preload="metadata"
        >
          <source src="/media/intelligence-field.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/80 to-ink" />
        <Container className="relative z-10">
          <Reveal className="max-w-5xl">
            <p className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-rose/30 bg-rose/[0.08] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-blush backdrop-blur-md">
              <Sparkles aria-hidden="true" className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-blush animate-pulse" />
              Backend · APIs · Applied AI
            </p>
            <h1 className="text-balance font-display text-3xl xs:text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.08] sm:leading-[0.98] text-pearl">
              Engineering Reliable Systems. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pearl via-blush to-rose">Applying AI Where It Counts.</span>
            </h1>
            <p className="mt-5 sm:mt-8 max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-8 text-mist font-normal">
              Priyanshi Shah is a Computer Science & Business Systems student building backend services, REST APIs, and LLM-integrated systems with Python, FastAPI, and PostgreSQL.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3">
              <ButtonLink href="/projects">View Projects</ButtonLink>
              <ButtonLink href="/about" variant="secondary">About Me</ButtonLink>
            </div>
          </Reveal>
          <div className="mt-10 sm:mt-16 flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.2em] text-mist/80">
            <ArrowDown aria-hidden="true" className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-rose" />
            Selected backend & AI systems
          </div>
        </Container>
      </section>

      <AnimatedTicker />

      <Container as="section" className="py-24 sm:py-32">
        <Reveal className="mx-auto max-w-5xl text-center">
          <Heart aria-hidden="true" className="mx-auto mb-8 h-8 w-8 text-rose fill-rose/20" />
          <blockquote className="text-balance font-display text-3xl font-semibold leading-snug tracking-tight text-pearl sm:text-5xl">
            “Reliable systems come first — AI is a tool I use to make them smarter, not a substitute for engineering judgment.”
          </blockquote>
        </Reveal>
      </Container>

      <Container as="section" className="py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Core Capabilities"
            title="Backend discipline meets practical AI integration."
            copy="A focused practice across async backend architecture, applied LLM workflows, and automated deployment."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Reveal
                as="article"
                className="group relative overflow-hidden rounded-2xl border border-line bg-white/[0.035] p-6 transition duration-500 hover:-translate-y-1.5 hover:border-rose/50 hover:bg-white/[0.05]"
                delay={index * 0.08}
                key={capability.title}
              >
                <div className="flex items-center justify-between">
                  <Icon aria-hidden="true" className="h-7 w-7 text-blush" />
                  <SilkFlower className="h-4 w-4 text-rose/30 transition-transform duration-500 group-hover:rotate-90 group-hover:text-rose/80" />
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold text-pearl">{capability.title}</h3>
                <p className="mt-4 leading-7 text-mist font-normal">{capability.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <Container as="section" className="py-20 sm:py-28">
        <div className="grid gap-4 lg:grid-cols-3">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Reveal
                as="article"
                className="group relative overflow-hidden rounded-2xl border border-line bg-panel/70 p-6 transition duration-500 hover:-translate-y-1 hover:border-rose/40"
                delay={index * 0.06}
                key={metric.label}
              >
                <div className="flex items-center justify-between">
                  <Icon aria-hidden="true" className="h-6 w-6 text-blush" />
                  <SilkFlower className="h-3.5 w-3.5 text-rose/30 group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <p className="mt-8 font-display text-4xl font-semibold text-pearl">{metric.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-mist/90">{metric.label}</p>
                {metric.subtext && (
                  <p className="mt-2 text-xs text-mist/60 font-light">{metric.subtext}</p>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>

      <Container as="section" className="py-20">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-panel/50 p-8 sm:p-12 md:grid md:grid-cols-[1fr_1.4fr] md:items-center">
          <div className="flex items-center gap-4 text-blush">
            <SilkFlower size={36} className="text-rose animate-spin-slow" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-mist">Engineering & Reliability</span>
          </div>
          <p className="mt-6 md:mt-0 text-balance font-display text-2xl font-semibold leading-snug text-pearl sm:text-3xl">
            Built for backend systems that hold up under real use — and AI features that are held to the same standard.
          </p>
        </div>
      </Container>
    </main>
  );
}
