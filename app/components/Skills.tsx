import { getSkills } from "@/lib/data";
import SkillsGrid from "./SkillsGrid";
import SectionHeader from "./SectionHeader";

// Server Component: fetches skill categories from Supabase and passes them to
// the animated client grid.
export default async function Skills() {
  const skills = await getSkills();

  return (
    <section id="skills" className="relative overflow-hidden py-28">
      <div className="shell">
        <SectionHeader
          ghost="LOADOUT"
          eyebrow="skill tree · equipped"
          title="My loadout"
          intro="Pick a class to see what's equipped — the tools I know best and trust in production."
        />

        {skills.length === 0 ? (
          <p className="text-ink">
            No skills yet. Add some from the admin panel.
          </p>
        ) : (
          <SkillsGrid skills={skills} />
        )}
      </div>
    </section>
  );
}
