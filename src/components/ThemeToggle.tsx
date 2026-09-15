"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "./icons";

/** The theme lives on <html>, set before paint by the inline script in the layout. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

/** Dark-first during SSR; the inline script corrects it before the first paint. */
function getServerSnapshot() {
  return true;
}

export function ThemeToggle({ label }: { label: string }) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage unavailable — the toggle still works for this page view
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={dark}
      className="grid size-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {dark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
