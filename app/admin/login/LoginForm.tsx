"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn, type AuthState } from "../auth-actions";

const initialState: AuthState = { error: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-5 py-3 rounded-xl bg-cyan-100/30 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary outline-none dark:text-white font-bold"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full px-5 py-3 rounded-xl bg-cyan-100/30 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary outline-none dark:text-white font-bold"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-bold text-red-500">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
