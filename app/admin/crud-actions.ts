"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "project-images";

// Ensures a request is authenticated before any mutation. Server Actions are
// reachable via direct POST, so every action must verify auth (RLS is the final
// backstop, but this fails fast with a clear error).
async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

function parseTags(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function nullIfEmpty(raw: FormDataEntryValue | null): string | null {
  const v = String(raw ?? "").trim();
  return v.length ? v : null;
}

// Uploads an optional image file to Supabase Storage and returns its public URL,
// or null when no file was provided.
async function maybeUploadImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File | null
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop() || "png";
  // Deterministic-ish unique name without Math.random (fine on the server).
  const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  // silence unused var lint for ext in case name has no dot
  void ext;
  return data.publicUrl;
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export async function createProject(formData: FormData) {
  const supabase = await requireUser();

  const file = formData.get("image") as File | null;
  const uploadedUrl = await maybeUploadImage(supabase, file);
  const imageUrl = uploadedUrl ?? nullIfEmpty(formData.get("image_url"));

  const { error } = await supabase.from("projects").insert({
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    image_url: imageUrl,
    github_url: nullIfEmpty(formData.get("github_url")),
    live_url: nullIfEmpty(formData.get("live_url")),
    tags: parseTags(formData.get("tags")),
    highlight: nullIfEmpty(formData.get("highlight")),
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateProject(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing project id");

  const file = formData.get("image") as File | null;
  const uploadedUrl = await maybeUploadImage(supabase, file);
  // Keep existing image_url unless a new file was uploaded or the field was set.
  const imageUrl = uploadedUrl ?? nullIfEmpty(formData.get("image_url"));

  const { error } = await supabase
    .from("projects")
    .update({
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      image_url: imageUrl,
      github_url: nullIfEmpty(formData.get("github_url")),
      live_url: nullIfEmpty(formData.get("live_url")),
      tags: parseTags(formData.get("tags")),
      highlight: nullIfEmpty(formData.get("highlight")),
      featured: formData.get("featured") === "on",
      sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing project id");

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export async function createSkill(formData: FormData) {
  const supabase = await requireUser();

  const { error } = await supabase.from("skills").insert({
    title: String(formData.get("title") ?? "").trim(),
    icon_name: String(formData.get("icon_name") ?? "Code2").trim(),
    skills: parseTags(formData.get("skills")),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateSkill(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing skill id");

  const { error } = await supabase
    .from("skills")
    .update({
      title: String(formData.get("title") ?? "").trim(),
      icon_name: String(formData.get("icon_name") ?? "Code2").trim(),
      skills: parseTags(formData.get("skills")),
      sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteSkill(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing skill id");

  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

// ---------------------------------------------------------------------------
// Profile (single-row player HUD)
// ---------------------------------------------------------------------------

export async function updateProfile(formData: FormData) {
  const supabase = await requireUser();

  const { error } = await supabase
    .from("profile")
    .update({
      open_to_work: formData.get("open_to_work") === "on",
      status_label: String(formData.get("status_label") ?? "").trim(),
      region: String(formData.get("region") ?? "").trim(),
      now_playing: String(formData.get("now_playing") ?? "").trim(),
      reply_time: String(formData.get("reply_time") ?? "").trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

export async function markMessageRead(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  const isRead = String(formData.get("is_read") ?? "true") === "true";
  if (!id) throw new Error("Missing message id");

  const { error } = await supabase
    .from("messages")
    .update({ is_read: isRead })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

export async function deleteMessage(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing message id");

  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}
