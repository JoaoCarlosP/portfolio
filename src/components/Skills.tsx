import { GraduationCap, Layers, Server, Wrench } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { SpotlightCard } from "./SpotlightCard";

/** Matches the group order in the dictionary. */
const groupIcons = [Layers, Server, Wrench, GraduationCap];

export function Skills({ t }: { t: Dictionary }) {
  return (
    <Section id="skills" title={t.skills.title} lead={t.skills.lead}>
      <div className="grid gap-4 sm:grid-cols-2">
        {t.skills.groups.map((group, index) => {
          const Icon = groupIcons[index] ?? Layers;
          return (
            <Reveal key={group.title} delay={index * 60} className="h-full">
              <SpotlightCard className="h-full glass rounded-2xl p-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-grad-1/15 to-grad-2/15 text-accent">
                    <Icon size={14} />
                  </span>
                  <h3 className="font-mono text-xs tracking-widest text-muted uppercase">
                    {group.title}
                  </h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-canvas/50 px-2.5 py-1 text-[13px] text-ink transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
