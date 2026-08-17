import type { ReactNode } from "react";

type CareSectionHeadingProps = {
  eyebrow: string;
  lines: [string, string];
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  titleClassName?: string;
  tone?: "light" | "dark";
  eyebrowAttrs?: Record<string, string | boolean>;
  children?: ReactNode;
};

export default function CareSectionHeading({
  eyebrow,
  lines,
  as: Title = "h2",
  id,
  className,
  titleClassName,
  tone = "light",
  eyebrowAttrs,
  children,
}: CareSectionHeadingProps) {
  const rootClass = ["care-section-heading", `care-section-heading--${tone}`, className]
    .filter(Boolean)
    .join(" ");
  const titleClass = ["care-section-heading-title", titleClassName].filter(Boolean).join(" ");

  return (
    <header className={rootClass}>
      <p className="care-eyebrow" {...eyebrowAttrs}>
        {eyebrow}
      </p>
      <Title id={id} className={titleClass}>
        <span className="care-section-heading-line">{lines[0]}</span>
        <span className="care-section-heading-line">{lines[1]}</span>
      </Title>
      {children}
    </header>
  );
}
