import { createBrowserClient } from "@supabase/ssr";

// Browser (Client Component) Supabase client. Uses the public anon key;
// all access is constrained by Row Level Security policies.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
