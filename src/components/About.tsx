import type { Dictionary } from "@/content/dictionary";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function About({ t }: { t: Dictionary }) {
  return (
    <Section id="about" title={t.about.title}>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-lg leading-snug text-balance text-ink">{t.about.lead}</p>
          <div className="mt-5 space-y-4">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {t.about.pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 60}>
              <div className="h-full rounded-xl border border-line bg-surface p-4">
                <h3 className="text-sm font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
