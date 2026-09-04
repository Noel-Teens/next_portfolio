import type { Profile } from "@/lib/supabase/types";

// "NOW PLAYING" bar — a game's active-quest tracker, repurposed to show what
// you're currently building/learning. One line, admin-editable. Renders nothing
// when unset, so it never shows an empty strip. Server component (static text).
export default function NowPlaying({ profile }: { profile: Profile }) {
  if (!profile.now_playing) return null;

  return (
    <div className="relative z-20 border-y border-neon/15 bg-abyss/40">
      <div className="shell flex items-center gap-3 py-3">
        <span className="flex items-center gap-2 whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.28em] text-neon">
          <span className="text-sm leading-none">▶</span> Now playing
        </span>
        <span aria-hidden className="h-3 w-px flex-none bg-neon/25" />
        <span className="truncate text-sm text-ink">{profile.now_playing}</span>
      </div>
    </div>
  );
}
