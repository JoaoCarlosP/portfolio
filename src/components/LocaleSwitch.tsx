import Link from "next/link";
import { otherLocale, type Locale } from "@/lib/i18n";

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const target = otherLocale(locale);

  return (
    <Link
      href={`/${target}`}
      hrefLang={target}
      aria-label={target === "en" ? "Switch to English" : "Mudar para português"}
      className="glass grid h-9 place-items-center rounded-lg px-3 font-mono text-xs font-medium tracking-wide text-muted transition-colors hover:text-accent"
    >
      {target.toUpperCase()}
    </Link>
  );
}
