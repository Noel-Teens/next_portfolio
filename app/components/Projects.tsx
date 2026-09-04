import { getProjects } from "@/lib/data";
import ProjectsGrid from "./ProjectsGrid";
import SectionHeader from "./SectionHeader";
import Marquee from "./Marquee";

// Server Component: fetches projects and hands them to the character-select
// showcase. Marquee ribbons band the section top.
export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="band-ink pb-24 pt-16">
      <Marquee text="mission complete" />

      <div className="shell pb-8 pt-8">
        <SectionHeader
          ghost="MISSIONS"
          eyebrow="mission log · cleared"
          title="Missions cleared"
          intro="Every run I've completed — select one from the roster to review it."
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
