import { ArrowDown, Mail } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { Avatar } from "./Avatar";
import { GithubIcon, LinkedinIcon } from "./brand-icons";

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section className="relative pt-16 pb-16 sm:pt-24 sm:pb-20">
      <div className="relative z-10 flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 font-mono text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {t.hero.available}
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-2 font-mono text-[13px] text-balance text-accent sm:text-sm">
            {t.hero.role}
          </p>

          <p className="text-gradient mt-6 text-xl leading-snug font-medium text-balance sm:text-2xl">
            {t.hero.headline}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{t.hero.lead}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink"
            >
              {/* gradient wash slides across on hover */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-grad-1 via-grad-2 to-grad-3 transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">{t.hero.ctaProjects}</span>
              <ArrowDown
                size={15}
                className="relative transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="glass group inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              <Mail size={15} className="transition-transform duration-300 group-hover:scale-110" />
              {t.hero.ctaContact}
            </a>

            <div className="ml-1 flex items-center gap-1">
              {[
                { href: site.github, label: "GitHub", Icon: GithubIcon },
                { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="grid size-9 place-items-center rounded-lg text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
                >
                  <Icon width={19} height={19} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Avatar />

      </div>
    </section>
  );
}
