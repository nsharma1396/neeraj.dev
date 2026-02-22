import { lazy, Suspense } from "react";
import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react";

import { Button } from "../custom";
import { cn } from "../../lib/utils";
import { CONTACT_EMAIL, RESUME_URL } from "@/constants";

const HeroOrb = lazy(() => import("../visual/HeroOrb"));

interface HeroProps {
  ready: boolean;
}

export function Hero({ ready }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pt-0 md:pt-[54px] px-[5vw] pb-20 overflow-hidden">
      <Suspense fallback={null}>
        <HeroOrb />
      </Suspense>
      <div
        className="absolute inset-0 z-[1] md:pointer-events-none bg-[radial-gradient(ellipse_75%_80%_at_72%_50%,transparent_20%,rgba(7,7,15,.92)_72%)]"
        aria-hidden
      />
      <div
        className={cn(
          "relative z-[2] max-w-[680px] transition-all duration-[1.1s] delay-100",
          ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
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
          <br />
          Connect with me at{" "}
          <a
            className="underline font-bold text-[14px] text-[var(--theme-inv)]"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <div className="flex gap-2.5 flex-wrap">
          <Button
            href="#work"
            variant="primary"
            icon={<ArrowDown className="w-2.5 h-2.5" />}
          >
            View work
          </Button>
          <Button
            href="#contact"
            variant="ghost"
            icon={<ArrowRight className="w-2.5 h-2.5" />}
          >
            Contact
          </Button>
          <Button
            href={RESUME_URL}
            target="_blank"
            variant="muted"
            iconRight={<ExternalLink className="w-4 h-4" />}
          >
            Resume
          </Button>
        </div>
      </div>
    </section>
  );
}
