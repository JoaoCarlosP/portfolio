import type { Dictionary } from "@/content/dictionary";
import { Reveal } from "./Reveal";

export function Metrics({ t }: { t: Dictionary }) {
  return (
    <section aria-label={t.metrics.title} className="pb-6">
      <p className="mb-5 font-mono text-xs tracking-widest text-muted uppercase">
        {t.metrics.title}
      </p>
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {t.metrics.items.map((item, index) => (
          <Reveal key={item.label} delay={index * 70}>
            <div className="h-full bg-surface p-5">
              <p className="font-mono text-2xl font-semibold text-accent">{item.value}</p>
              <p className="mt-0.5 font-mono text-[11px] tracking-wide text-muted uppercase">
                {item.unit}
              </p>
              <p className="mt-3 text-sm leading-snug text-ink">{item.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
