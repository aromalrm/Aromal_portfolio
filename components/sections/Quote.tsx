import { Quote as QuoteIcon } from "lucide-react";
import { QUOTE } from "@/lib/data";

export function Quote() {
  return (
    <section className="px-5 py-7 flex justify-center" aria-label="Quote">
      <figure className="border border-border rounded-xl bg-card px-[22px] py-[18px] max-w-[520px] w-full flex items-start gap-3.5">
        <QuoteIcon
          size={22}
          className="text-muted-foreground opacity-50 shrink-0"
          aria-hidden="true"
        />
        <div>
          <blockquote className="text-[13px] italic text-foreground leading-relaxed mb-2">
            {QUOTE.text}
          </blockquote>
          <figcaption className="text-[11px] text-muted-foreground">
            — {QUOTE.author}
          </figcaption>
        </div>
      </figure>
    </section>
  );
}
