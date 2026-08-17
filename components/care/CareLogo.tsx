import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/care/care-connect-logo.png";
const LOGO_WIDTH = 715;
const LOGO_HEIGHT = 469;

export default function CareLogo({
  inverted = false,
  compact = false,
  href = "/care",
}: {
  inverted?: boolean;
  compact?: boolean;
  href?: string;
}) {
  const height = compact ? 32 : inverted ? 52 : 44;
  const width = Math.round((height * LOGO_WIDTH) / LOGO_HEIGHT);

  return (
    <Link
      href={href}
      className={`care-logo-link${compact ? " care-logo-link--compact" : ""}${inverted ? " care-logo-link--inverted" : ""}`}
      aria-label="Care Connect home"
    >
      <Image
        src={LOGO_SRC}
        alt="Care Connect"
        width={width}
        height={height}
        sizes={compact ? "49px" : inverted ? "80px" : "67px"}
        className="care-logo-image"
        priority={compact}
      />
    </Link>
  );
}
