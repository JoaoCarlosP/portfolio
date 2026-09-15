import type { Dictionary } from "@/content/dictionary";
import { projects, type Project } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { ArrowUpRight, CodeIcon } from "./icons";

const statusStyles: Record<Project["status"], string> = {
  live: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  wip: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  code: "border-line bg-canvas text-muted",
};

function ProjectCard({
  project,
  t,
  locale,
}: {
  project: Project;
  t: Dictionary;
  locale: Locale;
}) {
  const copy = project.copy[locale];

  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/50">
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
            <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md border border-line bg-canvas px-2 py-1 font-mono text-[11px] text-muted"
          >
            {tech}
          </li>
        ))}
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
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <CodeIcon width={14} height={14} />
            {t.projects.viewCode}
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-ink transition-opacity hover:opacity-90"
          >
            {t.projects.viewDemo}
            <ArrowUpRight width={14} height={14} />
          </a>
        )}
      </div>
    </article>
  );
}

export function Projects({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <Section id="projects" title={t.projects.title} lead={t.projects.lead}>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 70} className="h-full">
            <ProjectCard project={project} t={t} locale={locale} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
