# farewell Project Rules

App: `farewell` (Yoma Farewell). Run with `APP=farewell` (or `-c projects/farewell`).

These rules apply to every task on this app. Where a generic skill reference shows a
different pattern, this file wins. Paths in this file are relative to `projects/farewell/`.

Background: `docs/knowledge/`. Source documents (outside the repo): `~/Documents/Projects/Yoma Group Farewell Wall/`
— **Yoma-Farewell-User-Guide.pdf v1.1 (5 Oct 2026) is the source of truth** for screens, texts and rules;
PRD v2.0 for intent; "Farewall UAT Feedback.xlsx" for UAT-001 … UAT-008.

## System Under Test

| Part | What (stack) | Env var |
|---|---|---|
| Web app | Yoma Farewell, Next.js on Vercel (test site, made-up people) | `BASE_URL` |
| API | Same origin as the web app; endpoints not documented (**unconfirmed**) | `API_BASE_URL` (unused for now) |

- **Target from 20 Oct 2026: UAT `https://uat-farewell.yomagroup.io`**, Microsoft Entra SSO (Yoma tenant).
  Until a dedicated automation account exists (requested), the `employee` role signs in with the tester's own
  account; other roles are skipped. The account menu, seeded accounts and per-test imported leavers below
  describe the dev test site and do **not** work on UAT (**unconfirmed** how UAT test data will be provided).
- Dev test site `https://farewell-wall-git-dev-yoma-bank.vercel.app` (target 18–20 Oct 2026); switch back via `.env`.
- `https://farewell-wall-beryl.vercel.app` (password login) is **not** the automation target.
- Never run against production (planned AWS, `ap-southeast-1`, with Microsoft SSO).

## API

- No documented API. All cases are UI (`Auto-UI`) or UI + downloaded file (`Auto-UI+API`: CSV, XLSX, PDF parsed in the test).
- Cases that need the backend directly (PERM-003, PERM-005, PERM-006, ADM-012, ADM-016) stay `Review` until the dev team documents the endpoints.

## Roles and Authentication

**Test site: no password.** `/login` shows "Choose a test account"; the "?" avatar ("Choose an account") at the
top right opens the account menu with a "Search accounts" box and groups "Platform admins", "Wave Money admins",
"Yoma Bank admins", "Yoma Group admins", "Leavers", "Employees". Clicking a name signs in as that person.
Microsoft SSO is not switched on (production only, UAT-003).

`tests/auth.setup.ts` saves `playwright/.auth/<role>.json` (git-ignored) for every role that has credentials:
- UAT: `/login` → Microsoft sign-in with `<ROLE>_EMAIL` + `<ROLE>_PASSWORD` (`MicrosoftSignInPage`). An empty
  password means the tester types it and approves MFA in a headed run (`--project=setup --headed`, 3 min).
  Lands on `/auth/refused?r=entra` when Microsoft accepts the account but the app does not.
- Dev test site: picks `<ROLE>_ACCOUNT` by name from the account menu.
- A role with neither is skipped; specs using it fail until it has an account.

| Role key | Account (18 Oct 2026) | Use for |
|---|---|---|
| `platform-admin` | Kaung Myat — "Platform admin · all entities" | any company, Admins, Change role |
| `wave-admin` | Hnin Aye — "Wave Money admin" | company-admin cases (Wave Money) |
| `bank-admin` | Thiri Win — "Yoma Bank admin" | cross-company permission cases |
| `employee` | Nandar Lin — "Employee · Yoma Bank · no page yet" | read-only employee checks (wall, no Admin) |
| `wave-employee` | Min Khant — "Employee · Wave Money · no page yet" | read-only checks that need a Wave Money employee (WALL-001, ACC-006) |
| `live-leaver` | Khin Myat Noe — "Live leaver · Wave Money · published" | read-only checks of a live page |
| `visitor` | no sign-in (empty storage state) | MSG cases opening a page by link |

