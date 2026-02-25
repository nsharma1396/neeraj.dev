import { ExternalLink } from "lucide-react";
import { Card, Reveal, useCardHover } from "../custom";
import { cn } from "../../lib/utils";
import type { Project } from "../../types";

interface ProjectCardProps extends Project {}

function ProjectCardContent({
  num,
  title,
  desc,
}: Pick<Project, "num" | "title" | "desc">) {
  const isHovered = useCardHover();
  return (
    <>
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
          "inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.08em] transition-colors duration-200",
          isHovered ? "text-[var(--theme-acc)]" : "text-[var(--theme-mu)]",
        )}
      >
        <span>View</span>
        <span
          className={cn(
            "inline-block transition-transform duration-200",
            isHovered && "translate-x-0.5 -translate-y-0.5",
          )}
        >
          <ExternalLink className="w-4 h-4" />
        </span>
      </span>
    </>
  );
}

export function ProjectCard({
  num,
  title,
  desc,
  href,
  badge,
  delay = 0,
}: ProjectCardProps) {
  return (
    <Reveal delay={delay}>
      <Card href={href} badge={badge}>
        <ProjectCardContent num={num} title={title} desc={desc} />
      </Card>
    </Reveal>
  );
}
