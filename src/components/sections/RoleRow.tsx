import { useState } from "react";
import { Reveal } from "../custom";
import { cn } from "../../lib/utils";
import type { Role } from "../../types";

interface RoleRowProps extends Role {}

export function RoleRow({
  title,
  company,
  years,
  tags,
  delay = 0,
}: RoleRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Reveal delay={delay}>
      <div
        data-h
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "grid grid-cols-[1fr_auto] items-center gap-3.5 py-[19px] border-b transition-colors duration-300",
          isHovered
            ? "border-[var(--theme-acc)]/20"
            : "border-[var(--theme-br)]",
        )}
      >
        <div className="flex items-baseline gap-3.5 flex-wrap">
          <div className="flex flex-col items-start gap-[7px] flex-wrap justify-start">
            <span
              className={cn(
                "font-sans text-[clamp(15px,2vw,20px)] font-bold tracking-[-0.02em] transition-colors duration-200",
                isHovered
                  ? "text-[var(--theme-acc)]"
                  : "text-[var(--theme-fg)]",
              )}
            >
              {title}
            </span>
            <span className="font-mono text-[10px] text-[var(--theme-mu)] tracking-[0.06em]">
              {company}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-[7px] flex-wrap justify-end">
          <div className="flex items-center gap-[7px] flex-wrap justify-end">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] px-2 py-[3px] border border-[var(--theme-br)] rounded-sm text-[var(--theme-mu)] tracking-[0.08em]"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="font-mono text-[10px] text-[var(--theme-mu)] min-w-[66px] text-right">
            {years}
          </span>
        </div>
      </div>
    </Reveal>
  );
}
