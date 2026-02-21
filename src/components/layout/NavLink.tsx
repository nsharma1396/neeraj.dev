import { useState } from "react";
import { cn } from "../../lib/utils";
import type { NavLinkItem } from "../../types";

interface NavLinkProps {
  label: NavLinkItem["label"];
  href: NavLinkItem["href"];
}

export function NavLink({ label, href }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      data-h
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "font-mono text-xs font-medium tracking-[0.12em] no-underline relative pb-0.5 transition-colors duration-200",
        isHovered ? "text-white" : "text-[var(--theme-fg)]/85",
      )}
    >
      {label}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-px rounded-sm transition-all duration-300 ease-out",
          isHovered ? "w-full shadow-[0_0_8px_var(--theme-acc)]" : "w-0",
        )}
        style={{ background: "var(--theme-acc)" }}
      />
    </a>
  );
}
