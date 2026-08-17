import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

type Variant = "solid" | "ghost";
type Surface = "light" | "dark";

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  surface?: Surface;
  icon?: ReactNode;
  hideIcon?: boolean;
  className?: string;
};

type CareButtonButtonProps = SharedProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof SharedProps | "href"> & {
    href?: undefined;
  };

type CareButtonLinkProps = SharedProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof SharedProps | "href"> & {
    href: string;
  };

export type CareButtonProps = CareButtonButtonProps | CareButtonLinkProps;

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export default function CareButton(props: CareButtonProps) {
  const {
    children,
    variant = "solid",
    surface = "light",
    icon,
    hideIcon = false,
    className,
    ...rest
  } = props;

  const classes = cn(
    "care-btn",
    variant === "ghost" ? "care-btn--ghost" : "care-btn--solid",
    surface === "dark" && "care-btn--on-dark",
    className,
  );

  const content = (
    <>
      <span className="care-btn-label">{children}</span>
      {hideIcon ? null : (
        <span className="care-btn-icon" aria-hidden>
          {icon ?? <ArrowRight size={16} weight="bold" />}
        </span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as Omit<CareButtonLinkProps, keyof SharedProps>;

    if (isInternalHref(href)) {
      return (
        <Link href={href} className={classes} {...linkRest}>
          {content}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...linkRest}>
        {content}
      </a>
    );
  }

  const buttonRest = rest as Omit<CareButtonButtonProps, keyof SharedProps>;

  return (
    <button type={buttonRest.type ?? "button"} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
