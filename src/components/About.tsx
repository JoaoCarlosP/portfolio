import { Compass, Component, Layers, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { SpotlightCard } from "./SpotlightCard";

/** Matches the pillar order in the dictionary. */
const pillarIcons = [Layers, Component, ShieldCheck, Compass];

export function About({ t }: { t: Dictionary }) {
  return (
    <Section id="about" title={t.about.title}>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-gradient text-lg leading-snug font-medium text-balance">
            {t.about.lead}
          </p>
          <div className="mt-5 space-y-4">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {t.about.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? Layers;
            return (
              <Reveal key={pillar.title} delay={index * 60} className="h-full">
                <SpotlightCard className="h-full glass rounded-2xl p-4">
                  <span className="mb-3 grid size-8 place-items-center rounded-lg bg-gradient-to-br from-grad-1/15 to-grad-2/15 text-accent">
                    <Icon size={16} />
                  </span>
                  <h3 className="text-sm font-semibold text-ink">{pillar.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{pillar.body}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
