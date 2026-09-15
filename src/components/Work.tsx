import { Briefcase } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { SpotlightCard } from "./SpotlightCard";

export function Work({ t }: { t: Dictionary }) {
  return (
    <Section id="work" title={t.work.title}>
      <Reveal>
        <SpotlightCard className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex gap-4">
              <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-grad-1/15 to-grad-2/15 text-accent">
                <Briefcase size={18} />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ink">
                  {t.work.role}
                </h3>
                <p className="mt-1 font-mono text-xs tracking-wide text-accent">
                  {t.work.subtitle}
                </p>
              </div>
            </div>
            <p className="font-mono text-xs text-muted">{t.work.period}</p>
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            {t.work.summary}
          </p>

          <ul className="mt-6 space-y-3">
            {t.work.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 text-[15px] leading-relaxed text-ink"
              >
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-grad-1 to-grad-2"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 border-t border-line pt-4 text-xs text-muted italic">
            {t.work.note}
          </p>
        </SpotlightCard>
      </Reveal>
    </Section>
  );
}
