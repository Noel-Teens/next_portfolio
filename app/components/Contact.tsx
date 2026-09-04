"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import type { Profile } from "@/lib/supabase/types";

const initialState: ContactState = { status: "idle", message: "" };
const ease = [0.22, 1, 0.36, 1] as const;

// CONTACT — an "open comms" transmission console. The form is framed as a
// terminal: a header bar with a live status, mono field labels with `>` prompts,
// corner registration ticks, and a "Transmit" action. In-world vocabulary
// (handle / channel / transmit) stays understandable; the underlying field
// `name` attributes are unchanged so the server action keeps working.

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group flex w-full items-center justify-center gap-3 rounded-sm bg-neon py-4 font-mono text-sm font-bold uppercase tracking-[0.25em] text-abyss transition-colors hover:bg-frost disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Transmitting…" : "Transmit"}
      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

const fieldClass =
  "w-full rounded-sm border border-neon/25 bg-[color:var(--surface)] px-4 py-3 font-mono text-sm text-frost placeholder:text-ink/40 outline-none transition-all focus:border-neon focus:ring-1 focus:ring-neon/40";

// One labelled terminal field with a `>` prompt marker.
function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-neon/80"
      >
        <span aria-hidden className="text-neon">&gt;</span>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact({ profile }: { profile: Profile }) {
  const [state, formAction] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-28">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        {/* ── LEFT: the pitch + live operator status ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="relative"
        >
          <span
            aria-hidden
            className="display text-outline pointer-events-none absolute -top-12 -left-1 select-none text-[clamp(3rem,11vw,8rem)] leading-none opacity-40"
          >
            CONTACT
          </span>

          <span className="eyebrow relative text-[0.62rem]">
            — final screen · open comms
          </span>
          <h2 className="display relative mt-3 text-4xl leading-[1.02] text-frost md:text-5xl">
            You&apos;ve reached the last screen. Let&apos;s talk.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-ink">
            A problem worth solving, a role to fill, or just comparing notes —
            send a transmission. I read every one and reply fast.
          </p>

          {/* live operator status — reads as a HUD line */}
          <dl className="mt-9 space-y-3 border-l-2 border-neon/30 pl-5 font-mono">
            <div className="flex items-center gap-3">
              <dt className="w-24 text-[0.58rem] uppercase tracking-[0.2em] text-neon/70">
                operator
              </dt>
              <dd className="flex items-center gap-2 text-sm text-frost">
                {profile.open_to_work ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon/50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
                    </span>
                    {profile.status_label || "Online · open to work"}
                  </>
                ) : (
                  <span className="text-ink/70">
                    {profile.status_label || "Away"}
                  </span>
                )}
              </dd>
            </div>
            {profile.reply_time && (
              <div className="flex items-center gap-3">
                <dt className="w-24 text-[0.58rem] uppercase tracking-[0.2em] text-neon/70">
                  latency
                </dt>
                <dd className="text-sm text-frost">replies {profile.reply_time}</dd>
              </div>
            )}
            {profile.region && (
              <div className="flex items-center gap-3">
                <dt className="w-24 text-[0.58rem] uppercase tracking-[0.2em] text-neon/70">
                  node
                </dt>
                <dd className="text-sm text-frost">{profile.region}</dd>
              </div>
            )}
          </dl>
        </motion.div>

        {/* ── RIGHT: the transmission console ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="relative rounded-lg border border-neon/25 bg-[color:var(--surface)] shadow-[0_18px_44px_rgba(20,18,14,0.12)]"
        >
          {/* corner registration ticks */}
          <span aria-hidden className="pointer-events-none absolute left-2.5 top-2.5 h-3 w-3 border-l border-t border-neon/40" />
          <span aria-hidden className="pointer-events-none absolute right-2.5 top-2.5 h-3 w-3 border-r border-t border-neon/40" />
          <span aria-hidden className="pointer-events-none absolute bottom-2.5 left-2.5 h-3 w-3 border-b border-l border-neon/40" />
          <span aria-hidden className="pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r border-neon/40" />

          {/* terminal header bar */}
          <div className="flex items-center justify-between border-b border-neon/20 px-6 py-3.5">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-frost">
              ▸ new transmission
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-neon/30" />
              <span className="h-2 w-2 rounded-full bg-neon/30" />
              <span className="h-2 w-2 rounded-full bg-neon" />
            </span>
          </div>

          <form ref={formRef} action={formAction} className="space-y-5 p-6 md:p-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="name" label="handle">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="your name"
                  required
                  className={fieldClass}
                />
              </Field>
              <Field id="email" label="channel">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className={fieldClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                id="company"
                label={
                  <>
                    org <span className="text-ink/40">· optional</span>
                  </>
                }
              >
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="where you work"
                  className={fieldClass}
                />
              </Field>
              <Field id="subject" label="subject">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="what's this about?"
                  required
                  maxLength={200}
                  className={fieldClass}
                />
              </Field>
            </div>

            <Field id="message" label="message">
              <textarea
                id="message"
                name="message"
                placeholder="what are you building?"
                required
                rows={5}
                className={`${fieldClass} resize-none`}
              />
            </Field>

            {state.status !== "idle" && (
              <p
                role="status"
                className={`flex items-center gap-2 font-mono text-xs ${
                  state.status === "success" ? "text-frost" : "text-red-500"
                }`}
              >
                <span aria-hidden>{state.status === "success" ? "✓" : "!"}</span>
                {state.status === "success"
                  ? "Transmission sent — I'll reply soon."
                  : state.message}
              </p>
            )}

            <SubmitButton />
          </form>
        </motion.div>
      </div>
    </section>
  );
}
