"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import { navItems, siteConfig } from "@/lib/portfolio-data";
import { SilkFlower } from "@/components/silk-flower";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/78 backdrop-blur-xl">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-pearl focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        href="#main"
      >
        Skip to content
      </a>
      <nav aria-label="Primary navigation" className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link className="group inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.22em] text-pearl" href="/">
          <SilkFlower className="h-5 w-5 text-rose transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110" />
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-line bg-white/[0.03] p-1 md:flex">
          {navItems.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              className={clsx(
                "rounded-full px-4 py-2 text-sm text-mist transition hover:text-pearl focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan",
                pathname === item.href && "bg-white/10 text-pearl"
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.04] text-pearl md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={clsx(
          "grid border-t border-line bg-ink/96 transition-all duration-300 md:hidden",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
        id="mobile-navigation"
      >
        <div className="overflow-hidden">
          <div className="space-y-1 px-5 py-4">
            {navItems.map((item) => (
              <Link
                className={clsx(
                  "block rounded-xl px-4 py-3 text-base text-mist",
                  pathname === item.href && "bg-white/10 text-pearl"
                )}
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
