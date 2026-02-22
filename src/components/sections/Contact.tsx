import { ExternalLink, Mail } from "lucide-react";
import { Button, Label, Reveal, SectionTitle } from "../custom";
import { CONTACT_LINKS, CONTACT_EMAIL, RESUME_URL } from "../../constants";

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
      <div className="flex w-full justify-between flex-col md:flex-row">
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
                className="inline-flex items-center gap-2 font-mono text-xs text-[var(--theme-fg)] transition-colors duration-200 hover:text-[var(--theme-acc)]"
              >
                <span>{value}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </Reveal>
        <Reveal delay={160}>
          <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--theme-acc)] mb-2.5">
            EMAIL
          </div>
          <Button
            href={`mailto:${CONTACT_EMAIL}`}
            variant="primary"
            icon={<Mail className="w-4 h-4" />}
            iconPosition="right"
          >
            {CONTACT_EMAIL}
          </Button>
          <div className="mt-8">
            <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--theme-acc)] mb-2.5">
              RESUME
            </div>
            <Button
              href={RESUME_URL}
              target="_blank"
              variant="primary"
              fullWidth
              icon={<ExternalLink className="w-4 h-4" />}
            >
              View Resume
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
