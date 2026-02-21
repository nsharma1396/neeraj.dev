import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export function SectionTitle({
  children,
  className,
  ...props
}: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "font-sans font-extrabold text-[clamp(30px,4.5vw,52px)] tracking-[-0.04em] leading-[1.02] text-[var(--theme-fg)] mb-11",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
