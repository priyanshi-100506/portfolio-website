import type { Metadata } from "next";
import { Download, Send } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { contactLinks, siteConfig } from "@/lib/portfolio-data";
import { SilkFlower } from "@/components/silk-flower";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Priyanshi Shah for backend engineering and applied AI internships, opportunities, and collaborations."
};

export default function ContactPage() {
  return (
    <main id="main">
      <Container className="pb-16 sm:pb-20 pt-24 sm:pt-36 lg:pt-40">
        <section className="grid min-h-[60vh] sm:min-h-[68vh] gap-8 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-rose/30 bg-rose/[0.08] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-blush backdrop-blur-md">
              <SilkFlower className="h-3.5 w-3.5 text-rose animate-spin-slow" />
              Contact
            </p>
            <h1 className="font-display text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-none text-pearl">
              Let&apos;s build <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pearl via-blush to-rose">something reliable.</span>
            </h1>
            <p className="mt-5 sm:mt-8 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-8 text-mist font-normal">
              Currently seeking Backend Engineering and Applied AI internships — building systems that combine solid engineering with practical AI integration.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3">
              <ButtonLink href={siteConfig.resume} download ariaLabel="Download Priyanshi Shah resume">
                <span className="inline-flex items-center gap-2">
                  <Download aria-hidden="true" className="h-4 w-4" />
                  Resume
                </span>
              </ButtonLink>
              <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">Email Priyanshi</ButtonLink>
            </div>
          </Reveal>

          <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-panel/70 p-5 sm:p-8">
            <div className="absolute -right-8 -top-8 h-40 w-40 text-rose/10 pointer-events-none">
              <SilkFlower size={160} className="text-rose/15" />
            </div>
            <div className="relative">
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-pearl">Direct channels</h2>
              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                {contactLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      className="group flex items-center gap-3.5 sm:gap-4 rounded-xl border border-line bg-white/[0.03] p-3.5 sm:p-4 transition duration-300 hover:border-rose/60 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose"
                      href={link.href}
                      key={link.label}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                    >
                      <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-rose/10 text-blush transition duration-300 group-hover:scale-105 group-hover:bg-rose/20">
                        <Icon aria-hidden="true" className="h-4 sm:h-5 w-4 sm:w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-mist/80">{link.label}</span>
                        <span className="mt-0.5 sm:mt-1 block break-words text-sm sm:text-base text-pearl transition group-hover:text-blush">{link.value}</span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </section>
      </Container>
    </main>
  );
}
