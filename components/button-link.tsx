import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  download?: boolean;
  external?: boolean;
  ariaLabel?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  download,
  external,
  ariaLabel
}: ButtonLinkProps) {
  const classes = clsx(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan",
    variant === "primary"
      ? "bg-pearl text-ink hover:bg-cyan"
      : "border border-line bg-white/5 text-pearl hover:border-cyan/60 hover:bg-cyan/10"
  );

  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </>
  );

  if (external || download) {
    return (
      <a
        aria-label={ariaLabel}
        className={classes}
        href={href}
        download={download}
        rel={external ? "noreferrer" : undefined}
        target={external ? "_blank" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link aria-label={ariaLabel} className={classes} href={href}>
      {content}
    </Link>
  );
}
