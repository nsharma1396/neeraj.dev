import { HeroOrb } from "../visual";
import { cn } from "../../lib/utils";

interface HeroProps {
  ready: boolean;
}

export function Hero({ ready }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pt-[54px] px-[5vw] pb-20 overflow-hidden">
      <HeroOrb />
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_75%_80%_at_72%_50%,transparent_20%,rgba(7,7,15,.92)_72%)]"
        aria-hidden
      />
      <div
        className={cn(
          "relative z-[2] max-w-[680px] transition-all duration-[1.1s] delay-100",
          ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
      >
        <div className="inline-flex items-center gap-2 border border-[var(--theme-acc)]/30 rounded-sm py-1.5 px-3 mb-6 font-mono text-[9px] tracking-[0.2em] text-[var(--theme-acc)]">
          <div
            className="w-1.5 h-1.5 rounded-full bg-[var(--theme-acc)] animate-[blink_2s_infinite]"
            aria-hidden
          />
          STAFF FRONTEND ENGINEER
        </div>
        <h1 className="font-sans font-extrabold text-[clamp(54px,11vw,130px)] tracking-[-0.05em] leading-[0.88] mb-6">
          Neeraj
          <br />
          <span className="text-[var(--theme-acc)]">Sharma</span>
        </h1>
        <p className="font-mono text-[clamp(11px,1.2vw,13px)] text-[var(--theme-fg)]/78 leading-[1.85] max-w-[360px] mb-9">
          Building frontend platforms and desktop
          <br />
          applications that perform at scale.
          <br />
          Bengaluru, India.
        </p>
        <div className="flex gap-2.5 flex-wrap">
          <a
            href="#work"
            data-h
            className="font-mono text-[10px] tracking-[0.12em] py-[11px] px-5 rounded-sm border border-[var(--theme-acc)] bg-[var(--theme-acc)] text-white no-underline transition-all duration-[220ms] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_var(--theme-acc)_55]"
          >
            View work ↓
          </a>
          <a
            href="#contact"
            data-h
            className="font-mono text-[10px] tracking-[0.12em] py-[11px] px-5 rounded-sm border border-[var(--theme-br)] bg-transparent text-[var(--theme-mu)] no-underline transition-all duration-[220ms] hover:border-[var(--theme-fg)]/28 hover:text-[var(--theme-fg)]"
          >
            Contact →
          </a>
          <a
            href="/resume.pdf"
            download
            data-h
            className="font-mono text-[10px] tracking-[0.12em] py-[11px] px-5 rounded-sm border border-[var(--theme-br)] bg-transparent text-[var(--theme-mu)] no-underline inline-flex items-center gap-1.5 transition-all duration-[220ms] hover:border-[var(--theme-am)]/40 hover:text-[var(--theme-am)]"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
