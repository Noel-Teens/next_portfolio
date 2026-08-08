// Ambient SNOWFALL — a fixed, site-wide field of small drifting snow particles
// behind all content. Replaces the removed bubble field. Purely decorative
// (aria-hidden) and stilled entirely under prefers-reduced-motion via the global
// rule in globals.css.
//
// Deterministic by design: every particle's position, size, duration and delay
// is derived from its index (a cheap hash), NOT Math.random — so the server and
// client render identical markup and there's no hydration mismatch. Animation is
// pure CSS (see `snow-fall` in globals.css); no JS runs per frame.

const COUNT = 70;

// Tiny deterministic pseudo-random in [0,1) from an integer seed.
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function Snowfall({ className = "" }: { className?: string }) {
  const flakes = Array.from({ length: COUNT }, (_, i) => {
    const left = rand(i) * 100; // vw
    const size = 1.5 + rand(i + 1) * 3.5; // px — small particles
    const duration = 9 + rand(i + 2) * 13; // s — varied fall speed
    const delay = -rand(i + 3) * duration; // negative → mid-flight at load
    const drift = (rand(i + 4) * 2 - 1) * 40; // px horizontal sway amplitude
    const opacity = 0.3 + rand(i + 5) * 0.5;
    return { left, size, duration, delay, drift, opacity, key: i };
  });

  return (
    <div
      aria-hidden
      className={`pointer-events-none overflow-hidden ${className}`}
    >
      {flakes.map((f) => (
        <span
          key={f.key}
          className="absolute top-[-6vh] rounded-full bg-frost"
          style={{
            left: `${f.left}vw`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            boxShadow: "0 0 4px rgba(228,244,248,0.6)",
            // custom prop consumed by the snow-fall keyframes for horizontal sway
            ["--drift" as string]: `${f.drift}px`,
            animation: `snow-fall ${f.duration}s linear ${f.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
