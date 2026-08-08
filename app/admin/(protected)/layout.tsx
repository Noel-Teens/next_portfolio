import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "../auth-actions";

// Server-side auth guard for the admin dashboard. This is the authoritative
// check (the proxy is only an optimistic pre-check). RLS is the final backstop.
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen">
      <header className="glass sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="text-xl font-black text-slate-900 dark:text-white"
          >
            Admin<span className="text-primary">.</span>
          </Link>
          <Link
            href="/admin/preview"
            target="_blank"
            className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary"
          >
            Preview site ↗
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm text-slate-500 dark:text-slate-400">
            {user.email}
          </span>
          <form action={signOut}>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
