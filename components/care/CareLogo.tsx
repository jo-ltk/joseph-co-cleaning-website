import Link from "next/link";

export default function CareLogo({
  inverted = false,
  compact = false,
  href = "/care",
}: {
  inverted?: boolean;
  compact?: boolean;
  href?: string;
}) {
  const ink = inverted ? "#FFFFFF" : "#122B78";
  const accent = "#C0312D";
  const markSize = compact ? 32 : 36;

  return (
    <Link href={href} className="inline-flex items-center gap-3" aria-label="Care Connect home">
      <svg width={markSize} height={markSize} viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx={compact ? "18" : "3"} fill={inverted ? "rgba(255,255,255,0.08)" : "#122B78"} />
        <path
          d="M11 18c0-4.2 3.1-7 7-7 2.4 0 4.4 1 5.6 2.5"
          stroke={inverted ? "#FFFFFF" : "#F3F7FC"}
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M25 18c0 4.2-3.1 7-7 7-2.4 0-4.4-1-5.6-2.5"
          stroke={inverted ? "#FFFFFF" : "#F3F7FC"}
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <circle cx="25.5" cy="11.5" r="2.1" fill={accent} />
      </svg>
      <span className="leading-none">
        <span
          className="block font-semibold tracking-[-0.03em]"
          style={{
            color: ink,
            fontFamily: compact ? "var(--cc-display)" : "var(--cc-sans)",
            fontSize: compact ? "1.15rem" : "1.05rem",
            fontWeight: compact ? 500 : 600,
          }}
        >
          Care Connect
        </span>
        {compact ? null : (
          <span
            className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.16em]"
            style={{ color: inverted ? "rgba(255,255,255,0.62)" : "#3164B7" }}
          >
            Healthcare Staffing
          </span>
        )}
      </span>
    </Link>
  );
}
