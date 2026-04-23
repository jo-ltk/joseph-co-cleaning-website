import * as React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function cn(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ");
}

export default function SectionTag({ children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-[6px] bg-yellow-green px-3 py-1 font-semibold uppercase tracking-[0.08em] text-aztec",
        className,
      )}
      style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px" }}
    >
      {children}
    </span>
  );
}

