type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="mb-6">
      <p className="mb-2 text-[0.74rem] uppercase tracking-[0.22em] text-[var(--color-accent-soft)]">
        {eyebrow}
      </p>
      <h2 className="mt-0 text-[clamp(1.6rem,3vw,3rem)] font-medium">{title}</h2>
      <p className="max-w-2xl text-[var(--color-text-dim)] leading-relaxed">{description}</p>
    </header>
  );
}
