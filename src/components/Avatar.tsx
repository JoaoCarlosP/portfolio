"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { site } from "@/content/site";

const MAX_TILT = 14;

/**
 * Avatar that tilts in 3D toward the pointer. The transform is written
 * straight to the node as CSS variables so moving the mouse never
 * re-renders React. Touch input gets the static portrait.
 */
export function Avatar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse") return;

    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.setProperty("--rx", `${(-py * MAX_TILT).toFixed(2)}deg`);
    node.style.setProperty("--ry", `${(px * MAX_TILT).toFixed(2)}deg`);
  }

  function reset() {
    const node = ref.current;
    setActive(false);
    if (!node) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setActive(true);
      }}
      onPointerLeave={reset}
      data-active={active}
      className="avatar-tilt relative shrink-0"
    >
      {/* conic gradient ring, spinning faster while hovered */}
      <div
        aria-hidden
        className={`absolute -inset-1 rounded-full sm:-inset-1.5 bg-[conic-gradient(from_0deg,var(--grad-1),var(--grad-2),var(--grad-3),var(--grad-1))] blur-[5px] sm:blur-[7px] transition-opacity duration-500 motion-reduce:animate-none ${
          active
            ? "animate-[spin_3s_linear_infinite] opacity-100"
            : "animate-[spin_11s_linear_infinite] opacity-70"
        }`}
      />
      <Image
        src={site.avatar}
        alt={site.name}
        width={288}
        height={288}
        priority
        sizes="(min-width: 1024px) 240px, (min-width: 640px) 208px, 96px"
        className="relative size-24 rounded-full border border-[var(--glass-border)] object-cover sm:size-52 lg:size-60"
      />
    </div>
  );
}
