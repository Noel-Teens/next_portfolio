// Shared domain types for the portfolio's Supabase-backed data.
// Column shapes here must match the SQL in `supabase/schema.sql`.

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  tags: string[];
  // One punchy outcome/spec shown as the featured line in the project dossier.
  highlight: string | null;
  // When true, the project leads the "character select" display.
  featured: boolean;
  sort_order: number;
  created_at: string;
};

// A skill category with its list of skills. `icon_name` is a Lucide icon key
// resolved at render time (see components/icon-map.ts).
export type SkillCategory = {
  id: string;
  title: string;
  icon_name: string;
  skills: string[];
  sort_order: number;
  created_at: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  // Optional company/org the sender is writing on behalf of.
  company: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

// Draft shapes used by admin create/update forms (server-generated columns omitted).
export type ProjectInput = Omit<Project, "id" | "created_at">;
export type SkillCategoryInput = Omit<SkillCategory, "id" | "created_at">;
