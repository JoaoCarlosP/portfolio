"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { Section } from "./Section";
import {
  ArrowUpRight,
  CheckIcon,
  CopyIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PinIcon,
} from "./icons";

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
        <div className="rounded-xl border border-line bg-surface p-5 sm:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <MailIcon className="text-accent" width={18} height={18} />
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
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {copied ? <CheckIcon width={14} height={14} /> : <CopyIcon width={14} height={14} />}
              {copied ? t.contact.copied : t.contact.copy}
            </button>
          </div>
        </div>

        {channels.map(({ label, value, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-center gap-3 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/50"
          >
            <Icon className="text-accent" width={18} height={18} />
            <div className="mr-auto">
              <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                {label}
              </p>
              <p className="text-sm text-ink">{value}</p>
            </div>
            <ArrowUpRight
              width={16}
              height={16}
              className="text-muted transition-colors group-hover:text-accent"
            />
          </a>
        ))}

        <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-5 sm:col-span-2">
          <PinIcon className="text-accent" width={18} height={18} />
          <div>
            <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
              {t.contact.locationLabel}
            </p>
            <p className="text-sm text-ink">{site.location}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
