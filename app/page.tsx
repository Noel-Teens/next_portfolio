import PortfolioHome from "./components/PortfolioHome";
import StructuredData from "./components/StructuredData";
import { getProjects, getProfile } from "@/lib/data";

// The home page. Fetches projects + the player-HUD profile here; projects also
// feed the JSON-LD structured data. PortfolioHome's section Server Components
// fetch their own lists (reads are cheap and RLS-guarded). StructuredData
// renders a <script> into the initial HTML for crawlers.
export default async function Home() {
  const [projects, profile] = await Promise.all([getProjects(), getProfile()]);

  return (
    <>
      <StructuredData projects={projects} />
      <PortfolioHome profile={profile} />
    </>
  );
}
