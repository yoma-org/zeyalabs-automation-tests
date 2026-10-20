# 14 · Roles & Permissions

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 13 (+25 data-variant rows)  
**Priority:** P1 13 · P2 0 · P3 0 · **★ Critical:** 2 · **Smoke:** 1 · **E2E:** 0 · **Auto:** 13 · **Manual:** 0 · **Review:** 6

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [PERM-001](#-perm-001--top-bar-shows-admin-only-to-admins) | ★ Top bar shows "Admin" only to admins | Admin console access | P1 | @smoke | Auto-UI | Active | 5 |
| [PERM-002](#perm-002--opening-the-admin-console-url-directly-is-refused-to-non-admins) | Opening the admin console URL directly is refused to non-admins | Admin console access | P1 | — | Auto-UI | Review | 4 |
| [PERM-003](#perm-003--admin-backend-calls-are-refused-for-employee-and-leaver-sessions) | Admin backend calls are refused for Employee and Leaver sessions | Admin console access | P1 | — | Auto-UI+API | Review | 5 |
| [PERM-004](#-perm-004--company-admin-sees-only-their-own-company-on-every-console-tab) | ★ Company admin sees only their own company on every console tab | Company scope | P1 | — | Auto-UI | Active | 3 |
| [PERM-005](#perm-005--company-admin-cannot-record-a-departure-in-another-company) | Company admin cannot record a departure in another company | Company scope | P1 | — | Auto-UI+API | Review |  |
| [PERM-006](#perm-006--company-admin-cannot-change-another-companys-employees-or-admins) | Company admin cannot change another company's employees or admins | Company scope | P1 | — | Auto-UI+API | Review | 5 |
| [PERM-007](#perm-007--company-admin-gets-no-platform-admin-controls) | Company admin gets no Platform-admin controls | Company scope | P1 | — | Auto-UI | Active |  |
| [PERM-008](#perm-008--platform-admin-can-switch-to-every-company-on-each-console-tab) | Platform admin can switch to every company on each console tab | Company scope | P1 | — | Auto-UI | Active | 3 |
| [PERM-009](#perm-009--a-visitor-without-sign-in-can-open-a-live-page-link) | A visitor without sign-in can open a live page link | Pages and the wall | P1 | — | Auto-UI | Active |  |
| [PERM-010](#perm-010--a-visitor-without-sign-in-is-sent-to-sign-in-from-the-alumni-wall) | A visitor without sign-in is sent to sign-in from the Alumni Wall | Pages and the wall | P1 | — | Auto-UI | Active |  |
| [PERM-011](#perm-011--only-the-leaver-can-open-the-builder-of-their-own-page) | Only the leaver can open the builder of their own page | Pages and the wall | P1 | — | Auto-UI | Review | 4 |
| [PERM-012](#perm-012--a-draft-page-is-not-visible-to-colleagues-before-publishing) | A draft page is not visible to colleagues before publishing | Pages and the wall | P1 | — | Auto-UI | Review |  |
| [PERM-013](#perm-013--create-my-farewell-page-is-offered-only-to-an-employee-without-a-page) | "Create my farewell page" is offered only to an employee without a page | Pages and the wall | P1 | — | Auto-UI | Active | 4 |
<!-- /generated:summary -->

## Test cases

### Admin console access

#### ★ PERM-001 · Top bar shows "Admin" only to admins

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke | Auto-UI | Active | User Guide v1.1 §1 |

**Role:** Employee, Leaver, Company admin, Platform admin

**Preconditions:**

1. An account of the variant's role is signed in and on the Alumni Wall.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look at the button on the right of the top bar. | | It is the variant's button; "Admin" is shown only for the admin roles. |
| 2 | Open the account menu and read the subtitle. | | It is the variant's subtitle. |

**Data variants (5 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Employee without a page | User Guide v1.1 §1 | "Create my farewell page"; "Employee · Wave Money · no page yet"; no "Admin". |
| 2 | Leaver, draft | User Guide v1.1 §1 | "Your farewell page"; "Leaver · Wave Money · draft"; no "Admin". |
| 3 | Leaver, published | User Guide v1.1 §1 | "Your farewell page"; "Live leaver · Wave Money · published"; no "Admin". |
| 4 | Company admin | User Guide v1.1 §1 | "Admin"; "Wave Money admin". |
| 5 | Platform admin | User Guide v1.1 §1 | "Admin"; "Platform admin · all entities". |

---

#### PERM-002 · Opening the admin console URL directly is refused to non-admins

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — the guide does not say what a non-admin sees at the console address (redirect to the wall, a refusal message, or a 404)? | UAT Feedback (UAT-005) |

**Role:** Visitor, Employee, Leaver

**Preconditions:**

1. The console addresses for "Departures", "Employee List" and "Admins" are known (taken from an admin session).
2. An account of the variant's role is signed in (or nobody, for Visitor).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open each console address directly. | | The console is not shown: no departures, employees or admins of any company are visible. |
| 2 | Look at where the browser ends up. | | Visitor: the sign-in page. Others: outside the console (for example the Alumni Wall). |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Employee | UAT Feedback (UAT-005) | |
| 2 | Leaver, draft | User Guide v1.1 §1 | |
| 3 | Leaver, published | User Guide v1.1 §1 | |
| 4 | Visitor, not signed in | User Guide v1.1 §3 | |

---

#### PERM-003 · Admin backend calls are refused for Employee and Leaver sessions

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI+API | Review — API not documented yet; which endpoints and which refusal (status code / message)? | UAT Feedback (UAT-005) |

**Role:** Employee, Leaver

**Preconditions:**

1. An Employee and a Leaver are signed in, each in its own browser context (sessions reused for API calls).
2. The admin backend calls are known from an admin session.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | With each session, call the admin action of the variant. | | The call is refused and returns no other person's data. |
| 2 | As a Platform admin, check the target data. | | Nothing changed. |

**Data variants (5 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) list the Employee List | UAT Feedback (UAT-005) | |
| 2 | export the Employee List CSV | User Guide v1.1 §1 | |
| 3 | record or trigger a departure | User Guide v1.1 §1 | |
| 4 | hide a message on another leaver's page | User Guide v1.1 §1 | |
| 5 | add a company admin | User Guide v1.1 §1 | |

---

### Company scope

#### ★ PERM-004 · Company admin sees only their own company on every console tab

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | UAT Feedback (UAT-005) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in.
2. Other companies (for example Yoma Bank) have departures, employees and admins.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Admin" and open the variant's tab. | | Only the "Wave Money" company chip is shown; there is no "Platform" chip and no other company chip. |
| 2 | Look at the rows. | | Every row belongs to Wave Money; no Yoma Bank or other company's person or admin appears. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) "Departures" | User Guide v1.1 §10 (FW-050) | Heading "Departures · Wave Money". |
| 2 | "Employee List" | User Guide v1.1 §12 | |
| 3 | "Admins" | User Guide v1.1 §13 (FW-059) | |

---

#### PERM-005 · Company admin cannot record a departure in another company

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI+API | Review — API not documented yet; the UI offers only own-company people, so the refusal is provoked by calling the backend. | User Guide v1.1 §10 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in (session reused for API calls).
2. A Yoma Bank person without a departure exists.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Record a last working day for the Yoma Bank person with the company admin's session. | a date after today | It is refused with "You can't record departures in that entity." |
| 2 | As a Platform admin, open "Departures" for Yoma Bank. | | No departure was recorded for that person. |

---

#### PERM-006 · Company admin cannot change another company's employees or admins

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI+API | Review — API not documented yet, and the guide gives no refusal text for these actions in another company. | UAT Feedback (UAT-005) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in (session reused for API calls).
2. Yoma Bank has an "Active" employee and a company admin.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Call the variant's action on Yoma Bank with the company admin's session. | | It is refused; no Yoma Bank data is returned or changed. |
| 2 | As a Platform admin, open the Yoma Bank chip on the matching tab. | | Nothing changed. |

**Data variants (5 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) import employees into Yoma Bank | User Guide v1.1 §12 | |
| 2 | export Yoma Bank's Employee List | UAT Feedback (UAT-005) | |
| 3 | disable a Yoma Bank employee | User Guide v1.1 §12 | |
| 4 | trigger a Yoma Bank departure | User Guide v1.1 §10 | |
| 5 | remove a Yoma Bank admin | User Guide v1.1 §13 | |

---

#### PERM-007 · Company admin gets no Platform-admin controls

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §13 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Admins".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look at the chips and the table. | | No "Platform" chip; no "Change role" in any row. |
| 2 | Look at "Add an admin". | | No "ROLE" or "COMPANY" choice; the role is fixed as "Wave Money admin". |

---

#### PERM-008 · Platform admin can switch to every company on each console tab

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | UAT Feedback (UAT-005) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Admin" and open the variant's tab. | | Chips for every company are shown ("Platform" too on "Admins"), with "PLATFORM ADMIN". |
| 2 | Click each company chip in turn. | Wave Money, Yoma Bank, Yoma Group, Yoma Land, Yoma Strategic | The view switches to that company (on "Departures" the heading reads "Departures · <Company>") and shows only its rows. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) "Departures" | User Guide v1.1 §10 (FW-069) | |
| 2 | "Employee List" | User Guide v1.1 §12 | Yoma Land shows the inactive-company note. |
| 3 | "Admins" | User Guide v1.1 §13 (FW-060) | |

---

### Pages and the wall

#### PERM-009 · A visitor without sign-in can open a live page link

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §8 (FW-020) |

**Role:** Visitor

**Preconditions:**

1. A departure in status "Live" with the message window open exists, and its page link is known.
2. The browser context has no sign-in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the page link. | | The farewell page opens in the leaver's theme with the name and farewell; no sign-in is asked for. |
| 2 | Look at the top bar and page. | | "Share" and the theme's message button (for example "Leave a message") are shown. |

---

#### PERM-010 · A visitor without sign-in is sent to sign-in from the Alumni Wall

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §3 |

**Role:** Visitor

**Preconditions:**

1. The browser context has no sign-in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the app's home address (the Alumni Wall). | | The sign-in page is shown ("Choose an account" on the test site); no leaver cards are visible. |

---

#### PERM-011 · Only the leaver can open the builder of their own page

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — the builder address and what others see there are not documented; does an admin get read-only access? | User Guide v1.1 §5 |

**Role:** Leaver, Employee, Company admin, Visitor

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") exists, and the builder address is known from their session.
2. An account of the variant's role is signed in (or nobody, for Visitor).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the leaver's builder address. | | The builder for that leaver's page is not shown and nothing can be edited. |
| 2 | As the leaver, open "Your farewell page". | | The leaver's own builder opens with their page state, for example "Draft · last day <date>". |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) another leaver | User Guide v1.1 §5 | They see their own page, not this one. |
| 2 | Employee | User Guide v1.1 §1 | |
| 3 | Company admin of the same company | User Guide v1.1 §1 | Admins use "View draft", not the builder. |
| 4 | Visitor, not signed in | User Guide v1.1 §1 | Sent to the sign-in page. |

---

#### PERM-012 · A draft page is not visible to colleagues before publishing

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — §15 says only the leaver can see a draft, but admins have "View draft"; what does a colleague see at a draft's page address? | User Guide v1.1 §15 |

**Role:** Employee, Visitor, Company admin

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") exists and their page address is known.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As an Employee, look at the Alumni Wall and open the page address. | | No card for the leaver; the draft is not shown. |
| 2 | As a Visitor, open the page address. | | The draft is not shown. |
| 3 | As a company admin of the same company, click "View draft" in "Departures". | | The draft opens. |

---

#### PERM-013 · "Create my farewell page" is offered only to an employee without a page

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §4 (FW-003) |

**Role:** Employee, Leaver, Company admin, Platform admin

**Preconditions:**

1. An account of the variant's role is signed in and on the Alumni Wall.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look at the top bar and below the wall heading. | | The "Create my farewell page" button and box are shown only for the variant marked "shown". |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Employee without a page | User Guide v1.1 §4 (FW-003) | Shown, with "Your last working day". |
| 2 | Leaver, draft | User Guide v1.1 §4 | Not shown; "Your farewell page" instead. |
| 3 | Company admin | User Guide v1.1 §1 | Not shown; "Admin" instead. |
| 4 | Platform admin | User Guide v1.1 §1 | Not shown; "Admin" instead. |

---
