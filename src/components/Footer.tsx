import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="border-t border-line py-8">
      <div className="flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. {t.footer.rights}
        </p>
        <p>{t.footer.built}</p>
      </div>
    </footer>
  );
}
