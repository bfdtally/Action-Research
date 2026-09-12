# FAMU College of Education Action Research Navigator

A responsive, accessible organizer for student-owned educational action research. It supports multiple courses and programs and works without a paid AI service.

## What is implemented

The application covers all twelve build phases: project setup; concern and SMART goal; inspect-before-commit method selection and case-study subtypes; theory comparison; student-first question checks; action cycles; reorderable evidence sources and ethics checkpoint; literature cards; editable timeline; private journal; qualitative, quantitative, and mixed-method analysis; flexible outlines and print/CSV/JSON exports; optional Supabase authentication/schema; a securely disabled instructor area; shared three-suggestion limits; responsive WCAG-oriented navigation; and Render deployment configuration.

Local browser storage is the development/default persistence mode. It preserves incomplete work and shows Saving, Saved, Offline, and Save failed states. Supabase is enabled only when its two frontend-safe environment variables are present.

## Implementation plan

1. Maintain the reusable organizer shell and content in `src/`.
2. Validate student workflows and deterministic guardrails with unit/integration tests.
3. Apply `supabase/migrations/202609120001_initial_schema.sql` to a new Supabase project, verify RLS with two test users, then add production environment values.
4. Deploy the static `dist/` output through the included Render Blueprint.

## Local development

Requires Node 22.13+ and pnpm 10.

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Verification:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm preview
```

## Supabase setup and security

1. Create a Supabase project and apply the SQL migration.
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env.local` and Render. Never use a secret/service-role key in frontend variables.
3. Configure local and production Site URLs and add `/auth/callback` and `/auth/reset` redirects.
4. Use the current RLS Tester or two separate student accounts to confirm cross-owner SELECT, INSERT, UPDATE, and DELETE fail. Confirm users cannot edit `app_metadata` or access instructor tables.
5. Run Supabase security/performance advisors after applying the migration. Explicit grants are included because tables created in 2026 projects are no longer automatically exposed to the Data API.

Instructor functionality is intentionally unavailable until protected `app_metadata` roles plus group-membership RLS policies are separately reviewed and enabled. Journals, hidden authorization fields, authentication data, and internal identifiers are excluded from instructor exports.

## Render deployment

The included `render.yaml` builds with `pnpm build`, publishes `dist`, adds security headers, and rewrites direct SPA routes to `index.html`. Connect the GitHub repository in Render and use the Blueprint, or create a Static Site using those values. Add only the two public Supabase variables if cloud sync is desired.

Smoke test `/`, `/welcome`, a direct `/projects/{id}/method` route, `/help`, local autosave/refresh, offline editing, exports, and the authentication callback. Check the browser console and phone/desktop layouts.

## Content maintenance

Research methods, theories, ethics reminders, timeline defaults, and step labels live in `src/content.ts`. Shared limits and local persistence live in `src/store.ts`. Interface copy is grouped by feature in `src/App.tsx`. All samples must stay labeled “Example,” suggestion lists must remain capped at three, and no content may invent participant details, evidence, citations, data, findings, or conclusions.

## Branding, privacy, backup, and accessibility

The `COE` circle is a deliberate placeholder, not an official mark. Place an authorized asset under `public/branding/` and replace the placeholder only with written institutional approval. Never commit real student or participant data. Users can download a JSON backup and restore it locally; production backup policy should include Supabase point-in-time/daily backup settings appropriate to the institution.

The interface targets WCAG 2.2 AA with labels, keyboard access, focus indicators, status announcements, large controls, reduced-motion support, responsive layouts, and print styles. Run an automated accessibility scanner and manual keyboard/screen-reader checks before each production release.

## Release and rollback

Before release: run the full verification suite, scan for secrets and course-specific wording, test direct routes and exports, review Supabase advisors, and confirm authorized branding. Tag the release in Git. To roll back, redeploy the previous Git commit in Render; do not reverse a database migration until data impact is reviewed and a backup is confirmed.
