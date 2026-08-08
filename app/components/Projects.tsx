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
      <Marquee text="recovered from the deep" />

      {/* heading stays in the padded shell; the browser below is full-bleed */}
      <div className="shell pt-16 pb-10">
        <SectionHeader
          ghost="WORK"
          eyebrow="900m · the finds"
          title="Things I've brought up"
          intro="Every find I've pulled up — select one from the log to inspect it."
        />
      </div>

      {projects.length === 0 ? (
        <p className="shell text-glaze">
          No projects yet. Add some from the admin panel.
        </p>
      ) : (
        <ProjectsGrid projects={projects} />
      )}
    </section>
  );
}
