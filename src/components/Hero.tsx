import Image from "next/image";
import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section className="relative pt-16 pb-16 sm:pt-24 sm:pb-20">
      <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {t.hero.available}
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-2 font-mono text-sm text-accent">{t.hero.role}</p>

          <p className="mt-6 text-xl leading-snug text-balance text-ink sm:text-2xl">
            {t.hero.headline}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{t.hero.lead}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              {t.hero.ctaProjects}
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {t.hero.ctaContact}
            </a>

            <div className="ml-1 flex items-center gap-1">
              {[
                { href: site.github, label: "GitHub", Icon: GithubIcon },
                { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                { href: `mailto:${site.email}`, label: "E-mail", Icon: MailIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:text-accent"
                >
                  <Icon width={19} height={19} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative shrink-0">
          <div className="absolute -inset-3 rounded-full bg-accent/10 blur-2xl" aria-hidden />
          <Image
            src={site.avatar}
            alt={site.name}
            width={168}
            height={168}
            priority
            className="relative size-28 rounded-full border border-line object-cover sm:size-40"
          />
        </div>
      </div>
    </section>
  );
}
