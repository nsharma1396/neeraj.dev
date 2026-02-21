import { Label, Reveal, SectionTitle } from "../custom";
import { CONTACT_LINKS, CONTACT_EMAIL } from "../../constants";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-[110px] px-[5vw] max-w-[1100px] mx-auto"
    >
      <Reveal>
        <Label>Contact</Label>
        <SectionTitle>
          Let&apos;s build
          <br />
          something.
        </SectionTitle>
      </Reveal>
      <div className="flex w-full justify-between">
        <Reveal delay={80}>
          <p className="font-mono text-xs text-[var(--theme-fg)]/70 leading-[1.9] mb-9">
            Open to interesting problems,
            <br />
            collaborations, and conversations
            <br />
            about frontend systems.
          </p>
          {CONTACT_LINKS.map(({ label, value, href }) => (
            <div key={label} className="mb-4">
              <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--theme-acc)] mb-1">
                {label}
              </div>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-h
                className="font-mono text-xs text-[var(--theme-fg)] transition-colors duration-200 hover:text-[var(--theme-acc)]"
              >
                {value} ↗
              </a>
            </div>
          ))}
        </Reveal>
        <Reveal delay={160}>
          <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--theme-acc)] mb-2.5">
            EMAIL
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            data-h
            className="inline-flex items-center gap-2 py-3 px-6 rounded border border-[var(--theme-acc)] text-[var(--theme-acc)] font-mono text-[11px] tracking-[0.12em] no-underline transition-all duration-[220ms] hover:bg-[var(--theme-acc)] hover:text-white"
          >
            {CONTACT_EMAIL} ↗
          </a>
          <div className="mt-8">
            <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--theme-acc)] mb-2.5">
              RESUME
            </div>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 py-3 px-6 rounded border border-[var(--theme-acc)] text-[var(--theme-acc)] font-mono text-[11px] tracking-[0.12em] no-underline transition-all duration-[220ms] hover:bg-[var(--theme-acc)] hover:text-white w-full"
            >
              <svg
                width="12"
                height="12"
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
              Download Resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
