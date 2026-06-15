import type { Metadata } from "next";
import { Download, Send } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { contactLinks, siteConfig } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Priyanshi Shah for AI/ML internships, engineering opportunities, and collaborations."
};

export default function ContactPage() {
  return (
    <main id="main">
      <Container className="pb-20 pt-32 sm:pt-40">
        <section className="grid min-h-[68vh] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
              <Send aria-hidden="true" className="h-4 w-4" />
              Contact
            </p>
            <h1 className="font-display text-5xl font-semibold leading-none text-pearl sm:text-7xl lg:text-8xl">
              Initiate Innovation.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-mist sm:text-xl">
              Currently seeking AI/ML internships, engineering opportunities, and impactful collaborations.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={siteConfig.resume} download ariaLabel="Download Priyanshi Shah resume">
                <span className="inline-flex items-center gap-2">
                  <Download aria-hidden="true" className="h-4 w-4" />
                  Resume
                </span>
              </ButtonLink>
              <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">Email Priyanshi</ButtonLink>
            </div>
          </Reveal>

          <Reveal className="rounded-lg border border-line bg-panel/70 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-pearl">Direct channels</h2>
            <div className="mt-8 space-y-4">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    className="group flex items-center gap-4 rounded-lg border border-line bg-white/[0.035] p-4 transition hover:border-cyan/60 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
                    href={link.href}
                    key={link.label}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-mist">{link.label}</span>
                      <span className="mt-1 block break-words text-pearl transition group-hover:text-cyan">{link.value}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </Reveal>
        </section>
      </Container>
    </main>
  );
}
