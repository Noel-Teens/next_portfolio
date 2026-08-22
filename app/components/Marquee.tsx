// Kinetic ribbon divider (new reference's "UNLOCKED NEW CHARACTER" band). Pure
// CSS scroll; the track holds two identical halves and animates by -50%, so the
// wrap point is seamless. Decorative, so it's hidden from assistive tech.
export default function Marquee({ text }: { text: string }) {
  // One half of the loop; the second copy makes the -50% translate seamless.
  const half = Array.from({ length: 8 });
  const items = [...half, ...half];
  return (
    <div aria-hidden className="marquee">
      <div className="marquee__track">
        {items.map((_, i) => (
          <span
            key={i}
            className="font-mono text-xs uppercase tracking-[0.35em] text-ink/70"
          >
            {text}
            <span className="mx-6 text-[#111111]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
