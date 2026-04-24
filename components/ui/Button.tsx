import Link from "next/link";
import * as React from "react";

type ButtonVariant = "primary" | "secondary";

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type PolymorphicProps<T extends React.ElementType> = CommonProps & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof CommonProps | "as">;

function cn(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ");
}

const base =
  "inline-flex items-center justify-center rounded-[999px] font-semibold transition duration-300";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "h-[48px] bg-yellow-green px-5 text-[0.98rem] font-medium tracking-[-0.04em] text-aztec transition-colors duration-300 hover:bg-[#b9f53a]",
  secondary:
    "h-[48px] bg-transparent px-5 text-[0.98rem] font-medium tracking-[-0.04em] text-aztec transition-colors duration-300",
};

export default function Button<T extends React.ElementType = "button">({
  as,
  variant = "primary",
  className,
  children,
  ...props
}: PolymorphicProps<T>) {
  const Comp = (as ?? "button") as React.ElementType;

  return (
    <Comp className={cn(base, variantClasses[variant], className)} {...props}>
      {children}
    </Comp>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, "className"> &
  CommonProps & {
    href: string;
  }) {
  return (
    <Link
      href={href}
      className={cn(base, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
