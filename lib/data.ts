import { createClient } from "@/lib/supabase/server";
import type { Project, SkillCategory, Profile } from "@/lib/supabase/types";

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

// The single-row player HUD profile. Returns safe defaults if the row or table
// is missing (e.g. the migration hasn't been run yet) so the public site never
// crashes and the HUD simply renders its fallback state.
const DEFAULT_PROFILE: Profile = {
  id: 1,
  open_to_work: true,
  status_label: "Open to work",
  region: "",
  now_playing: "",
  reply_time: "",
  updated_at: new Date(0).toISOString(),
};

export async function getProfile(): Promise<Profile> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("getProfile:", error.message);
    return DEFAULT_PROFILE;
  }
  return (data as Profile) ?? DEFAULT_PROFILE;
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
