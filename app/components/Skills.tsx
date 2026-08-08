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
          ghost="STACK"
          eyebrow="600m · the instruments"
          title="What I dive with"
          intro="The kit I reach for by default — chosen for reliability under pressure, not novelty."
        />

        {skills.length === 0 ? (
          <p className="text-glaze">
            No skills yet. Add some from the admin panel.
          </p>
        ) : (
          <SkillsGrid skills={skills} />
        )}
      </div>
    </section>
  );
}
