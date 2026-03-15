interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, className = "" }: SectionTitleProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-2xl font-bold tracking-tight text-[var(--navy)] sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-[var(--muted)] sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
