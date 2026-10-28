# Test case format — instructions for writing Spark test cases

You are writing manual and automatable test cases for the web app **Spark**, from the source
documents provided (user guide, BRD, specs, UAT notes, screenshots). Your output is pasted into a
Git repo as Markdown, then parsed by scripts that build a catalog and export to **Xray (Jira)**.
The scripts parse headings and tables by exact text, so **follow this format exactly**.

## 1. Output: one Markdown file per feature

- Group the cases by feature (module). Each feature is one file named `<nn>-<slug>.md`, for example
  `01-login.md`, `02-dashboard.md`. Number features `01`, `02`, … in a sensible business order.
- Each feature has its own **ID prefix**: 2–5 capital letters, for example `AUTH`, `DASH`, `USER`.
  Case IDs are `<PREFIX>-<nnn>`, starting at `001` in each feature: `AUTH-001`, `AUTH-002`.
- Inside a feature, group cases under `### <Sub-feature>` headings (these become folders in Xray).
- Output each file in its own fenced code block, preceded by its file name, so it can be copied as is.
- Write the cases in **English**.

File skeleton (keep the two `generated` comment lines exactly as shown and empty between them —
a script fills them):

```markdown
# 01 · Login & Authentication

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
<!-- /generated:summary -->

## Test cases

### <Sub-feature 1>

#### ★ AUTH-001 · ...
...

---

#### AUTH-002 · ...
...

---

### <Sub-feature 2>

...
```

## 2. One test case

```markdown
#### ★ AUTH-001 · <Title: the action and its expected outcome>

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke | Auto-UI | Active | <document + section, e.g. User Guide v1.0 §2.1> |

**Role:** <who performs it, e.g. Admin, Staff, Visitor (signed out)>

**Preconditions:**

1. <state that must be true before step 1>
2. <...>

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | <what the user does> | <input values, or empty> | <what the user must see> |
| 2 | ... | | ... |

---
```

Exact rules — the parser depends on them:

- Heading: `#### ` + optional `★ ` + ID + ` · ` (space, middle dot U+00B7, space) + title.
- The 5-column property table comes **directly** under the heading (one blank line between), with
  exactly these headers in this order: `Priority | Tags | Automation | Status | Source`.
- `**Role:**`, `**Preconditions:**`, `**Steps:**` are written exactly like that (bold, colon inside).
- Preconditions are a numbered list. If there are none, write `1. None.`
- Steps are a table with exactly the headers `# | Action | Data | Expected result`.
  Every step has an Expected result. Leave Data empty when there is no input.
- End every case with a line containing only `---`.
- Never put a raw `|` inside a table cell; write `\|` if you really need one.
- No line breaks inside a cell. Use `<br>` if a cell needs two lines.

### Field values

| Field | Allowed values | Rule |
|---|---|---|
| ★ before the ID | `★ ` or nothing | Only for P1 cases that exercise a critical business flow. |
| Priority | `P1` / `P2` / `P3` | **P1** critical flow or data correctness (must pass to release). **P2** core functional behaviour: list, view, filter, edit, delete, permissions. **P3** field validation, messages, sorting, cosmetic. |
| Tags | `@smoke`, `@e2e`, both separated by a space, or `—` | `@smoke`: small happy-path set run on every deploy; must be P1, Active and not Manual. `@e2e`: the case is a step of an end-to-end flow (section 4). |
| Automation | `Auto-UI` / `Auto-UI+API` / `Auto-API` / `Manual — <reason>` | `Auto-UI`: browser test, assert on screen. `Auto-UI+API`: act in the UI, check the result via API or a downloaded file. `Auto-API`: API only. `Manual` **must** give the reason after ` — `, e.g. `Manual — physical print`, `Manual — needs a real Microsoft account`. |
| Status | `Active` / `Review — <question>` | Use `Review` whenever the source is unclear, contradictory or silent on the expected result, and write the open question after ` — `. **Do not guess** an expected result; mark it Review instead. |
| Source | free text | Where the case comes from: document name, version and section, ticket ID. |

### Writing good steps

- One user action per step, and one observable check in its Expected result.
- Quote the exact on-screen text from the source: buttons, headings, messages — `Click "Sign in".`,
  `The message "Invalid email or password." is shown.`
