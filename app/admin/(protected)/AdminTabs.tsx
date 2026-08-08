"use client";

import { useState } from "react";
import type { Project, SkillCategory, Message } from "@/lib/supabase/types";
import ProjectsManager from "./ProjectsManager";
import SkillsManager from "./SkillsManager";
import MessagesInbox from "./MessagesInbox";

type Tab = "projects" | "skills" | "messages";

export default function AdminTabs({
  projects,
  skills,
  messages,
}: {
  projects: Project[];
  skills: SkillCategory[];
  messages: Message[];
}) {
  const [tab, setTab] = useState<Tab>("projects");
  const unread = messages.filter((m) => !m.is_read).length;

  const tabs: { key: Tab; label: string; badge?: number }[] = [
    { key: "projects", label: `Projects (${projects.length})` },
    { key: "skills", label: `Skills (${skills.length})` },
    { key: "messages", label: "Messages", badge: unread },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              tab === t.key
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary"
            }`}
          >
            {t.label}
            {t.badge ? (
              <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-xs">
                {t.badge}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {tab === "projects" && <ProjectsManager projects={projects} />}
      {tab === "skills" && <SkillsManager skills={skills} />}
      {tab === "messages" && <MessagesInbox messages={messages} />}
    </div>
  );
}
