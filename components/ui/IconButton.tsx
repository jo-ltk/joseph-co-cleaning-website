import Link from "next/link";
import * as React from "react";

import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type Props = {
  href?: string;
  "aria-label": string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

function cn(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ");
}

const base =
  "inline-flex items-center justify-center rounded-full bg-yellow-green text-aztec transition-transform duration-300 hover:translate-x-[2px] hover:bg-[#b9f53a]";

const sizes = {
  sm: "h-[48px] w-[48px]",
  md: "h-[48px] w-[48px]",
  lg: "h-[56px] w-[56px]",
};

export default function IconButton({
  href,
  className,
  size = "md",
  ...props
}: Props) {
  const classes = cn(base, sizes[size], className);

  const iconSize = size === "lg" ? 22 : 18;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        <ArrowUpRight size={iconSize} weight="bold" />
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      <ArrowUpRight size={iconSize} weight="bold" />
    </button>
  );
}

