import Link from "next/link";

export default function CareLogo({
  inverted = false,
  href = "/care",
}: {
  inverted?: boolean;
  href?: string;
}) {
  const ink = inverted ? "#FFFcf7" : "#0B1C2C";
  const accent = "#B23B3B";

  return (
    <Link href={href} className="inline-flex items-center gap-3" aria-label="Care Connect home">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="3" fill={inverted ? "rgba(255,252,247,0.08)" : "#0B1C2C"} />
        <path
          d="M11 18c0-4.2 3.1-7 7-7 2.4 0 4.4 1 5.6 2.5"
          stroke={inverted ? "#FFFcf7" : "#DCE8EE"}
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M25 18c0 4.2-3.1 7-7 7-2.4 0-4.4-1-5.6-2.5"
          stroke={inverted ? "#FFFcf7" : "#DCE8EE"}
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <circle cx="25.5" cy="11.5" r="2.1" fill={accent} />
      </svg>
      <span className="leading-none">
        <span
          className="block font-semibold tracking-[-0.03em]"
        style={{ color: ink, fontFamily: "var(--cc-sans)", fontSize: "1.05rem" }}
        >
          Care Connect
        </span>
        <span
          className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.16em]"
          style={{ color: inverted ? "rgba(255,252,247,0.62)" : "#3A6A86" }}
        >
          Healthcare Staffing
        </span>
      </span>
    </Link>
  );
}
