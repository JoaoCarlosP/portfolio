"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "./brand-icons";
import { Section } from "./Section";
import { SpotlightCard } from "./SpotlightCard";

export function Contact({ t }: { t: Dictionary }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — the mailto link below still works
    }
  }

  const channels = [
    {
      label: t.contact.linkedinLabel,
      value: "/in/joao-carlosp",
      href: site.linkedin,
      Icon: LinkedinIcon,
    },
    {
      label: t.contact.githubLabel,
      value: `@${site.githubUser}`,
      href: site.github,
      Icon: GithubIcon,
    },
  ];

  return (
    <Section id="contact" title={t.contact.title} lead={t.contact.lead}>
      <div className="grid gap-3 sm:grid-cols-2">
        <SpotlightCard className="glass rounded-2xl p-5 sm:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-grad-1/15 to-grad-2/15 text-accent">
              <Mail size={17} />
            </span>
            <div className="mr-auto">
              <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                {t.contact.emailLabel}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-ink transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="glass inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-accent"
            >
              {copied ? (
                <Check size={14} className="text-emerald-500" />
              ) : (
                <Copy size={14} />
              )}
              {copied ? t.contact.copied : t.contact.copy}
            </button>
          </div>
        </SpotlightCard>

        {channels.map(({ label, value, href, Icon }) => (
          <SpotlightCard key={label} className="glass rounded-2xl">
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-3 p-5"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-grad-1/15 to-grad-2/15 text-accent">
                <Icon width={17} height={17} />
              </span>
              <div className="mr-auto">
                <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                  {label}
                </p>
                <p className="text-sm text-ink">{value}</p>
              </div>
              <ArrowUpRight
                size={16}
                className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </a>
          </SpotlightCard>
        ))}

        <SpotlightCard className="glass rounded-2xl p-5 sm:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-grad-1/15 to-grad-2/15 text-accent">
              <MapPin size={17} />
            </span>
            <div>
              <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                {t.contact.locationLabel}
              </p>
              <p className="text-sm text-ink">{site.location}</p>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </Section>
  );
}
