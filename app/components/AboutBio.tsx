"use client";

import { motion } from "framer-motion";

// PROFILE — a game CHARACTER DOSSIER (lore page), NOT a stat sheet. The stats
// live in Loadout; repeating them here would be redundant. This is the "who is
// this character" tab: a motto, the codename + class, a classified-style FILE
// block of dossier fields, and a short lore line. Every field is a real fact,
// only the FRAMING is game-styled.

const ease = [0.22, 1, 0.36, 1] as const;

// Dossier fields — real facts, reframed as a character file. No invented data.
const FILE = [
  { k: "origin", v: "CS student · class of ’27, Chennai" },
  { k: "role", v: "Full-stack — Postgres & server actions up to interaction detail" },
  { k: "specialty", v: "The hidden bosses: data shape, state flow, failure modes" },
  { k: "mission", v: "Building things I’d actually want to use" },
  { k: "code of honor", v: "Performance · accessibility · code the next person can read" },
];

export type Attribute = {
  label: string;
  value: number;
  tier: string;
};

// `attributes` is accepted for API compatibility with About.tsx but the dossier
// intentionally does NOT render stat bars (those belong to Loadout).
export default function AboutBio(_props: { attributes: Attribute[] }) {
  return (
    <div className="shell relative">
      {/* ghost word for depth */}
      <span
        aria-hidden
        className="display text-outline pointer-events-none absolute -top-8 left-0 -z-[1] hidden select-none text-[clamp(5rem,15vw,13rem)] leading-none opacity-[0.06] lg:block"
      >
        DOSSIER
      </span>

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-20">
        {/* ── LEFT: motto + identity ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="eyebrow text-[0.62rem]">— profile · dossier</span>

          {/* motto — the hero line, quote-marked */}
          <blockquote className="relative mt-6">
            <span
              aria-hidden
              className="display absolute -left-1 -top-8 select-none text-6xl leading-none text-neon/30"
            >
              &ldquo;
            </span>
            <p className="display relative text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] text-frost">
              I go deep, not wide. One thing, done right beats ten half-built.
            </p>
          </blockquote>

          {/* codename + class */}
          <div className="mt-8">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-neon/70">
              codename
            </p>
            <p className="font-display text-2xl font-bold text-frost">
              Teenie Rod Joshua
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-ripple">
              class: <span className="text-frost">Full-Stack Developer</span>
            </p>
          </div>
        </motion.div>

        {/* ── RIGHT: the FILE as a physical document component ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="relative"
        >
          {/* file TAB sticking out of the top-left of the folder */}
          <div className="relative z-10 ml-6 inline-flex translate-y-px items-center gap-2 rounded-t-md border border-b-0 border-neon/25 bg-[color:var(--surface)] px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-neon" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-frost">
              character file
            </span>
          </div>

          {/* the document body — a bordered panel with corner registration ticks */}
          <div className="relative rounded-lg rounded-tl-none border border-neon/25 bg-[color:var(--surface)] p-6 md:p-8">
            {/* corner registration ticks */}
            <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-neon/40" />
            <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-neon/40" />
            <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-neon/40" />
            <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-neon/40" />

            {/* file meta line: ID + clearance */}
            <div className="mb-5 flex items-center justify-between border-b border-neon/15 pb-4 font-mono text-[0.58rem] uppercase tracking-[0.2em]">
              <span className="text-ink/60">
                file <span className="text-frost">#TRJ-2027</span>
              </span>
              <span className="text-ink/60">
                clearance <span className="text-frost">public</span>
              </span>
            </div>

            {/* dossier field rows — form-aligned with dotted leaders */}
            <dl className="space-y-0">
              {FILE.map((row, i) => (
                <motion.div
                  key={row.k}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.08 }}
                  className="flex items-baseline gap-3 border-b border-dashed border-neon/12 py-3.5 last:border-b-0"
                >
                  <dt className="w-28 flex-none font-mono text-[0.56rem] uppercase tracking-[0.2em] text-neon/70">
                    {row.k}
                  </dt>
                  <dd className="flex-1 text-sm leading-snug text-ink">
                    {row.v}
                  </dd>
                </motion.div>
              ))}
            </dl>

            {/* VERIFIED / ACTIVE stamp — rotated, outlined, corner-placed */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-3 right-6 -rotate-[9deg] select-none rounded-md border-2 border-neon/45 px-3 py-1.5"
            >
              <span className="block font-mono text-[0.7rem] font-bold uppercase tracking-[0.24em] text-neon/80">
                ● Verified
              </span>
              <span className="mt-0.5 block text-center font-mono text-[0.46rem] uppercase tracking-[0.24em] text-ink/50">
                active · session 2026
              </span>
            </div>
          </div>

          {/* status line beneath the file */}
          <div className="mt-6 flex items-center gap-2 pl-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            open to work · replies &lt; 24h
          </div>
        </motion.div>
      </div>
    </div>
  );
}
