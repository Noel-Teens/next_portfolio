"use client";

// The hero's central focal object — a pure CSS/SVG sonar porthole. No image
// dependency: concentric depth rings, a rotating sweep arm, an expanding ping,
// and a few "contacts" (blips) that read as detected objects in the water.
// Deliberately behind the headline so type stays legible; it's atmosphere with
// intent, not a spinner. Sizes with the viewport and is decorative (aria-hidden
// on the wrapper in Hero).

export default function SonarPorthole() {
  return (
    <div className="relative h-[min(78vw,620px)] w-[min(78vw,620px)]">
      {/* outer glow */}
      <div className="absolute inset-0 rounded-full bg-ripple/10 blur-3xl" />

      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <radialGradient id="sonarFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0c3846" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#0a2c38" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#071f28" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5eb0c8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#5eb0c8" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="200" r="196" fill="url(#sonarFill)" />

        {/* concentric depth rings */}
        {[196, 150, 104, 58].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            stroke="#9fd3e3"
            strokeOpacity="0.16"
            strokeWidth="1"
          />
        ))}

        {/* crosshair graticule */}
        <line x1="200" y1="4" x2="200" y2="396" stroke="#9fd3e3" strokeOpacity="0.1" />
        <line x1="4" y1="200" x2="396" y2="200" stroke="#9fd3e3" strokeOpacity="0.1" />

        {/* rotating sweep wedge */}
        <g style={{ transformOrigin: "200px 200px", animation: "sonar-sweep 6s linear infinite" }}>
          <path d="M200 200 L200 8 A192 192 0 0 1 372 150 Z" fill="url(#sweep)" />
          <line x1="200" y1="200" x2="200" y2="8" stroke="#9fd3e3" strokeOpacity="0.6" strokeWidth="1.5" />
        </g>

        {/* detected contacts (blips) */}
        {[
          { x: 268, y: 140, d: "0s" },
          { x: 132, y: 250, d: "1.5s" },
          { x: 250, y: 286, d: "2.6s" },
        ].map((b) => (
          <circle
            key={`${b.x}-${b.y}`}
            cx={b.x}
            cy={b.y}
            r="3.5"
            fill="#9fd3e3"
            style={{ transformOrigin: `${b.x}px ${b.y}px`, animation: `sonar-ping 3s ease-out ${b.d} infinite` }}
          />
        ))}

        {/* core */}
        <circle cx="200" cy="200" r="5" fill="#e4f4f8" />
      </svg>

      {/* expanding ping ring (CSS, over the SVG) */}
      <span
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ripple/40"
        style={{ animation: "sonar-ping 4s ease-out infinite" }}
      />
    </div>
  );
}
