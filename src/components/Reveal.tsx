"use client";

import { useEffect, useRef, useState } from "react";
import { REVEAL_HOLD_MS, prefersReducedMotion } from "@/lib/intro";

/**
 * Reveals content the first time it scrolls into view.
 *
 * Uses an observer rather than `animation-timeline: view()` because card
 * contents assemble on a timed stagger, which needs a discrete "entered"
 * moment — a scroll-linked timeline collapses the sequence into a single
 * frame when the user scrolls quickly. The observer is one-shot.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight && rect.bottom > 0;

    // Above the fold: hold until the intro overlay has lifted, otherwise
    // these assemble behind it and the user only ever sees the result.
    if (onScreen) {
      const hold = prefersReducedMotion() ? 0 : REVEAL_HOLD_MS;
      const timer = window.setTimeout(() => setVisible(true), hold);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-visible={visible}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
