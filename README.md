# Noel Portfolio — Next.js 16 + Supabase

Dynamic developer portfolio migrated from a static React/Vite site to Next.js 16
(App Router) with a Supabase backend (Postgres + Auth + Storage). Projects,
skills, and contact messages are all data-driven — nothing is hardcoded.

## Stack

- **Next.js 16** (App Router, Server Components, Server Actions, Turbopack)
- **Tailwind CSS 4** + Framer Motion + lucide-react
- **Supabase** — Postgres (data), Auth (admin login), Storage (project images)

## Architecture

| Area | Location |
| --- | --- |
| Public homepage | `app/page.tsx` → `app/components/*` |
| Public data reads (SSR) | `lib/data.ts` (Server Components) |
| Contact form | `app/components/Contact.tsx` + `app/actions/contact.ts` |
| Admin login | `app/admin/login/` + `app/admin/auth-actions.ts` |
| Admin dashboard (guarded) | `app/admin/(protected)/` |
| Admin CRUD actions | `app/admin/crud-actions.ts` |
| Supabase clients | `lib/supabase/{client,server,admin,proxy}.ts` |
| Auth gate (middleware) | `proxy.ts` (Next 16 renamed Middleware → Proxy) |
| DB schema / RLS / seed | `supabase/{schema,seed}.sql` |

Public reads use async **Server Components** (best SEO/perf). Mutations use
**Server Actions**, each of which re-checks auth (Server Actions are reachable
by direct POST) with **RLS** as the final backstop. The `/admin` area is gated
in three layers: proxy pre-check → server-side layout guard → RLS.

**Admin/public separation:** while logged in, the admin is confined to the
`/admin` area — the proxy redirects any public route (`/` and its sections) to
`/admin`. To review the live site without signing out, the admin uses
**`/admin/preview`** (the "Preview site" link, opens in a new tab), which renders
the same `PortfolioHome` component as `/`.

## Setup

### 1. Create a Supabase project

At [supabase.com](https://supabase.com), create a project. From
**Project Settings → API**, copy the Project URL, the `anon` public key, and the
`service_role` key.

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>   # server-only, never exposed
```

### 3. Database schema + seed

In the Supabase **SQL Editor**, run `supabase/schema.sql` (tables, RLS policies,
storage bucket), then optionally `supabase/seed.sql` (ports the original
portfolio's projects & skills).

### 4. Create the admin user

In **Authentication → Users**, add a user (email + password). That user can log
in at `/admin/login`. Any authenticated user is treated as the admin (see the
note in `supabase/schema.sql` to restrict to a specific uid).

### 5. Run

```bash
npm install
npm run dev        # http://localhost:3000
```

## Notes

- **Images**: `next.config.ts` allows remote images from
  `*.supabase.co/storage/v1/object/public/**`. Seeded projects initially point at
  `/images/*` in `public/`; uploading a new image in the admin panel replaces the
  URL with a Supabase Storage public URL.
- **lucide-react** is pinned to `0.562.0` because later versions removed the
  `Github` / `Linkedin` / `Instagram` brand icons used here.
