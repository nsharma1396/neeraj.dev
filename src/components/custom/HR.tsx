import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function HR({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn(
        "border-0 border-t border-[var(--theme-br)] max-w-[1100px] mx-auto",
        className
      )}
      {...props}
    />
  );
}
