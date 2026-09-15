"use client";

import { useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Semantic element to render — cards are often <article> or <li>. */
  as?: "div" | "article" | "li";
};

/**
 * Card shell that tracks the pointer to drive the spotlight gradient and
 * reveals a gradient hairline while hovered. Touch input skips both, since
 * there is no pointer to follow.
 */
export function SpotlightCard({ children, className = "", as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  function handleMove(event: React.PointerEvent<HTMLElement>) {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse") return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  function handleEnter(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse") setActive(true);
  }

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={() => setActive(false)}
      data-active={active}
      className={`spotlight assemble transition-transform duration-300 ease-out ${
        active ? "-translate-y-0.5" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
