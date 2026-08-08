import { createClient } from "@/lib/supabase/server";
import type { Project, SkillCategory } from "@/lib/supabase/types";

// Public reads used by the homepage Server Components. RLS allows anonymous
// SELECT on these tables. On error we return an empty list so the section can
// render an empty state rather than crashing the whole page.

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getProjects:", error.message);
    return [];
  }
  return (data as Project[]) ?? [];
}

export async function getSkills(): Promise<SkillCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getSkills:", error.message);
    return [];
  }
  return (data as SkillCategory[]) ?? [];
}
