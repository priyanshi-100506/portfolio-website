type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
};

export function SectionHeading({ eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold leading-tight text-pearl sm:text-4xl lg:text-5xl">{title}</h2>
      {copy ? <p className="mt-5 text-base leading-8 text-mist sm:text-lg">{copy}</p> : null}
    </div>
  );
}
