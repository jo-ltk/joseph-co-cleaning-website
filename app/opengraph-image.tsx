import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Joseph & Co Cleaning Services Ltd";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #111713 0%, #1a2e1f 50%, #111713 100%)",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(198,211,72,0.06) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(198,211,72,0.04) 0%, transparent 50%)",
            display: "flex",
          }}
        />

        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://josephcleaning.co.uk/logo.png"
          alt="J."
          width={260}
          height={260}
          style={{
            borderRadius: 32,
            marginBottom: 32,
          }}
        />

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.04em",
            }}
          >
            Joseph & Co
          </span>
          <span
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "rgba(198,211,72,0.85)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Cleaning Services Ltd
          </span>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, rgba(198,211,72,0.6), transparent)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
