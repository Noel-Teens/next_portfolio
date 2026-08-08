import { createClient } from "@/lib/supabase/server";
import type { Project, SkillCategory, Message } from "@/lib/supabase/types";
import AdminTabs from "./AdminTabs";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

// Fetches all admin data server-side. RLS lets the authenticated admin read
// everything (including messages, which are otherwise private).
export default async function AdminDashboard() {
  const supabase = await createClient();

  const [projectsRes, skillsRes, messagesRes] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase.from("skills").select("*").order("sort_order", { ascending: true }),
    supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  const projects = (projectsRes.data as Project[]) ?? [];
  const skills = (skillsRes.data as SkillCategory[]) ?? [];
  const messages = (messagesRes.data as Message[]) ?? [];

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">
        Dashboard
      </h1>
      <AdminTabs projects={projects} skills={skills} messages={messages} />
    </div>
  );
}
