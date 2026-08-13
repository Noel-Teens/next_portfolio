import PortfolioHome from "./components/PortfolioHome";
import StructuredData from "./components/StructuredData";
import { getProjects } from "@/lib/data";

// The home page. Fetches projects once here so the JSON-LD structured data can
// reference the real work; PortfolioHome fetches its own data in its section
// Server Components (reads are cheap and RLS-guarded). StructuredData renders a
// <script> into the initial HTML for crawlers.
export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <StructuredData projects={projects} />
      <PortfolioHome />
    </>
  );
}
