"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** Must outlast the CSS dismiss animation (1.5s delay + 0.65s fade). */
const LIFETIME_MS = 2300;

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

    const timer = window.setTimeout(() => {
      root.style.overflow = previous;
      setDone(true);
    }, LIFETIME_MS);

    return () => {
      window.clearTimeout(timer);
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
