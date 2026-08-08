import { getProjects } from "@/lib/data";
import ProjectsGrid from "./ProjectsGrid";
import SectionHeader from "./SectionHeader";
import Marquee from "./Marquee";

// Server Component: fetches projects and hands them to the full-bleed showcase.
// Marquee ribbons band the section top and bottom.
export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-24">
      <Marquee text="mission complete" />

      {/* heading stays in the padded shell; the browser below is full-bleed */}
      <div className="shell pt-16 pb-10">
        <SectionHeader
          ghost="MISSIONS"
          eyebrow="mission log · cleared"
          title="Missions cleared"
          intro="Every run I've completed — select one from the log to review it."
        />
      </div>

      {projects.length === 0 ? (
        <p className="shell text-ink">
          No projects yet. Add some from the admin panel.
        </p>
      ) : (
        <ProjectsGrid projects={projects} />
      )}
    </section>
  );
}
