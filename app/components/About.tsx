"use client";

import { motion } from "framer-motion";
import { Compass, Layers, Radar, Anchor } from "lucide-react";

// New section (general content). Anchored on Arctic Ocean Blue so the page
// visibly changes hue one layer down from the hero — reinforcing the descent.
// The right column is a genuine sequence (how a project actually moves from
// brief to launch), so numbered stages carry real order, not decoration.

const ease = [0.22, 1, 0.36, 1] as const;

const stages = [
  {
    icon: Compass,
    title: "Chart the brief",
    body: "Understand the problem before the pixels. Constraints, users, and the one outcome that matters.",
  },
  {
    icon: Layers,
    title: "Model the depths",
    body: "Data shapes first. A clean schema and clear boundaries make every layer above it simpler.",
  },
  {
    icon: Radar,
    title: "Build & pressure-test",
    body: "Ship in slices, watch the edge cases, and let real usage — not assumptions — steer the next move.",
  },
  {
    icon: Anchor,
    title: "Launch & maintain",
    body: "Fast, accessible, and observable in production. Done means it holds up after I walk away.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 overflow-hidden pb-28 pt-48 md:pt-56"
      style={{
        background:
          "linear-gradient(180deg, rgba(42,115,135,0) 0%, rgba(42,115,135,0.55) 30%, rgba(42,115,135,0.55) 70%, rgba(42,115,135,0) 100%)",
      }}
    >
      <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
        {/* Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="relative">
            <span
              aria-hidden
              className="display text-outline pointer-events-none absolute -top-10 -left-1 select-none text-[clamp(3rem,11vw,8rem)] leading-none opacity-50"
            >
              WHO
            </span>
            <span className="eyebrow relative">— 300m · the twilight zone</span>
            <h2 className="display relative mt-3 text-4xl leading-tight text-frost md:text-5xl">
              I&apos;d rather go deep on one thing than skim across ten.
            </h2>
          </div>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-glaze">
            <p>
              Most of the interesting problems live below the surface — in how
              data is shaped, how state moves, and how a system behaves when
              something goes wrong. That&apos;s the part I enjoy.
            </p>
            <p>
              I work across the whole stack, from Postgres and server actions up
              to interaction detail and motion. I care about performance,
              accessibility, and code that the next person can actually read.
            </p>
            <p>
              Right now I&apos;m finishing my CS degree and building things I&apos;d
              want to use — which is the fastest way I know to keep learning.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {["TypeScript", "React", "Next.js", "Supabase", "Postgres", "Tailwind"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-glaze/25 bg-frost/5 px-4 py-1.5 font-mono text-xs text-glaze"
                >
                  {t}
                </span>
              )
            )}
          </div>
        </motion.div>

        {/* Process — a real sequence, so numbering is meaningful */}
        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="relative space-y-4 lg:pt-2"
        >
          {/* connecting descent line */}
          <span className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-ripple/60 via-ripple/25 to-transparent" />

          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.title}
                variants={{
                  hidden: { opacity: 0, x: 24 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
                }}
                className="glass group relative flex gap-5 rounded-2xl p-5 transition-transform hover:translate-x-1"
              >
                <div className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-abyss text-ripple ring-1 ring-ripple/40 transition-colors group-hover:bg-ripple group-hover:text-abyss">
                  <Icon size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-ripple">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-frost">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-glaze">
                    {s.body}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