- Expected results describe what is **visible or verifiable** (text, page, state, file, email),
  never "works correctly" or "as expected".
- Titles state behaviour, not a step list: "Login with a wrong password shows an error and stays
  on the login page", not "Test login 2".
- Each case is independent: its preconditions create or name everything it needs.
- Cover, per feature: the happy path, each validation rule, each role/permission difference, empty
  and boundary states, and error messages.

## 3. Data variants (same steps, different data)

When the same steps should run with several data sets (roles, invalid inputs, boundary values),
write **one** case and add a Data variants table after the Steps table. Row 1 is always the base
case described by the steps. Put the variant-specific expected result in Note.

```markdown
**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Empty email | User Guide §2.1 | "Email is required." |
| 2 | Email without @ | User Guide §2.1 | "Enter a valid email." |
| 3 | Email longer than 254 characters | — | Review; the guide gives no maximum length |
```

- The heading must start with `**Data variants` and the table headers must be exactly
  `# | Variant | Source | Note`. The count in the heading includes the base row.
- Each Variant label is short and unique within the case.

## 4. End-to-end flows (separate file)

Critical flows that chain several cases across features go in one extra file
`suites/e2e-critical-flows.md`. Every flow is P1 ★ and creates its own data.

```markdown
## E2E-01 · <Flow name>

**Why critical:** <one sentence on the business impact>

**Setup:** <data and accounts the flow needs>

| # | Step | Verify | Cases |
|---|---|---|---|
| 1 | Admin creates a user | "User created" toast, user in the list | USER-003 |
| 2 | The new user signs in | Dashboard shows the user's name | AUTH-001 |
```

The Cases column lists the catalogued case IDs that each step reuses. Mark those cases `@e2e`.

## 5. Full example

````markdown
# 01 · Login & Authentication

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
<!-- /generated:summary -->

## Test cases

### Sign in

#### ★ AUTH-001 · Login with valid credentials lands on the dashboard

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke | Auto-UI | Active | User Guide v1.0 §2.1 |

**Role:** Admin

**Preconditions:**

1. An active admin account exists.
2. The user is signed out.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the app. | | The sign-in page opens with the heading "Sign in". |
| 2 | Enter the email and password and click "Sign in". | Admin email and password | The dashboard opens and the header shows the admin's name. |

---

#### AUTH-002 · Login with an invalid email shows a field error and does not sign in

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.0 §2.1 |

**Role:** Visitor (signed out)

**Preconditions:**

1. The user is signed out.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the sign-in page. | | The page shows the Email and Password fields. |
| 2 | Enter the email of the variant and any password, then click "Sign in". | Email of the variant | The error for the variant is shown under Email and the page stays on sign-in. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Empty email | User Guide v1.0 §2.1 | "Email is required." |
| 2 | Email without @ | User Guide v1.0 §2.1 | "Enter a valid email." |

---

### Single sign-on

#### AUTH-003 · Sign-in with Microsoft opens the dashboard for a company account

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Manual — needs a real Microsoft company account with MFA | Review — the guide does not say what a non-company Microsoft account sees. Error page or redirect to sign-in? | User Guide v1.0 §2.3 |

**Role:** Staff

**Preconditions:**

1. A Microsoft company account assigned to Spark.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | On the sign-in page click "Sign in with Microsoft". | | The Microsoft sign-in page opens. |
| 2 | Complete the Microsoft sign-in. | Company account | Spark opens on the dashboard with the user's name in the header. |

---
````

## 6. Before you answer, check

- [ ] Every case heading matches `#### [★ ]PREFIX-nnn · Title`, and IDs are unique and in order.
- [ ] Every case has the 5-column property table, Role, Preconditions, a Steps table and a closing `---`.
- [ ] Every `Manual` has a reason and every `Review` has a question.
- [ ] `@smoke` only on P1, Active, automatable cases; `★` only on P1.
- [ ] No expected result was invented: anything the source does not state is `Review`.
- [ ] After the files, list: the feature files with their ID prefix and case counts, and all open
      `Review` questions, so the team can ask the product owner.
