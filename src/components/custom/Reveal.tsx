import type { ReactNode, HTMLAttributes } from "react";
import { useRef } from "react";
import { useInView } from "../../hooks/useInView";
import { cn } from "../../lib/utils";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
}

export function Reveal({
  children,
  delay = 0,
  className,
  ...props
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  return (
    <div
      ref={containerRef}
      className={cn(
        "transition-[opacity,transform] duration-[750ms] ease-out",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
