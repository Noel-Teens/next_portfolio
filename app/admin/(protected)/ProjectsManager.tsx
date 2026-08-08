"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { Project } from "@/lib/supabase/types";
import {
  createProject,
  updateProject,
  deleteProject,
} from "../crud-actions";

const inputCls =
  "w-full px-4 py-2.5 rounded-xl bg-cyan-100/30 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary outline-none dark:text-white text-sm";
const labelCls =
  "text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest";

function ProjectForm({
  project,
  onDone,
}: {
  project?: Project;
  onDone: () => void;
}) {
  const editing = !!project;
  const action = editing ? updateProject : createProject;

  return (
    <form
      action={async (fd) => {
        await action(fd);
        onDone();
      }}
      className="glass p-6 rounded-2xl space-y-4"
    >
      {editing && <input type="hidden" name="id" value={project!.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>Title</label>
          <input
            name="title"
            required
            defaultValue={project?.title}
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Sort order</label>
          <input
            name="sort_order"
            type="number"
            defaultValue={project?.sort_order ?? 0}
            className={inputCls}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={labelCls}>Description</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={project?.description}
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>GitHub URL</label>
          <input
            name="github_url"
            defaultValue={project?.github_url ?? ""}
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Live URL</label>
          <input
            name="live_url"
            defaultValue={project?.live_url ?? ""}
            className={inputCls}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={labelCls}>Tags (comma separated)</label>
        <input
          name="tags"
          defaultValue={project?.tags.join(", ")}
          placeholder="React, Node.js, MongoDB"
          className={inputCls}
        />
      </div>

      <div className="space-y-1.5">
        <label className={labelCls}>Highlight (one punchy outcome)</label>
        <input
          name="highlight"
          defaultValue={project?.highlight ?? ""}
          placeholder="Real-time multiplayer for up to 4 players"
          className={inputCls}
        />
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Shown as the featured line in the project dossier.
        </p>
      </div>

      <label className="flex items-center gap-3 pt-1">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={project?.featured ?? false}
          className="h-4 w-4 accent-primary"
        />
        <span className={labelCls}>Featured — lead the projects display</span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>Image URL (or leave, upload below)</label>
          <input
            name="image_url"
            defaultValue={project?.image_url ?? ""}
            placeholder="/images/... or https://..."
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Upload image (overrides URL)</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            className="w-full text-sm text-slate-600 dark:text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary file:text-white file:font-bold"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30"
        >
          {editing ? "Save changes" : "Add project"}
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

export default function ProjectsManager({
  projects,
}: {
  projects: Project[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-6">
      {adding ? (
        <ProjectForm onDone={() => setAdding(false)} />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30"
        >
          <Plus size={16} /> New project
        </button>
      )}

      <div className="grid grid-cols-1 gap-4">
        {projects.map((p) =>
          editingId === p.id ? (
            <ProjectForm
              key={p.id}
              project={p}
              onDone={() => setEditingId(null)}
            />
          ) : (
            <div
              key={p.id}
              className="glass p-4 rounded-2xl flex items-center gap-4"
            >
              <div className="relative w-20 h-14 shrink-0 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800">
                {p.image_url && (
                  <Image
                    src={p.image_url}
                    alt={p.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-white truncate">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {p.tags.join(" · ")}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingId(p.id)}
                  aria-label="Edit"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary"
                >
                  <Pencil size={16} />
                </button>
                <form
                  action={deleteProject}
                  onSubmit={(e) => {
                    if (!confirm(`Delete "${p.title}"?`)) e.preventDefault();
                  }}
                >
                  <input type="hidden" name="id" value={p.id} />
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
          )
        )}
        {projects.length === 0 && (
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No projects yet.
          </p>
        )}
      </div>
    </div>
  );
}
