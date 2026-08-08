"use client";

import { motion } from "framer-motion";

// Shared oversized masthead for each section (magazine reference): a large
// outlined "ghost" word sits behind a smaller filled title, with a HUD-style
// depth marker as the eyebrow. The ghost word encodes the section's theme; the
// depth marker encodes where you are in the dive — both carry real meaning, not
// decoration.

const ease = [0.22, 1, 0.36, 1] as const;

export default function SectionHeader({
  ghost,
  eyebrow,
  title,
  intro,
}: {
  ghost: string; // big outlined word behind
  eyebrow: string; // HUD depth marker, e.g. "600m · the instruments"
  title: string; // filled foreground title
  intro?: string; // optional supporting line on the right
}) {
  return (
    <div className="relative mb-16">
      {/* ghost word */}
      <span
        aria-hidden
        className="display text-outline pointer-events-none absolute -top-8 left-0 select-none text-[clamp(3.5rem,13vw,11rem)] leading-none opacity-30 md:opacity-60"
      >
        {ghost}
      </span>

      <div className="relative flex flex-col justify-between gap-6 pt-[clamp(2rem,7vw,5rem)] md:flex-row md:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="eyebrow">— {eyebrow}</span>
          <h2 className="display mt-3 text-4xl text-frost md:text-6xl">
            {title}
          </h2>
        </motion.div>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="max-w-md text-lg text-ink"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </div>
  );
}
