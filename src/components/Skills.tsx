import type { Dictionary } from "@/content/dictionary";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Skills({ t }: { t: Dictionary }) {
  return (
    <Section id="skills" title={t.skills.title} lead={t.skills.lead}>
      <div className="grid gap-4 sm:grid-cols-2">
        {t.skills.groups.map((group, index) => (
          <Reveal key={group.title} delay={index * 60} className="h-full">
            <div className="h-full rounded-xl border border-line bg-surface p-5">
              <h3 className="font-mono text-xs tracking-widest text-muted uppercase">
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-canvas px-2.5 py-1 text-[13px] text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
