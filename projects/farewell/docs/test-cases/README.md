# farewell Test Cases — Smoke · E2E · Regression

Test-case catalog for **farewell**. It is the baseline for the automated **Smoke**, **E2E** and **Regression** suites.

| | |
|---|---|
| **Source of truth** | The feature files in [features/](features/). Add and change test cases there (see [Adding or changing test cases](#adding-or-changing-test-cases)). |
| **Business context** | [Knowledge base](../knowledge/README.md) |

## How to read this

**Priority**

| | Meaning |
|---|---|
| **P1** | Critical business flow or data correctness. Must pass to release. |
| **P2** | Core functional behaviour: list / view / filter / edit / delete, report filters, permissions. |
| **P3** | Field-level and UI validation, messages, sorting, cosmetic. |

**★ Critical business flow** — the case directly exercises one of the app's critical flows (list them here).

**Tags** (a case can have several; suites are tags, not files)

- `@smoke`: a small happy-path set run on every deploy.
- `@e2e`: the case is a step in a cross-module flow, composed into flows in [e2e-critical-flows.md](suites/e2e-critical-flows.md).
- Regression is every test that is not Obsolete, narrowed by priority (`@P1`, `@P2`, `@P3`); it needs no tag.
- `@critical` (★) and `@review` (Status Review) are added to the test from the case's ★ and Status, not from this column.

**Automation**

| Tag | Meaning |
|---|---|
| `Auto-UI` | Browser automation; assert on screen. |
| `Auto-UI+API` | Act in the UI, assert the result via API or a parsed file. |
| `Auto-API` | Pure API test, including parallel requests for race conditions. |
| `Manual` | Physical print, visual layout or untestable-as-written. The reason is given on each case. |

**Status:** `Active` · `Review` (expected result or behaviour needs confirmation — see [source-issues.md](source-issues.md)) · `Obsolete`.

**Data variants.** A case that runs the same check with different data lists the data in its **Data variants** table. Automate each such case as **one parameterized / data-driven test** with one run per variant.

**IDs.** `<FEATURE>-<nnn>`, for example `AUTH-001`. An ID never changes and is never reused.

<!-- generated:overview (npm run cases:build) -->
## At a glance

| | |
|---|---|
| Test cases | **206** (+185 data-variant rows = 391 rows) |
| ★ Critical business flow | 21 |
| Priority P1 / P2 / P3 | 52 / 79 / 75 |
| @smoke / @e2e | 14 / 14 (+ 1 composed [E2E flows](suites/e2e-critical-flows.md)) |
| Automatable / Manual | 190 / 16 |
| Review (open question) / Obsolete | 49 / 2 |

## Run by tag

Suites are tags, not files. Gates that block a merge or deploy leave out `@review`.

| Tag | Cases | Run |
|---|---|---|
| `@smoke` | 14 | `APP=farewell npx playwright test --grep @smoke --grep-invert @review` |
| `@critical` (★) | 21 | `--grep @critical` |
| `@P1` | 52 | `--grep @P1 --grep-invert @review` |
| `@P1` + `@P2` | 131 | `--grep "@P1|@P2" --grep-invert @review` |
| `@review` | 49 | `--grep @review` (non-blocking) |
| `@e2e` | 1 flows ([e2e-critical-flows.md](suites/e2e-critical-flows.md)); 14 cases are steps of a flow | `--grep @e2e` |
| regression (everything) | 204 | `APP=farewell npx playwright test` |

## Features

| # | Feature | Cases | ★ | P1 | @smoke | Auto | Manual |
|---|---|---|---|---|---|---|---|
| | **Everyone** | | | | | | |
| 01 | [Access & Accounts](features/01-access.md) | 14 | 2 | 6 | 1 | 13 | 1 |
| 02 | [Alumni Wall](features/02-alumni-wall.md) | 16 | 2 | 4 | 2 | 14 | 2 |
| 14 | [Roles & Permissions](features/14-permissions.md) | 13 | 2 | 13 | 1 | 13 | 0 |
| | **Leaver** | | | | | | |
| 03 | [Create My Farewell Page](features/03-create-page.md) | 9 | 1 | 1 | 0 | 9 | 0 |
| 04 | [Builder · Choose Your Style](features/04-builder-style.md) | 20 | 1 | 1 | 1 | 20 | 0 |
| 05 | [Builder · Write a Message](features/05-builder-message.md) | 14 | 2 | 2 | 2 | 14 | 0 |
| 06 | [Preview, Publish & Share](features/06-publish.md) | 16 | 1 | 2 | 1 | 15 | 1 |
| 08 | [Themes](features/08-themes.md) | 5 | 0 | 0 | 0 | 4 | 1 |
| | **Colleague** | | | | | | |
| 07 | [Visit a Page & Leave a Message](features/07-leave-message.md) | 14 | 1 | 2 | 1 | 12 | 2 |
| | **People team (admin)** | | | | | | |
| 09 | [Departures (Admin)](features/09-departures.md) | 18 | 2 | 4 | 1 | 18 | 0 |
| 10 | [Messages & Photos Moderation (Admin)](features/10-moderation.md) | 12 | 1 | 1 | 1 | 12 | 0 |
| 11 | [Booklet & Email](features/11-booklet.md) | 14 | 1 | 3 | 1 | 7 | 7 |
| 12 | [Employee List (Admin)](features/12-employee-list.md) | 25 | 2 | 5 | 1 | 23 | 2 |
| 13 | [Admins (Admin)](features/13-admins.md) | 16 | 3 | 8 | 1 | 16 | 0 |

## Manual-only cases (16)

Kept in the manual checklist; everything else is planned for automation.

| ID | Test case | Reason |
|---|---|---|
| [ACC-013](features/01-access.md#acc-013--production-sign-in-uses-microsoft-sso-and-exposes-no-password-or-password-reset) | Production sign-in uses Microsoft SSO and exposes no password or password reset | Microsoft SSO, production-only (not on the test site) |
| [WALL-015](features/02-alumni-wall.md#wall-015--on-a-phone-the-wall-stacks-cards-in-one-column-and-the-controls-stay-usable) | On a phone the wall stacks cards in one column and the controls stay usable | visual layout matching the design (FW-009, UAT-008) |
| [WALL-016](features/02-alumni-wall.md#wall-016--a-page-leaves-the-wall-90-days-after-the-leavers-last-working-day) | A page leaves the wall 90 days after the leaver's last working day | needs a way to move time; automate once a test hook exists |
| [PUB-016](features/06-publish.md#pub-016--message-window-closes-five-days-after-publishing-not-on-the-last-day) | Message window closes five days after publishing, not on the last day | needs a way to move time; automate once a test hook exists |
| [MSG-013](features/07-leave-message.md#msg-013--farewell-page-and-message-form-are-usable-on-a-phone) | Farewell page and message form are usable on a phone | visual layout on a phone screen |
| [MSG-014](features/07-leave-message.md#msg-014--messages-with-photos-are-laid-out-as-agreed-instant-prints-vs-spotlight) | Messages with photos are laid out as agreed (Instant Prints vs Spotlight) | visual layout matching a design |
| [THEME-004](features/08-themes.md#theme-004--each-themes-page-looks-like-its-design-colours-type-motifs) | Each theme's page looks like its design (colours, type, motifs) | visual look matching the design (UAT-008) |
| [BOOK-007](features/11-booklet.md#book-007--failed-and-outcome-unknown-booklet-statuses-show-their-reason) | Failed and Outcome unknown booklet statuses show their reason | cannot be provoked on the test site (needs a failing mail server or an interrupted send) |
| [BOOK-008](features/11-booklet.md#book-008--booklet-is-sent-automatically-24-hours-after-the-window-closes) | Booklet is sent automatically 24 hours after the window closes | needs a way to move time; automate once a test hook exists |
| [BOOK-009](features/11-booklet.md#book-009--booklet-send-time-and-recipients-guide-vs-prd-v2) | Booklet send time and recipients: guide vs PRD v2 | needs a way to move time and a test inbox |
| [BOOK-010](features/11-booklet.md#book-010--booklet-email-has-the-expected-subject-content-language-and-signature) | Booklet email has the expected subject, content, language and signature | needs the test inbox; Burmese part needs a Burmese speaker |
| [BOOK-011](features/11-booklet.md#book-011--download-link-in-the-email-works-without-signing-in) | Download link in the email works without signing in | needs the test inbox and a booklet too large to attach |
| [BOOK-012](features/11-booklet.md#book-012--expired-or-replaced-download-link-shows-this-link-isnt-valid-any-more) | Expired or replaced download link shows "This link isn't valid any more." | needs a way to move time; automate once a test hook exists |
| [BOOK-013](features/11-booklet.md#book-013--hiding-a-message-after-the-booklet-was-made-does-not-change-the-booklet) | Hiding a message after the booklet was made does not change the booklet | needs the sent booklet from the test inbox |
| [EMP-024](features/12-employee-list.md#emp-024--phone-number-in-employee-information-has-validation-and-a-length-limit) | Phone number in employee information has validation and a length limit | no phone field exists in the guide to automate against; automate once the field is defined |
| [EMP-025](features/12-employee-list.md#emp-025--employee-list-layout-and-alignment-match-the-approved-uat-design) | Employee List layout and alignment match the approved UAT design | visual alignment and spacing against a design |
<!-- /generated:overview -->

## Adding or changing test cases

The case sections in `features/**/*.md` are the **only** place a test case is written. Everything else is generated from them by `npm run cases:build -- --app farewell`:

- the counts and **Summary** table at the top of each feature file,
- [test-catalog.csv](test-catalog.csv),
- the blocks between `<!-- generated:… -->` markers in this README and in [source-issues.md](source-issues.md).

Do not edit generated content by hand; the next build overwrites it. [suites/e2e-critical-flows.md](suites/e2e-critical-flows.md) is hand-written.

**Workflow**

1. Edit or add the case in its feature file.
2. Run `npm run cases:build -- --app farewell`. It validates every case and rewrites the generated files.
3. Commit the feature file together with the generated files. `npm run cases:check -- --app farewell` fails when they are out of date (use it in CI).

**Rules**

- **New case:** the next free number at the end of the feature, under the right `### <sub-feature>` heading. Never renumber or reuse an ID.
- **Removed case:** set its Status to `Obsolete` and keep it. Delete a case only if it was never automated.
- **New feature:** a new file `features/<nn>-<slug>.md` (next free number) with its own ID prefix, starting with `# <nn> · <Feature name>`, the index link, empty `<!-- generated:summary -->` markers and `## Test cases`. Add the prefix to a README group in `../../test-cases.config.mjs`, or it is listed under "Other".
- **Status `Review`** needs the open question after the status: `Review — <question>`. **Automation `Manual`** needs the reason: `Manual — <reason>`.

**Case template**

```markdown
### <Sub-feature>

#### ★ AUTH-002 · <Title: action and expected outcome>

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI | Active | <ticket / spec / author, date> |

**Role:** <Visitor / Employee / Leaver / Company admin / Platform admin>

**Preconditions:**

1. ...

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | ... | ... | ... |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) <title> | <source> | |
| 2 | <short label, unique in this case> | <source> | |
| 3 | <short label> | <source> | Review; <open question> |

---
```

- `★ ` before the ID marks a critical business flow (P1 only). Leave it out otherwise.
- **Tags:** `@smoke` and/or `@e2e`, or `—` for none. `@smoke` cases must be P1, Active and automatable; an Obsolete case has no tags.
- **Priority** `P1` / `P2` / `P3`; **Automation** `Auto-UI` / `Auto-UI+API` / `Auto-API` / `Manual`; **Status** `Active` / `Review` / `Obsolete`.
- Leave out the Data variants section when the case has a single data set. The variant label becomes part of the Playwright test title, so keep it short and unique.
- **Steps** are a table with one expected result per step (Action / Data / Expected result), so a case maps one-to-one to an Xray manual test: `### <sub-feature>` → Xray folder, each row → one Xray step.
- Other sections (`Check areas`, `Scenario group`, …) are free-form; use what the case needs.
