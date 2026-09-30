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
    <div className={align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}>
      <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold">{eyebrow}</span>
      <h2 className="mt-3 font-condensed text-4xl uppercase leading-[1.02] tracking-tight text-ink text-balance sm:text-6xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-ink-muted leading-relaxed">{description}</p>}
    </div>
  );
}
