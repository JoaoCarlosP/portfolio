import { techIcons } from "./tech-icons";

/**
 * Continuous marquee of stack marks. The list is rendered twice so the
 * track can loop by translating exactly -50%; the copy is hidden from
 * assistive tech.
 */
export function TechMarquee({ label }: { label: string }) {
  return (
    <section aria-label={label} className="relative z-10 border-t border-line py-10">
      <div className="marquee">
        <ul className="marquee-track">
          {[0, 1].map((copy) =>
            techIcons.map((icon) => (
              <li
                key={`${copy}-${icon.title}`}
                className="marquee-item shrink-0"
                style={icon.brand ? ({ "--brand": icon.brand } as React.CSSProperties) : undefined}
                aria-hidden={copy === 1 ? true : undefined}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="currentColor"
                  role={copy === 0 ? "img" : undefined}
                  aria-label={copy === 0 ? icon.title : undefined}
                >
                  <path d={icon.path} />
                </svg>
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
