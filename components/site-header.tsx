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
          "fixed inset-x-0 top-16 z-50 border-b border-line bg-ink/95 backdrop-blur-2xl transition-all duration-300 md:hidden",
          isOpen ? "max-h-[calc(100vh-4rem)] opacity-100 py-6" : "max-h-0 opacity-0 overflow-hidden py-0"
        )}
        id="mobile-navigation"
      >
        <div className="px-6 space-y-3">
          {navItems.map((item) => (
            <Link
              className={clsx(
                "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition duration-200",
                pathname === item.href
                  ? "bg-rose/[0.12] border border-rose/30 text-pearl font-semibold"
                  : "text-mist hover:bg-white/[0.04] hover:text-pearl"
              )}
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              <span>{item.label}</span>
              {pathname === item.href && <SilkFlower className="h-4 w-4 text-rose" />}
            </Link>
          ))}
          <div className="pt-4 border-t border-line/60 flex items-center justify-between text-xs text-mist/70 px-2">
            <span>{siteConfig.name}</span>
            <a href={`mailto:${siteConfig.email}`} className="text-blush hover:underline">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
