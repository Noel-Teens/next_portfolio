import { createClient } from "@supabase/supabase-js";

// Service-role client. Bypasses RLS — use ONLY in trusted server code after you
// have verified the caller is an authenticated admin. Never import this into a
// Client Component.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
