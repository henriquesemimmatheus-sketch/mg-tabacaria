export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ink text-balance">
        {title}
      </h2>
      {description && <p className="mt-4 text-ink-muted leading-relaxed">{description}</p>}
    </div>
  );
}
