import { starLayers, VIEWBOX } from "./starfield-data";

/**
 * Drifting constellation field behind the page. Geometry is precomputed
 * and the parallax layers move with CSS transforms, so there is no
 * per-frame work on the main thread.
 */
export function Starfield() {
  return (
    <div className="starfield" aria-hidden>
      {starLayers.map((layer) => (
        <svg
          key={layer.name}
          className={`starfield-layer starfield-${layer.name}`}
          viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
          preserveAspectRatio="xMidYMid slice"
        >
          <g className="starfield-lines">
            {layer.lines.map((line, index) => (
              <line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                strokeOpacity={line.o}
              />
            ))}
          </g>
          {layer.stars.map((star, index) => (
            <circle
              key={index}
              cx={star.x}
              cy={star.y}
              r={star.r}
              className={star.twinkle ? "star-twinkle" : undefined}
              style={star.twinkle ? { animationDelay: `${star.delay}s` } : undefined}
            />
          ))}
        </svg>
      ))}
    </div>
  );
}
