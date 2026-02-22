import { NavLink } from "./NavLink";
import { PalettePicker } from "./PalettePicker";
import { NAV_LINKS } from "../../constants";
import { cn } from "../../lib/utils";

interface NavProps {
  ready: boolean;
}

export function Nav({ ready }: NavProps) {
  return (
    <nav
      className={cn(
        "md:fixed top-0 left-0 right-0 z-[200] md:h-[54px] h-auto",
        "flex items-center justify-between px-[5vw]",
        "border-b border-[var(--theme-br)] backdrop-blur-[20px]",
        "transition-opacity duration-[800ms] delay-200",
        "flex flex-col md:flex-row gap-2 md:gap-0 md:pb-0 pb-2",
        ready ? "opacity-100" : "opacity-0",
      )}
      style={{ background: "var(--theme-bg)e6" }}
    >
      <span className="font-sans font-extrabold text-[15px] tracking-[-0.02em] text-[var(--theme-fg)] flex items-center self-start gap-2">
        <img src="/favicon.png" alt="Neeraj Sharma" className="w-14 h-14" />
      </span>
      <div className="flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <NavLink key={label} label={label} href={href} />
        ))}
      </div>
      <div className="fixed top-4 right-4 md:relative md:top-auto md:right-auto">
        <PalettePicker />
      </div>
    </nav>
  );
}
