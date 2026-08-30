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
      <Container className="pb-20 pt-32 sm:pt-40">
        <section className="grid min-h-[68vh] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose/30 bg-rose/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-blush backdrop-blur-md">
              <SilkFlower className="h-3.5 w-3.5 text-rose animate-spin-slow" />
              Contact
            </p>
            <h1 className="font-display text-5xl font-semibold tracking-tight leading-none text-pearl sm:text-7xl lg:text-8xl">
              Let&apos;s build <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pearl via-blush to-rose">something reliable.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-mist sm:text-xl font-normal">
              Currently seeking Backend Engineering and Applied AI internships — building systems that combine solid engineering with practical AI integration.
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

          <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-panel/70 p-6 sm:p-8">
            <div className="absolute -right-8 -top-8 h-40 w-40 text-rose/10 pointer-events-none">
              <SilkFlower size={160} className="text-rose/15" />
            </div>
            <div className="relative">
              <h2 className="font-display text-2xl font-normal italic text-pearl">Direct channels</h2>
              <div className="mt-8 space-y-4">
                {contactLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      className="group flex items-center gap-4 rounded-xl border border-line bg-white/[0.03] p-4 transition duration-300 hover:border-rose/60 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose"
                      href={link.href}
                      key={link.label}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose/10 text-blush transition duration-300 group-hover:scale-105 group-hover:bg-rose/20">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-mist/80">{link.label}</span>
                        <span className="mt-1 block break-words text-pearl transition group-hover:text-blush">{link.value}</span>
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
