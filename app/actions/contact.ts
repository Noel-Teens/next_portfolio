"use server";

import { createClient } from "@/lib/supabase/server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Server Action for the public contact form. Inserts into `messages`. Anonymous
// INSERT is permitted by RLS; reads are admin-only.
export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // Company is optional; the rest are required.
  if (!name || !email || !subject || !message) {
    return { status: "error", message: "Please fill in all required fields." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (subject.length > 200) {
    return { status: "error", message: "Subject is too long." };
  }
  if (message.length > 5000) {
    return { status: "error", message: "Message is too long." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("messages")
    .insert({ name, email, company: company || null, subject, message });

  if (error) {
    console.error("submitContact:", error.message);
    return {
      status: "error",
      message: "Something went wrong. Please try again later.",
    };
  }

  return {
    status: "success",
    message: "Thanks! Your message has been sent.",
  };
}
