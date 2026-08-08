"use client";

import { useEffect, useState } from "react";
import { Trash2, MailOpen, Mail, X } from "lucide-react";
import type { Message } from "@/lib/supabase/types";
import { markMessageRead, deleteMessage } from "../crud-actions";

function formatDate(iso: string) {
  // Locale-stable enough for an admin view; rendered on the client.
  return new Date(iso).toLocaleString();
}

export default function MessagesInbox({ messages }: { messages: Message[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = messages.find((m) => m.id === openId) ?? null;

  // Opening an unread message marks it read (fire-and-forget; the server action
  // revalidates /admin so the list reflects the new state on next render).
  function handleOpen(m: Message) {
    setOpenId(m.id);
    if (!m.is_read) {
      const fd = new FormData();
      fd.set("id", m.id);
      fd.set("is_read", "true");
      void markMessageRead(fd);
    }
  }

  if (messages.length === 0) {
    return <p className="text-glaze/60 text-sm">No messages yet.</p>;
  }

  return (
    <>
      <div className="glass overflow-hidden rounded-2xl divide-y divide-glaze/10">
        {messages.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => handleOpen(m)}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-glaze/5 ${
              m.is_read ? "opacity-60" : ""
            }`}
          >
            <span
              aria-hidden
              className={`h-2 w-2 shrink-0 rounded-full ${
                m.is_read ? "bg-transparent" : "bg-primary"
              }`}
            />
            <span
              className={`w-40 shrink-0 truncate text-sm ${
                m.is_read ? "text-glaze" : "font-bold text-frost"
              }`}
            >
              {m.name}
            </span>
            <span
              className={`min-w-0 flex-1 truncate text-sm ${
                m.is_read ? "text-glaze" : "font-semibold text-frost"
              }`}
            >
              {m.subject}
              {m.company && (
                <span className="text-glaze/50"> — {m.company}</span>
              )}
            </span>
            <span className="hidden shrink-0 text-xs text-glaze/60 sm:block">
              {formatDate(m.created_at)}
            </span>
          </button>
        ))}
      </div>

      {open && (
        <MessageModal message={open} onClose={() => setOpenId(null)} />
      )}
    </>
  );
}

function MessageModal({
  message: m,
  onClose,
}: {
  message: Message;
  onClose: () => void;
}) {
  // Close on Escape.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Message: ${m.subject}`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-abyss/70 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="glass relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-glaze/10 p-6">
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-frost">{m.subject}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold text-glaze">{m.name}</span>
              {m.company && <span className="text-glaze/60">· {m.company}</span>}
              <a
                href={`mailto:${m.email}?subject=${encodeURIComponent(
                  `Re: ${m.subject}`
                )}`}
                className="font-bold text-primary hover:underline"
              >
                {m.email}
              </a>
            </div>
            <p className="mt-1 text-xs text-glaze/50">
              {formatDate(m.created_at)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-xl p-2 text-glaze hover:bg-glaze/10 hover:text-frost"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-frost/90">
            {m.message}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-glaze/10 p-4">
          <form action={markMessageRead}>
            <input type="hidden" name="id" value={m.id} />
            <input
              type="hidden"
              name="is_read"
              value={(!m.is_read).toString()}
            />
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-glaze/10 px-3 py-2 text-sm font-semibold text-glaze hover:text-frost"
            >
              {m.is_read ? <Mail size={16} /> : <MailOpen size={16} />}
              {m.is_read ? "Mark unread" : "Mark read"}
            </button>
          </form>
          <form
            action={deleteMessage}
            onSubmit={(e) => {
              if (!confirm("Delete this message?")) e.preventDefault();
              else onClose();
            }}
          >
            <input type="hidden" name="id" value={m.id} />
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-glaze/10 px-3 py-2 text-sm font-semibold text-glaze hover:text-red-400"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
