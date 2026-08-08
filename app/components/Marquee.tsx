// Kinetic ribbon divider (new reference's "UNLOCKED NEW CHARACTER" band). Pure
// CSS scroll; the text is duplicated so the loop is seamless. Decorative, so
// it's hidden from assistive tech.
export default function Marquee({ text }: { text: string }) {
  const items = Array.from({ length: 8 });
  return (
    <div aria-hidden className="marquee">
      <div className="marquee__track">
        {items.map((_, i) => (
          <span
            key={i}
            className="font-mono text-xs uppercase tracking-[0.35em] text-glaze/50"
          >
            {text}
            <span className="mx-6 text-[#7fe9ff]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
