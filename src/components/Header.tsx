"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { LocaleSwitch } from "./LocaleSwitch";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#work", label: t.nav.work },
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl backdrop-saturate-180"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link
          href={`/${locale}`}
          className="group font-mono text-sm font-semibold tracking-tight text-ink"
        >
          <span className="text-accent transition-opacity group-hover:opacity-60">{"<"}</span>
          <span className="group-hover:text-gradient">{site.initials}</span>
          <span className="text-accent transition-opacity group-hover:opacity-60">{" />"}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
              {/* underline grows from the centre on hover */}
              <span className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 bg-gradient-to-r from-grad-1 via-grad-2 to-grad-3 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitch locale={locale} />
          <ThemeToggle label={t.nav.toggleTheme} />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            className="glass grid size-9 place-items-center rounded-lg text-muted transition-colors hover:text-accent md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Reading progress, driven by the document scroll timeline. */}
      <div
        aria-hidden
        className="scroll-progress h-px bg-gradient-to-r from-grad-1 via-grad-2 to-grad-3"
      />

      {open && (
        <nav className="border-t border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-5 py-2 sm:px-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3.5 text-sm text-muted transition-colors last:border-0 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
