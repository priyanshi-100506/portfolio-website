import Link from "next/link";
import { navItems, siteConfig } from "@/lib/portfolio-data";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-6 text-sm text-mist md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Built for intelligent execution.</p>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-4">
          {navItems.map((item) => (
            <Link className="transition hover:text-pearl" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
