import { getSkills } from "@/lib/data";
import AboutBio, { type Attribute } from "./AboutBio";

// PROFILE (black band) — a game character-bio screen. Server Component: pulls
// the real loadout data and derives ATTRIBUTE bars from it (the same honest
// metric the Skills cards use — a category's skill count vs. the busiest
// category), then hands them to the animated client bio. No invented numbers.

const TIER_STOPS: { min: number; tier: string }[] = [
  { min: 100, tier: "S" },
  { min: 85, tier: "A" },
  { min: 70, tier: "B" },
  { min: 0, tier: "C" },
];

function rankTier(pct: number): string {
  return TIER_STOPS.find((t) => pct >= t.min)!.tier;
}

export default async function About() {
  const skills = await getSkills();
  const maxCount = Math.max(1, ...skills.map((s) => s.skills.length));

  // Top attributes = the loadout categories, ranked by real skill count.
  const attributes: Attribute[] = skills
    .map((s) => {
      const value = Math.round((s.skills.length / maxCount) * 100);
      return { label: s.title, value, tier: rankTier(value) };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <section
      id="about"
      className="band-ink relative z-10 overflow-hidden pb-28 pt-32 md:pt-40"
    >
      <AboutBio attributes={attributes} />
    </section>
  );
}
