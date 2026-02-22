import { Copy } from "lucide-react";
import { CONTACT_EMAIL } from "../../constants";
import { toast } from "sonner";

export function Footer() {
  return (
    // flex column for mobile and flex row for desktop
    <footer className="py-12 px-[5vw] pb-8 border-t border-[var(--theme-br)] flex justify-between md:items-end flex-col md:flex-row md:flex-wrap gap-5">
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
    </footer>
  );
}
