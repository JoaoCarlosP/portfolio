"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { INTRO_MS } from "@/lib/intro";

/** Removal trails the dismiss animation slightly; by then the overlay is
 *  already `visibility: hidden`, so nothing flickers. */
const REMOVE_MS = INTRO_MS + 120;

/**
 * Intro preloader.
 *
 * The overlay is server-rendered and dismissed by CSS, so it never traps
 * the page when JavaScript fails. This component only cleans up: it takes
 * the scroll lock, then drops the node and the lock together. Because the
 * lock is taken by the same code that releases it, a page without JS is
 * never left locked.
 */
export function Splash() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    // Release the scroll exactly when the overlay stops intercepting.
    // Holding it any longer leaves a window where a nav click is
    // accepted but the resulting scroll is swallowed.
    const unlock = window.setTimeout(() => {
      root.style.overflow = previous;
    }, INTRO_MS);

    const remove = window.setTimeout(() => setDone(true), REMOVE_MS);

    return () => {
      window.clearTimeout(unlock);
      window.clearTimeout(remove);
      root.style.overflow = previous;
    };
  }, []);

  if (done) return null;

  return (
    <div className="splash" aria-hidden="true">
      <p className="splash-mark">
        <span className="splash-bracket">&lt;</span>
        <span className="splash-initials">{site.initials}</span>
        <span className="splash-bracket">/&gt;</span>
      </p>
      <span className="splash-bar">
        <i />
      </span>
    </div>
  );
}
