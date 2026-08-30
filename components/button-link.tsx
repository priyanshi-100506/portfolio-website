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
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose shadow-md",
    variant === "primary"
      ? "bg-gradient-to-r from-blush to-rose text-ink shadow-rose/20 hover:from-pearl hover:to-blush hover:shadow-lg hover:shadow-rose/30 hover:scale-[1.02] active:scale-[0.98]"
      : "border border-rose/40 bg-rose/[0.12] text-pearl backdrop-blur-md hover:border-rose hover:bg-rose/25 hover:text-pearl hover:shadow-md hover:shadow-rose/20 hover:scale-[1.02] active:scale-[0.98]"
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
