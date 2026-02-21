import { Copy, ExternalLink } from "lucide-react";
import { CONTACT_EMAIL, FOOTER_LINKS } from "../../constants";
import { toast } from "sonner";

export function Footer() {
  return (
    <footer className="py-12 px-[5vw] pb-8 border-t border-[var(--theme-br)] flex justify-between items-end flex-wrap gap-5">
      <div>
        <div className="font-sans text-[38px] font-extrabold tracking-[-0.04em] leading-none mb-1.5">
          Neeraj Sharma
        </div>
        <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-[var(--theme-fg)]/60">
          <span>{CONTACT_EMAIL}</span>
          <Copy
            className="w-4 h-4"
            onClick={() => {
              navigator.clipboard.writeText(CONTACT_EMAIL);
              toast.success("Copied to clipboard");
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        {FOOTER_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-h
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--theme-mu)] tracking-[0.07em] transition-colors duration-200 hover:text-[var(--theme-acc)] no-underline"
          >
            <span>{label}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        ))}
      </div>
    </footer>
  );
}
