"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle", message: "" };

const ease = [0.22, 1, 0.36, 1] as const;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-3 rounded-xl bg-neon py-4 text-lg font-semibold text-abyss shadow-xl shadow-neon/25 transition-all hover:bg-frost hover:shadow-[0_0_36px_rgba(127,233,255,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"} <Send className="h-5 w-5" />
    </button>
  );
}

const fieldClass =
  "w-full rounded-xl border border-neon/25 bg-abyss/70 px-5 py-3.5 font-medium text-frost placeholder:text-ink/50 outline-none transition-all focus:border-neon focus:bg-abyss focus:ring-2 focus:ring-neon/30";

export default function Contact() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28"
      style={{
        background:
          "linear-gradient(180deg, rgba(12,56,70,0) 0%, rgba(12,56,70,0.7) 40%, rgba(7,31,40,0.9) 100%)",
      }}
    >
      <div className="shell grid grid-cols-1 gap-16 md:grid-cols-2 md:items-start">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="relative">
            <span
              aria-hidden
              className="display text-outline pointer-events-none absolute -top-10 -left-1 select-none text-[clamp(3rem,11vw,8rem)] leading-none opacity-50"
            >
              CONTACT
            </span>
            <span className="eyebrow relative">— final boss · contact</span>
            <h2 className="display relative mt-3 text-4xl leading-tight text-frost md:text-5xl">
              You&apos;ve reached the final screen. Let&apos;s talk.
            </h2>
          </div>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink">
            Have a problem worth solving, a role to fill, or just want to compare
            notes? Send a message — I read every one and reply quickly.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="glass relative overflow-hidden rounded-3xl p-8 md:p-10"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-ripple/15 blur-3xl" />

          <form ref={formRef} action={formAction} className="relative space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="eyebrow block text-[0.62rem]">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="eyebrow block text-[0.62rem]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="company" className="eyebrow block text-[0.62rem]">
                  Company <span className="text-ink/60">(optional)</span>
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  placeholder="Where you work"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="eyebrow block text-[0.62rem]">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  required
                  maxLength={200}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="eyebrow block text-[0.62rem]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="What are you working on?"
                required
                rows={5}
                className={`${fieldClass} resize-none`}
              />
            </div>

            {state.status !== "idle" && (
              <p
                role="status"
                className={`text-sm font-semibold ${
                  state.status === "success" ? "text-neon" : "text-red-300"
                }`}
              >
                {state.message}
              </p>
            )}

            <SubmitButton />
          </form>
        </motion.div>
      </div>
    </section>
  );
}