- Second Platform admin: Zaw Min Tun (needed for ADM cases on another Platform admin).
- Greyed-out accounts for ACC cases: Nwe Nwe Htwe ("Account disabled"), Hla Hla Myint ("Removed from the Employee List"),
  Ko Ko Naing ("Last working day reached").
- Accounts tests must never change (disable, delete, remove, change role, publish, trigger): **every seeded account above**.
  State-changing cases use people the test imports itself.
- Draft leavers seeded (Aye Chan Moe, Htet Htet Aung, Yee Mon Kyaw) and Min Khant (no page) must **not** be used
  to publish or create a page: those actions cannot be undone.

## Test Cases → Tests

Follow the skill's `references/test-case-conventions.md`. App specifics:

- Cases: `docs/test-cases/features/01-access.md` … `14-permissions.md`, prefixes ACC, WALL, CRT, STYLE, WRITE, PUB,
  MSG, THEME, DEP, MOD, BOOK, EMP, ADM, PERM. Steps are Action / Data / Expected tables (Xray-ready).
- E2E flows: `E2E-01` set-up → booklet (`docs/test-cases/suites/e2e-critical-flows.md`).
- Feature folders: `tests/access/`, `tests/wall/`, `tests/create-page/`, `tests/builder/` (STYLE, WRITE),
  `tests/publish/`, `tests/messages/`, `tests/themes/`, `tests/departures/`, `tests/moderation/`, `tests/booklet/`,
  `tests/employees/`, `tests/admins/`, `tests/permissions/`, `tests/e2e/`.
- Domain assertions:
  - Dates: last working day must be after today; message window = 5 days from **publish**, not from the last day;
    booklet 24 h after the window closes; off the wall 90 days after the last working day. Compute dates relative to today.
  - Texts are asserted exactly as the guide quotes them (curly apostrophes ’ as in the app).
  - Theme words differ per theme (§9): take the expected button/heading from the case's variant table.
- Time-based behaviour (window close, 24 h, 30 / 90 days) is `Manual` until the dev team gives a way to move time (**unconfirmed**).

## Data Isolation

- Each state-changing test imports its own employee through Admin → Employee List → "Import Employee list"
  (CSV built in the test; an imported, triggered leaver appears in the account menu at once — confirmed by dev 19 Oct 2026): `work_email = at-<yyyymmdd>-<workerIndex>-<random>@yoma.example.invalid`,
  `full_name = AT <random>`, department `Automation`. Then Record → Trigger, and signs in as that person from the
  account menu.
- Shared state to avoid asserting on: wall counts ("N current leavers"), tile counts and "15 of 15 employees" change as
  tests add people. Assert the delta or filter by the test's own name.
- What cannot be undone: publishing (link permanent), removing a photo, sending a booklet, triggering.
  Deleting an employee is undone with "Restore"; disabling with "Enable"; removing an admin with "Restore".
- No periodic reset (dev, 19 Oct 2026). A page is removed from the UI 45 days after the last working day; the data stays
  in the DB. So every run's leavers stay visible for ~45 days: set the last working day to the earliest allowed date
  (tomorrow) and always use the `AT-` / `AT ` prefix so test data is easy to spot. (The guide and footer say 90 days —
  open question #9 in `docs/test-cases/source-issues.md`.)

## Known Product Bugs

Where confirmed defects are recorded (referenced by `test.fail()`): `docs/knowledge/GOTCHAS.md`.
Open questions on cases: `docs/test-cases/source-issues.md` (41 Review cases).

## Safety

- Allowed environments: UAT and the dev test site above only. UAT may hold real Yoma staff data: read-only checks
  only with a personal account; no state-changing tests on UAT until the team agrees on test data.
- Never: change, disable, delete or publish for the seeded accounts; change roles of seeded admins; send booklets
  for seeded departures; hide messages on seeded pages (use the test's own page).
- Emails go to the test inbox only (guide Appendix A); never enter a real personal email — use `@example.invalid`.
- Never upload real personal data or real photos; use generated images.
