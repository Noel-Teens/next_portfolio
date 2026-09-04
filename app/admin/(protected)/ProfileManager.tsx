"use client";

import { useState } from "react";
import type { Profile } from "@/lib/supabase/types";
import { updateProfile } from "../crud-actions";

const inputCls =
  "w-full px-4 py-2.5 rounded-xl bg-cyan-100/30 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary outline-none dark:text-white text-sm";
const labelCls =
  "text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest";

// Edits the single-row "player HUD" profile that feeds the public hero stat
// strip, the "now playing" bar, and the contact HUD. One form, one save.
export default function ProfileManager({ profile }: { profile: Profile }) {
  const [saved, setSaved] = useState(false);

  return (
    <form
      action={async (fd) => {
        await updateProfile(fd);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }}
      className="glass p-6 rounded-2xl space-y-5 max-w-2xl"
    >
      <p className="text-sm text-slate-500 dark:text-slate-400">
        These show up as the &ldquo;player HUD&rdquo; on the public site — the
        hero status strip, the &ldquo;now playing&rdquo; line, and the contact
        panel. Keep them short.
      </p>

      {/* open to work toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="open_to_work"
          defaultChecked={profile.open_to_work}
          className="h-5 w-5 rounded accent-primary"
        />
        <span className="text-sm font-bold text-slate-900 dark:text-white">
          Open to work
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          (shows the green pulse + status)
        </span>
      </label>

      <div className="space-y-1.5">
        <label className={labelCls}>Status label</label>
        <input
          name="status_label"
          defaultValue={profile.status_label}
          placeholder="Open to internships & freelance"
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>Region / availability</label>
          <input
            name="region"
            defaultValue={profile.region}
            placeholder="Chennai · Remote"
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Reply time</label>
          <input
            name="reply_time"
            defaultValue={profile.reply_time}
            placeholder="< 24h"
            className={inputCls}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={labelCls}>Now playing (current focus)</label>
        <input
          name="now_playing"
          defaultValue={profile.now_playing}
          placeholder="building a realtime chat app · leveling Rust"
          className={inputCls}
        />
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30"
        >
          Save profile
        </button>
        {saved && (
          <span className="text-sm font-bold text-green-500">Saved ✓</span>
        )}
      </div>
    </form>
  );
}
