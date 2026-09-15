import type { Dictionary } from "@/content/dictionary";
import { Reveal } from "./Reveal";
import { SpotlightCard } from "./SpotlightCard";

export function Metrics({ t }: { t: Dictionary }) {
  return (
    <section aria-label={t.metrics.title} className="relative z-10 pb-6">
      <p className="mb-5 font-mono text-xs tracking-widest text-muted uppercase">
        {t.metrics.title}
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {t.metrics.items.map((item, index) => (
          <Reveal key={item.label} delay={index * 70} className="h-full">
            <SpotlightCard className="h-full glass rounded-2xl p-5">
              <p className="text-gradient font-mono text-3xl font-semibold">{item.value}</p>
              <p className="mt-0.5 font-mono text-[11px] tracking-wide text-muted uppercase">
                {item.unit}
              </p>
              <p className="mt-3 text-sm leading-snug text-ink">{item.label}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
