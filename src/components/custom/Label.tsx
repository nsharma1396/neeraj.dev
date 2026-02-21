import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 mb-9",
        "font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--theme-acc)]",
        className
      )}
      {...props}
    >
      <div className="w-4 h-px bg-[var(--theme-acc)]" />
      <span>{children}</span>
    </div>
  );
}
