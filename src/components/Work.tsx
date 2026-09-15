import type { Dictionary } from "@/content/dictionary";
import { Section } from "./Section";

export function Work({ t }: { t: Dictionary }) {
  return (
    <Section id="work" title={t.work.title}>
      <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-ink">{t.work.role}</h3>
            <p className="mt-1 font-mono text-xs tracking-wide text-accent">
              {t.work.subtitle}
            </p>
          </div>
          <p className="font-mono text-xs text-muted">{t.work.period}</p>
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-muted">{t.work.summary}</p>

        <ul className="mt-6 space-y-3">
          {t.work.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-ink">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 border-t border-line pt-4 text-xs text-muted italic">
          {t.work.note}
        </p>
      </div>
    </Section>
  );
}
