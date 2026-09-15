/**
 * How long the intro overlay covers the page (1.5s hold + 0.65s fade).
 * Shared so reveals above the fold can wait for it instead of animating
 * where nobody can see them.
 */
export const INTRO_MS = 2150;

/** Reveals above the fold start just before the overlay finishes lifting. */
export const REVEAL_HOLD_MS = 1700;

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
