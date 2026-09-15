"use client";

import { useState, useSyncExternalStore } from "react";
import { Download, Share, X } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "pwa-dismissed";

/* ------------------------------------------------------------------ *
 * beforeinstallprompt fires once, and often before React has mounted,
 * so it is captured in a module-level store rather than in an effect.
 * ------------------------------------------------------------------ */

let deferredEvent: InstallEvent | null = null;
let listening = false;
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function startListening() {
  if (listening || typeof window === "undefined") return;
  listening = true;

  window.addEventListener("beforeinstallprompt", (event) => {
    // keep the browser's own mini-infobar from taking over
    event.preventDefault();
    deferredEvent = event as InstallEvent;
    notify();
  });

  window.addEventListener("appinstalled", () => {
    deferredEvent = null;
    notify();
  });
}

function subscribe(onChange: () => void) {
  startListening();
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

const getInstallEvent = () => deferredEvent;
const noInstallEvent = () => null;

/** Resolves to false during SSR, true once hydrated. */
const subscribeNever = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS reports installs through a non-standard flag
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function wasDismissed() {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Install affordance. Android and desktop Chromium fire
 * beforeinstallprompt, so they get a real button; iOS has no such API and
 * gets the Share-sheet instructions instead.
 */
export function InstallPrompt({ t }: { t: Dictionary }) {
  const hydrated = useSyncExternalStore(subscribeNever, clientSnapshot, serverSnapshot);
  const deferred = useSyncExternalStore(subscribe, getInstallEvent, noInstallEvent);
  const [closed, setClosed] = useState(wasDismissed);

  if (!hydrated || closed) return null;
  if (isStandalone()) return null;

  const ios = isIos();
  if (!deferred && !ios) return null;

  function close() {
    setClosed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // nothing to persist to; the banner stays closed for this view
    }
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    deferredEvent = null;
    notify();
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md sm:inset-x-auto sm:right-6 sm:bottom-6">
      <div className="glass flex items-start gap-3 rounded-2xl p-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-grad-1/20 to-grad-2/20 text-accent">
          {deferred ? <Download size={17} /> : <Share size={17} />}
        </span>

        <div className="mr-auto">
          <p className="text-sm font-semibold text-ink">
            {deferred ? t.pwa.title : t.pwa.iosTitle}
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">
            {deferred ? t.pwa.body : t.pwa.iosBody}
          </p>

          {deferred && (
            <button
              type="button"
              onClick={install}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              <Download size={14} />
              {t.pwa.install}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={close}
          aria-label={t.pwa.dismiss}
          className="grid size-7 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:text-ink"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
