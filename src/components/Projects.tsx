"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Code2 } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { projects, type Project } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { SpotlightCard } from "./SpotlightCard";

const statusStyles: Record<Project["status"], string> = {
  live: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  wip: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  code: "border-line bg-canvas text-muted",
};

/** Techs shared by more than one project, most common first. */
function useFilters() {
  return useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      for (const tech of project.stack) {
        counts.set(tech, (counts.get(tech) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .filter(([, count]) => count > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tech]) => tech);
  }, []);
}

function ProjectCard({
  project,
  t,
  locale,
  active,
  onPickTech,
}: {
  project: Project;
  t: Dictionary;
  locale: Locale;
  active: string | null;
  onPickTech: (tech: string) => void;
}) {
  const copy = project.copy[locale];

  return (
    <SpotlightCard
      as="article"
      className="flex h-full flex-col glass rounded-2xl p-6"
    >
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="mr-auto text-base font-semibold text-ink">{project.title}</h3>
        <span
          className={`rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase ${statusStyles[project.status]}`}
        >
          {t.projects.status[project.status]}
        </span>
        <span className="font-mono text-[11px] text-muted">{project.year}</span>
      </div>

      <p className="mt-1 font-mono text-xs text-accent">{copy.tagline}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted">{copy.description}</p>

      <p className="mt-5 font-mono text-[10px] tracking-widest text-muted uppercase">
        {t.projects.highlightsLabel}
      </p>
      <ul className="mt-2 space-y-1.5">
        {copy.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2 text-[13px] leading-relaxed text-ink">
            <span
              aria-hidden
              className="mt-1.5 size-1 shrink-0 rounded-full bg-gradient-to-r from-grad-1 to-grad-2"
            />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => {
          const isActive = active === tech;
          return (
            <li key={tech}>
              <button
                type="button"
                onClick={() => onPickTech(tech)}
                className={`rounded-md border px-2 py-1 font-mono text-[11px] transition-colors ${
                  isActive
                    ? "border-accent/50 bg-accent-soft text-accent"
                    : "border-line bg-canvas/50 text-muted hover:border-accent/40 hover:text-accent"
                }`}
              >
                {tech}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <span className="mr-auto font-mono text-[11px] text-muted">
          {t.projects.kind[project.kind]}
        </span>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="glass group/link inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:text-accent"
          >
            <Code2 size={14} />
            {t.projects.viewCode}
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer noopener"
            className="group/demo relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-ink"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-grad-1 via-grad-2 to-grad-3 transition-transform duration-500 group-hover/demo:translate-x-0" />
            <span className="relative">{t.projects.viewDemo}</span>
            <ArrowUpRight
              size={14}
              className="relative transition-transform duration-300 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5"
            />
          </a>
        )}
      </div>
    </SpotlightCard>
  );
}

export function Projects({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [active, setActive] = useState<string | null>(null);
  const filters = useFilters();

  const shown = active ? projects.filter((p) => p.stack.includes(active)) : projects;

  function pick(tech: string) {
    setActive((current) => (current === tech ? null : tech));
  }

  return (
    <Section id="projects" title={t.projects.title} lead={t.projects.lead}>
      <div
        role="group"
        aria-label={t.projects.filterLabel}
        className="mb-6 flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setActive(null)}
          aria-pressed={active === null}
          className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
            active === null
              ? "border-accent/50 bg-accent-soft text-accent"
              : "border-line text-muted hover:border-accent/40 hover:text-accent"
          }`}
        >
          {t.projects.filterAll}
        </button>
        {filters.map((tech) => (
          <button
            key={tech}
            type="button"
            onClick={() => pick(tech)}
            aria-pressed={active === tech}
            className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
              active === tech
                ? "border-accent/50 bg-accent-soft text-accent"
                : "border-line text-muted hover:border-accent/40 hover:text-accent"
            }`}
          >
            {tech}
          </button>
        ))}
        <span aria-live="polite" className="ml-auto font-mono text-[11px] text-muted">
          {shown.length} {shown.length === 1 ? t.projects.countOne : t.projects.countMany}
        </span>
      </div>

      {shown.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-muted">
          {t.projects.filterEmpty}
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {shown.map((project, index) => (
            <Reveal key={project.slug} delay={index * 70} className="h-full">
              <ProjectCard
                project={project}
                t={t}
                locale={locale}
                active={active}
                onPickTech={pick}
              />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
