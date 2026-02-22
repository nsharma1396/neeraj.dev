import type {
  ReactNode,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
import { cn } from "../../lib/utils";

const variantStyles = {
  primary:
    "border border-[var(--theme-acc)] bg-[var(--theme-acc)] text-white hover:-translate-y-0.5 hover:shadow-[0_10px_28px_var(--theme-acc)_55]",
  secondary:
    "border border-[var(--theme-acc)] text-[var(--theme-acc)] hover:bg-[var(--theme-acc)] hover:text-white",
  ghost:
    "border border-[var(--theme-br)] text-[var(--theme-mu)] hover:border-[var(--theme-fg)]/28 hover:text-[var(--theme-fg)]",
  muted:
    "border border-[var(--theme-br)] text-[var(--theme-mu)] hover:border-[var(--theme-am)]/40 hover:text-[var(--theme-am)]",
} as const;

type ButtonVariant = keyof typeof variantStyles;

const baseClassName =
  "inline-flex items-center justify-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] py-[11px] px-5 rounded-sm no-underline transition-all duration-[220ms] md:cursor-none disabled:opacity-50";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

type ButtonAsAnchor = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

export type ButtonProps = ButtonAsAnchor | ButtonAsButton;

export function Button({
  variant = "primary",
  children,
  className,
  icon,
  iconPosition = "right",
  iconLeft,
  iconRight,
  fullWidth,
  ...props
}: ButtonProps) {
  const isAnchor = "href" in props && props.href != null;
  const variantClass = variantStyles[variant];
  const combinedClassName = cn(
    baseClassName,
    variantClass,
    fullWidth && "w-full",
    className,
  );

  const left = iconLeft ?? (icon && iconPosition === "left" ? icon : null);
  const right = iconRight ?? (icon && iconPosition === "right" ? icon : null);
  const content = (
    <>
      {left}
      {typeof children === "string" ? <span>{children}</span> : children}
      {right}
    </>
  );

  if (isAnchor) {
    const { href, ...rest } = props as ButtonAsAnchor;
    return (
      <a href={href} data-h className={combinedClassName} {...rest}>
        {content}
      </a>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} data-h className={combinedClassName} {...rest}>
      {content}
    </button>
  );
}
