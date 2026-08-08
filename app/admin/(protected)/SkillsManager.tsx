"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { SkillCategory } from "@/lib/supabase/types";
import { getIcon, ICON_NAMES } from "@/app/components/icon-map";
import { createSkill, updateSkill, deleteSkill } from "../crud-actions";

const inputCls =
  "w-full px-4 py-2.5 rounded-xl bg-cyan-100/30 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary outline-none dark:text-white text-sm";
const labelCls =
  "text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest";

function SkillForm({
  skill,
  onDone,
}: {
  skill?: SkillCategory;
  onDone: () => void;
}) {
  const editing = !!skill;
  const action = editing ? updateSkill : createSkill;

  return (
    <form
      action={async (fd) => {
        await action(fd);
        onDone();
      }}
      className="glass p-6 rounded-2xl space-y-4"
    >
      {editing && <input type="hidden" name="id" value={skill!.id} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>Category title</label>
          <input
            name="title"
            required
            defaultValue={skill?.title}
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Icon</label>
          <select
            name="icon_name"
            defaultValue={skill?.icon_name ?? "Code2"}
            className={inputCls}
          >
            {ICON_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Sort order</label>
          <input
            name="sort_order"
            type="number"
            defaultValue={skill?.sort_order ?? 0}
            className={inputCls}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={labelCls}>Skills (comma separated)</label>
        <input
          name="skills"
          defaultValue={skill?.skills.join(", ")}
          placeholder="React, HTML, Tailwind CSS"
          className={inputCls}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30"
        >
          {editing ? "Save changes" : "Add category"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onDone}
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-sm text-slate-600 dark:text-slate-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default function SkillsManager({
  skills,
}: {
  skills: SkillCategory[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-6">
      {adding ? (
        <SkillForm onDone={() => setAdding(false)} />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30"
        >
          <Plus size={16} /> New category
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((s) => {
          const Icon = getIcon(s.icon_name);
          return editingId === s.id ? (
            <div key={s.id} className="md:col-span-2">
              <SkillForm skill={s} onDone={() => setEditingId(null)} />
            </div>
          ) : (
            <div
              key={s.id}
              className="glass p-4 rounded-2xl flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {s.skills.join(" · ")}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingId(s.id)}
                  aria-label="Edit"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary"
                >
                  <Pencil size={16} />
                </button>
                <form
                  action={deleteSkill}
                  onSubmit={(e) => {
                    if (!confirm(`Delete "${s.title}"?`)) e.preventDefault();
                  }}
                >
                  <input type="hidden" name="id" value={s.id} />
                  <button
                    type="submit"
                    aria-label="Delete"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>
            </div>
          );
        })}
        {skills.length === 0 && (
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No skill categories yet.
          </p>
        )}
      </div>
    </div>
  );
}
