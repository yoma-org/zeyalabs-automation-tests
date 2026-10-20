# 03 · Create My Farewell Page

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 9 (+4 data-variant rows)  
**Priority:** P1 1 · P2 4 · P3 4 · **★ Critical:** 1 · **Smoke:** 0 · **E2E:** 1 · **Auto:** 9 · **Manual:** 0 · **Review:** 4

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [CRT-001](#crt-001--an-employee-without-a-page-sees-the-create-my-farewell-page-box-with-field-and-hint) | An employee without a page sees the "Create my farewell page" box with field and hint | Who sees the box | P2 | — | Auto-UI | Active |  |
| [CRT-002](#crt-002--a-leaver-does-not-see-the-box-and-has-your-farewell-page-instead) | A leaver does not see the box and has "Your farewell page" instead | Who sees the box | P2 | — | Auto-UI | Active | 2 |
| [CRT-003](#crt-003--the-top-bar-create-my-farewell-page-button-scrolls-down-to-the-box) | The top-bar "Create my farewell page" button scrolls down to the box | Who sees the box | P3 | — | Auto-UI | Active |  |
| [CRT-004](#crt-004--creating-a-page-without-a-last-working-day-is-refused) | Creating a page without a last working day is refused | Last working day rules | P3 | — | Auto-UI | Active |  |
| [CRT-005](#crt-005--a-last-working-day-of-today-or-earlier-is-refused) | A last working day of today or earlier is refused | Last working day rules | P3 | — | Auto-UI | Review | 3 |
| [CRT-006](#-crt-006--an-employee-creates-a-page-with-a-future-date-and-the-builder-opens-as-draft) | ★ An employee creates a page with a future date and the builder opens as Draft | Creating the page | P1 | @e2e | Auto-UI | Review | 2 |
| [CRT-007](#crt-007--after-creating-the-wall-shows-your-farewell-page-and-the-leaver-draft-subtitle) | After creating, the wall shows "Your farewell page" and the leaver draft subtitle | Creating the page | P2 | — | Auto-UI | Review |  |
| [CRT-008](#crt-008--name-and-company-come-from-the-employee-list-job-title-and-department-are-editable) | Name and company come from the Employee List; job title and department are editable | Creating the page | P2 | — | Auto-UI | Review |  |
| [CRT-009](#crt-009--creating-a-second-page-shows-you-already-have-a-farewell-page) | Creating a second page shows "You already have a farewell page…" | Creating the page | P3 | — | Auto-UI | Active |  |
<!-- /generated:summary -->

## Test cases

### Who sees the box

#### CRT-001 · An employee without a page sees the "Create my farewell page" box with field and hint

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §4 (FW-003) |

**Role:** Employee

**Preconditions:**

1. An Employee without a farewell page is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall and find the box under the greeting. | | The box reads "Create my farewell page" and "Test phase — make your own page without waiting for your People team." |
| 2 | Look at the form in the box. | | It has the date field "Your last working day" (required) and the button "Create my farewell page". |
| 3 | Read the hint. | | It reads "It has to be a real date still ahead of today. Your name and company come from your employee record; you can edit your job title and department in the builder." |

---

#### CRT-002 · A leaver does not see the box and has "Your farewell page" instead

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §4 |

**Role:** Leaver

**Preconditions:**

1. A leaver in the state of the variant is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall. | | No "Create my farewell page" box is shown. |
| 2 | Look at the top bar. | | It shows "Your farewell page", not "Create my farewell page". |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Leaver, draft | User Guide v1.1 §1 | Subtitle "Leaver · Wave Money · draft" |
| 2 | Leaver, published | User Guide v1.1 §1 | Subtitle "Live leaver · Wave Money · published" |

---

#### CRT-003 · The top-bar "Create my farewell page" button scrolls down to the box

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §4 (FW-003) |

**Role:** Employee

**Preconditions:**

1. An Employee without a farewell page is signed in, on the Alumni Wall, scrolled to the bottom.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Create my farewell page" in the top bar. | | The page scrolls to the box; the field "Your last working day" is in view. |

---

### Last working day rules

#### CRT-004 · Creating a page without a last working day is refused

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §4 (FW-003) |

**Role:** Employee

**Preconditions:**

1. A fresh Employee without a farewell page is signed in, on the Alumni Wall.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Leave "Your last working day" empty and click "Create my farewell page" in the box. | (empty) | No page is created: the builder does not open, the field is marked as required, and the top bar still shows "Create my farewell page". |

---

#### CRT-005 · A last working day of today or earlier is refused

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — the guide gives the rule but not the error text shown for a date that is not after today | User Guide v1.1 §4 (FW-003) |

**Role:** Employee

**Preconditions:**

1. A fresh Employee without a farewell page is signed in, on the Alumni Wall.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Enter the date of the variant in "Your last working day". | Date of the variant | The date is entered (or the picker does not allow it). |
| 2 | Click "Create my farewell page" in the box. | | No page is created: the builder does not open, a message says the date must be after today, and the top bar still shows "Create my farewell page". |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) today | User Guide v1.1 §4 | Boundary: must be after today |
| 2 | yesterday | User Guide v1.1 §4 | |
| 3 | one year ago | User Guide v1.1 §14 | |

---

### Creating the page

#### ★ CRT-006 · An employee creates a page with a future date and the builder opens as Draft

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Review — not carried out on the test site because it creates a page (Requires Verification §4) | User Guide v1.1 §4 (FW-003) |

**Role:** Employee

**Preconditions:**

1. A fresh Employee without a farewell page and without a departure is signed in, on the Alumni Wall (the test creates its own employee, e.g. via the Employee List import).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Choose a date after today in "Your last working day". | Tomorrow | The date is shown in the field. |
| 2 | Click "Create my farewell page" in the box. | | The builder opens at "1 Choose your style". |
| 3 | Read the top bar. | | It shows "Draft · last day <date>" with the chosen date (for example "Draft · last day 19 Oct 2026"). |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) tomorrow | User Guide v1.1 §4 | Boundary: first day after today |
| 2 | about three months ahead | User Guide v1.1 §4 | |

---

#### CRT-007 · After creating, the wall shows "Your farewell page" and the leaver draft subtitle

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — depends on page creation, not carried out on the test site (Requires Verification §4) | User Guide v1.1 §4 |

**Role:** Leaver

**Preconditions:**

1. A fresh Employee of Wave Money has just created a page with "Create my farewell page" (CRT-006).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click the logo to return to the Alumni Wall. | | The "Create my farewell page" box is gone and the top bar shows "Your farewell page". |
| 2 | Open the account menu. | | The subtitle reads "Leaver · Wave Money · draft". |
| 3 | Look for the person on the wall. | | No card for them is shown: a draft is visible only to the leaver. |

---

#### CRT-008 · Name and company come from the Employee List; job title and department are editable

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — depends on page creation, not carried out on the test site (Requires Verification §4) | User Guide v1.1 §4 |

**Role:** Leaver

**Preconditions:**

1. A fresh employee was imported in the Employee List with a known name, company, job title and department.
2. That employee has just created a page with "Create my farewell page".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open builder step "2 Write a message" and look at the details. | | The name and company match the Employee List and cannot be edited. |
| 2 | Change the job title and the department. | New title / new department | The changes are accepted and the save bar shows they are saved. |

---

#### CRT-009 · Creating a second page shows "You already have a farewell page…"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §4 |

**Role:** Employee

**Preconditions:**

1. A fresh Employee without a farewell page is signed in.
2. The Alumni Wall is open in two tabs, both showing the "Create my farewell page" box.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | In tab 1, choose a date after today and click "Create my farewell page". | Tomorrow | The builder opens with "Draft · last day <date>". |
| 2 | In tab 2 (not reloaded), choose a date after today and click "Create my farewell page". | Tomorrow + 1 | The error "You already have a farewell page. Open the builder to work on it." is shown and no second page is created. |
| 3 | Click "Your farewell page" in the top bar after a reload. | | The builder opens the page created in step 1. |

---
