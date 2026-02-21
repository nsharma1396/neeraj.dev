import { useState } from "react";
import { Reveal } from "../custom";
import { cn } from "../../lib/utils";
import type { Project } from "../../types";

interface ProjCardProps extends Project {}

export function ProjCard({
  num,
  title,
  desc,
  href,
  badge,
  delay = 0,
}: ProjCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Reveal delay={delay}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-h
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "block p-6 rounded-md border relative no-underline transition-all duration-300 ease-out",
          isHovered
            ? "border-[var(--theme-acc)]/30 bg-[var(--theme-acc)]/[0.03] -translate-y-1 shadow-[0_18px_50px_rgba(0,0,0,.5)]"
            : "border-[var(--theme-br)] bg-transparent",
        )}
      >
        {badge && (
          <span className="absolute top-3 right-3 font-mono text-[8px] tracking-[0.14em] px-[7px] py-[3px] bg-[var(--theme-am)]/10 border border-[var(--theme-am)]/25 rounded-sm text-[var(--theme-am)]">
            {badge}
          </span>
        )}
        <div className="font-mono text-[9px] tracking-[0.18em] text-[var(--theme-mu)] mb-3">
          {num}
        </div>
        <div
          className={cn(
            "font-sans text-[17px] font-bold tracking-[-0.02em] mb-2 transition-colors duration-200",
            isHovered ? "text-[var(--theme-acc)]" : "text-[var(--theme-fg)]",
          )}
        >
          {title}
        </div>
        <div className="font-mono text-[11px] text-[var(--theme-mu)] leading-[1.7] mb-4">
          {desc}
        </div>
        <span
          className={cn(
            "font-mono text-[10px] tracking-[0.08em] transition-colors duration-200 inline-flex items-center gap-0.5",
            isHovered ? "text-[var(--theme-acc)]" : "text-[var(--theme-mu)]",
          )}
        >
          View{" "}
          <span
            className={cn(
              "inline-block transition-transform duration-200",
              isHovered && "translate-x-0.5 -translate-y-0.5",
            )}
          >
            ↗
          </span>
        </span>
      </a>
    </Reveal>
  );
}
