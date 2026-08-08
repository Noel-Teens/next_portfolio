"use client";

import { motion } from "framer-motion";
import { getIcon } from "./icon-map";
import type { SkillCategory } from "@/lib/supabase/types";

const ease = [0.22, 1, 0.36, 1] as const;

// SKILLS as PLAYER / CHARACTER STAT CARDS. Each category is an "operative card"
// in the language of a character-select screen (the anime/game-UI reference the
// rest of the site leans on): a class sigil, a level badge, a segmented
// proficiency bar, a derived rank tier, and the equipped "loadout" of skills.
//
// Honesty rule (design system): every number is REAL, never decorative. The one
// true metric is a category's skill count relative to the busiest category —
// surfaced here as LV (the count) and PROFICIENCY (count ÷ max). The rank letter
// is just a banded restatement of that same percentage, shown right beside it,
// not an invented attribute.

const TIER_STOPS: { min: number; tier: string }[] = [
  { min: 100, tier: "S" },
  { min: 85, tier: "A" },
  { min: 70, tier: "B" },
  { min: 0, tier: "C" },
];

function rankTier(pct: number): string {
  return TIER_STOPS.find((t) => pct >= t.min)!.tier;
}

function StatCard({
  category,
  maxCount,
  index,
}: {
  category: SkillCategory;
  maxCount: number;
  index: number;
}) {
  const Icon = getIcon(category.icon_name);
  const count = category.skills.length;
  const proficiency = Math.round((count / maxCount) * 100);
  const tier = rankTier(proficiency);

  // Segmented proficiency bar: 10 notches, filled proportionally.
  const segments = 10;
  const filled = Math.max(1, Math.round((proficiency / 100) * segments));

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease, delay: index * 0.08 }}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(127,233,255,0.6),0_0_30px_rgba(127,233,255,0.4),0_0_80px_rgba(94,176,200,0.3),0_30px_60px_rgba(4,20,28,0.6)]"
    >
      {/* class card header strip — HUD framing, like a character-select callout */}
      <div className="mb-5 flex items-center justify-between">
        <span className="eyebrow text-[0.56rem]">class</span>
        <span className="font-mono text-[0.56rem] uppercase tracking-widest text-neon/80">
          #{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* sigil + class name + level */}
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-neon/15 text-neon ring-1 ring-neon/35 transition-all duration-500 group-hover:bg-neon group-hover:text-abyss group-hover:ring-neon">
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-semibold leading-tight text-frost">
            {category.title}
          </h3>
          <span className="font-mono text-[0.62rem] uppercase tracking-widest text-ink/80">
            {count} {count === 1 ? "skill" : "skills"}
          </span>
        </div>
        {/* LV badge — the real capability count */}
        <div className="flex-none text-right">
          <span className="eyebrow block text-[0.5rem]">lv</span>
          <span className="lit font-display text-2xl font-bold leading-none tabular-nums">
            {count}
          </span>
        </div>
      </div>

      {/* proficiency bar + rank tier */}
      <div className="mt-6">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="eyebrow text-[0.54rem]">proficiency</span>
          <span className="font-mono text-xs tabular-nums text-ink">
            <span className="lit mr-1.5 font-display text-sm font-bold">{tier}</span>
            {proficiency}%
          </span>
        </div>
        <div
          className="flex gap-1"
          role="meter"
          aria-valuenow={proficiency}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${category.title} proficiency`}
        >
          {Array.from({ length: segments }).map((_, i) => (
            <span
              key={i}
              className={`h-2 flex-1 rounded-sm transition-colors duration-500 ${
                i < filled
                  ? "bg-neon shadow-[0_0_10px_rgba(127,233,255,0.6)]"
                  : "bg-frost/15"
              }`}
            />
          ))}
        </div>
      </div>

      {/* loadout — the equipped skills, always visible */}
      <div className="mt-6 border-t border-neon/15 pt-5">
        <span className="eyebrow mb-3 block text-[0.54rem]">
          loadout
        </span>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <span key={skill} className="chip rounded-md px-2.5 py-1">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function SkillsGrid({ skills }: { skills: SkillCategory[] }) {
  const maxCount = Math.max(1, ...skills.map((s) => s.skills.length));

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {skills.map((category, i) => (
        <StatCard
          key={category.id}
          category={category}
          maxCount={maxCount}
          index={i}
        />
      ))}
    </div>
  );
}
