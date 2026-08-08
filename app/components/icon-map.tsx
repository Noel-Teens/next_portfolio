import {
  Layout,
  Server,
  Terminal,
  Database,
  Code2,
  Monitor,
  Settings,
  Github,
  Cpu,
  Cloud,
  type LucideIcon,
} from "lucide-react";

// Maps a string icon name (stored in the DB `skills.icon_name` column) to a
// Lucide icon component. Add entries here as new icon names are used.
const ICONS: Record<string, LucideIcon> = {
  Layout,
  Server,
  Terminal,
  Database,
  Code2,
  Monitor,
  Settings,
  Github,
  Cpu,
  Cloud,
};

// Keys offered in the admin skill editor's icon picker.
export const ICON_NAMES = Object.keys(ICONS);

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Code2;
}
