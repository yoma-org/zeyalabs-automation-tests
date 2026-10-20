# 01 · Access & Accounts

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 14 (+12 data-variant rows)  
**Priority:** P1 6 · P2 3 · P3 5 · **★ Critical:** 2 · **Smoke:** 1 · **E2E:** 0 · **Auto:** 13 · **Manual:** 1 · **Review:** 6 · **Obsolete:** 1

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [ACC-001](#-acc-001--each-role-lands-on-the-alumni-wall-with-its-own-top-bar-button-and-subtitle) | ★ Each role lands on the Alumni Wall with its own top-bar button and subtitle | Roles and top bar | P1 | — | Auto-UI | Review | 5 |
| [ACC-002](#acc-002--on-a-phone-the-employee-button-reads-create-page-and-the-logo-words-are-hidden) | On a phone the employee button reads "Create page" and the logo words are hidden | Roles and top bar | P3 | — | Auto-UI | Review |  |
| [ACC-003](#acc-003--the-logo-and-home-icon-return-to-the-alumni-wall-from-any-page) | The logo and home icon return to the Alumni Wall from any page | Roles and top bar | P3 | — | Auto-UI | Active | 3 |
| [ACC-004](#acc-004--admin-opens-the-people-console-at-departures) | "Admin" opens the People console at Departures | Roles and top bar | P2 | — | Auto-UI | Active | 2 |
| [ACC-005](#acc-005--the-footer-shows-the-group-line-and-the-90-day-rule-on-every-page) | The footer shows the Group line and the 90-day rule on every page | Roles and top bar | P3 | — | Auto-UI | Review | 2 |
| [ACC-006](#-acc-006--choosing-an-account-from-the-menu-reloads-the-wall-as-that-person) | ★ Choosing an account from the menu reloads the wall as that person | Test-site account switcher | P1 | @smoke | Auto-UI | Active |  |
| [ACC-007](#acc-007--the-account-menu-shows-the-signed-in-person-role-pill-groups-and-a-tick-on-the-current-account) | The account menu shows the signed-in person, role pill, groups and a tick on the current account | Test-site account switcher | P2 | — | Auto-UI | Active |  |
| [ACC-008](#acc-008--searching-the-account-menu-narrows-the-list-by-name-email-or-company) | Searching the account menu narrows the list by name, email or company | Test-site account switcher | P2 | — | Auto-UI | Review | 3 |
| [ACC-009](#acc-009--a-search-with-no-match-shows-no-account-matches) | A search with no match shows "No account matches." | Test-site account switcher | P3 | — | Auto-UI | Review |  |
| [ACC-010](#acc-010--accounts-that-cannot-be-used-are-greyed-out-with-their-reason) | Accounts that cannot be used are greyed out with their reason | Test-site account switcher | P1 | — | Auto-UI | Active | 3 |
| [ACC-011](#acc-011--signed-out-the-account-menu-reads-choose-an-account-with-the-test-phase-note) | Signed out, the account menu reads "Choose an account" with the test-phase note | Test-site account switcher | P3 | — | Auto-UI | Active |  |
| [ACC-012](#acc-012--a-signed-out-user-opening-the-alumni-wall-is-sent-to-the-sign-in-page) | A signed-out user opening the Alumni Wall is sent to the sign-in page | Sign-in and protection | P1 | — | Auto-UI | Active |  |
| [ACC-013](#acc-013--production-sign-in-uses-microsoft-sso-and-exposes-no-password-or-password-reset) | Production sign-in uses Microsoft SSO and exposes no password or password reset | Sign-in and protection | P1 | — | Manual | Review |  |
| [ACC-014](#acc-014--signing-in-with-email-and-password-on-the-test-site-opens-the-alumni-wall) | Signing in with email and password on the test site opens the Alumni Wall | Sign-in and protection | P1 | — | Auto-UI | Obsolete |  |
<!-- /generated:summary -->

## Test cases

### Roles and top bar

#### ★ ACC-001 · Each role lands on the Alumni Wall with its own top-bar button and subtitle

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — app (18 Oct 2026): employees without a page have no "Create my farewell page" button in the top bar, and the pill under the name reads "Leaver" / "Live leaver" / "Wave Money admin" (the "Employee · Wave Money · no page yet" subtitle is only in the menu rows). Guide or app wrong? | User Guide v1.1 §1 (FW-004) |

**Role:** Employee, Leaver, Company admin, Platform admin

**Preconditions:**

1. The test site is open and the account for the variant exists (see Data variants).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the account menu (avatar and chevron at the top right) and click the account for the variant. | Account of the variant role | The page reloads on the Alumni Wall with the heading "Alumni Wall". |
| 2 | Look at the button on the right of the top bar. | | It shows the button for the variant: "Create my farewell page", "Your farewell page" or "Admin". |
| 3 | Open the account menu and read the subtitle under the name. | | It shows the subtitle for the variant. |

**Data variants (5 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Employee, no page | User Guide v1.1 §1 | Button "Create my farewell page"; subtitle "Employee · Wave Money · no page yet" |
| 2 | Leaver, draft | User Guide v1.1 §1 | Button "Your farewell page"; subtitle "Leaver · Wave Money · draft" |
| 3 | Leaver, published | User Guide v1.1 §1 | Button "Your farewell page"; subtitle "Live leaver · Wave Money · published" |
| 4 | Company admin | User Guide v1.1 §1 | Button "Admin"; subtitle "Wave Money admin" |
| 5 | Platform admin | User Guide v1.1 §1 | Button "Admin"; subtitle "Platform admin · all entities" |

---

#### ACC-002 · On a phone the employee button reads "Create page" and the logo words are hidden

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — app (18 Oct 2026): at 390 px there is no "Create page" button for an employee. Guide or app wrong? | User Guide v1.1 §1 (FW-009) |

**Role:** Employee

**Preconditions:**

1. An Employee without a farewell page is signed in.
2. The browser viewport is phone size (for example 390 × 844).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall and look at the top bar. | | The button on the right reads "Create page". |
| 2 | Look at the logo on the left. | | The home icon is shown; the words "Yoma Farewell" / "YOMA GROUP" are hidden. |

---

#### ACC-003 · The logo and home icon return to the Alumni Wall from any page

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §1 |

**Role:** Leaver, Company admin

**Preconditions:**

1. The account for the variant is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Go to the start page of the variant. | Start page of the variant | The page opens. |
| 2 | Click the logo "Yoma Farewell" / "YOMA GROUP" with the home icon. | | The Alumni Wall opens with the heading "Alumni Wall". |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) leaver in the builder | User Guide v1.1 §1 | Leaver clicks "Your farewell page" first |
| 2 | admin in the People console | User Guide v1.1 §1 | Company admin clicks "Admin" first |
| 3 | a farewell page as a reader | User Guide v1.1 §1 | Open a Live leaver's page from the wall first |

---

#### ACC-004 · "Admin" opens the People console at Departures

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §1 |

**Role:** Company admin, Platform admin

**Preconditions:**

1. The admin account for the variant is signed in and on the Alumni Wall.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Admin" in the top bar. | | The People console opens at "Departures". |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Company admin | User Guide v1.1 §1 | e.g. "Wave Money admin" |
| 2 | Platform admin | User Guide v1.1 §1 | "Platform admin · all entities" |

---

#### ACC-005 · The footer shows the Group line and the 90-day rule on every page

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — app (18 Oct 2026): farewell pages (/p/…) have no footer; the wall and /login have it. Should every page show the footer? | User Guide v1.1 §1 |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the page of the variant and scroll to the footer. | Page of the variant | The footer reads "Yoma Farewell · Yoma Group — Wave Money, Yoma Bank and other Group entities". |
| 2 | Read the second footer line. | | It reads "Pages leave the wall 90 days after the last working day." |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Alumni Wall | User Guide v1.1 §1 | |
| 2 | a Live farewell page | User Guide v1.1 §1 | Opened from a wall card |

---

### Test-site account switcher

#### ★ ACC-006 · Choosing an account from the menu reloads the wall as that person

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke | Auto-UI | Active | User Guide v1.1 §2 (FW-004) |

**Role:** Employee

**Preconditions:**

1. Any account is signed in on the test site.
2. Another active Employee account exists (for example "Min Khant").

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click the avatar and chevron at the top right. | | The account menu opens with "SWITCH ACCOUNT". |
| 2 | Click the other person's name. | Min Khant | The page reloads on the Alumni Wall. |
| 3 | Read the greeting and the avatar. | | The greeting reads "Hi Min Khant 👋" and the avatar shows the new initials. |

---

#### ACC-007 · The account menu shows the signed-in person, role pill, groups and a tick on the current account

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §2 (FW-004) |

**Role:** Employee

**Preconditions:**

1. An Employee account is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click the avatar and chevron at the top right. | | The menu shows the person's initials, full name, work email and the role pill "Employee". |
| 2 | Read the groups under "SWITCH ACCOUNT". | | After the search box the groups are "PLATFORM ADMINS", "WAVE MONEY ADMINS", "YOMA BANK ADMINS", "YOMA GROUP ADMINS", "LEAVERS" and "EMPLOYEES", in that order. |
| 3 | Find the signed-in account in the list. | | It is marked with "✓"; no other account is. |

---

#### ACC-008 · Searching the account menu narrows the list by name, email or company

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — app (18 Oct 2026): no "×" button; the search is a native search box (cleared with Esc or the browser’s own clear icon). Is a "×" button required? | User Guide v1.1 §2 (FW-007) |

**Role:** Employee

**Preconditions:**

1. Any account is signed in and the account menu is open.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type the search text into "Search by name, email or company". | Search text of the variant | As you type, only accounts that match the text are listed. |
| 2 | Click "×". | | The search is cleared and all groups are listed again. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) part of a name | User Guide v1.1 §2 (FW-007) | e.g. "Naing" |
| 2 | part of an email | User Guide v1.1 §2 | e.g. part before "@" of a seeded account |
| 3 | company name | User Guide v1.1 §2 | e.g. "Yoma Bank" |

---

#### ACC-009 · A search with no match shows "No account matches."

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — app (18 Oct 2026): no "×" button (native search box). Is a "×" button required? | User Guide v1.1 §2 (FW-007) |

**Role:** Employee

**Preconditions:**

1. Any account is signed in and the account menu is open.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type text that matches no account in "Search by name, email or company". | zzqx-no-such-person | The list is empty and shows "No account matches." |
| 2 | Click "×". | | The search box is empty and the accounts are listed again. |

---

#### ACC-010 · Accounts that cannot be used are greyed out with their reason

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §2 (FW-004) |

**Role:** Employee

**Preconditions:**

1. Any account is signed in.
2. An account in the state of the variant exists.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the account menu and find the account of the variant. | Account of the variant | The account is greyed out and shows the reason for the variant. |
| 2 | Click the greyed-out account. | | Nothing changes: the signed-in account and the greeting stay the same. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) disabled employee | User Guide v1.1 §2 | Reason "Account disabled" |
| 2 | deleted from the Employee List | User Guide v1.1 §2 | Reason "Removed from the Employee List" |
| 3 | last working day passed | User Guide v1.1 §2 | Reason "Last working day reached" |

---

#### ACC-011 · Signed out, the account menu reads "Choose an account" with the test-phase note

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §2 (FW-008) |

**Role:** Visitor

**Preconditions:**

1. A new browser session with no account chosen (no cookies or storage).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the test site and open the account menu at the top right. | | The title reads "Choose an account". |
| 2 | Read the text under the title. | | It reads "Test phase — pick any account on this test site. There is no password while this is on." |

---

### Sign-in and protection

#### ACC-012 · A signed-out user opening the Alumni Wall is sent to the sign-in page

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §2 (FW-008) |

**Role:** Visitor

**Preconditions:**

1. A new browser session with no account chosen (no cookies or storage).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall address directly. | | The sign-in page opens instead of the wall; no leaver cards are shown. |
| 2 | Choose an account from the account menu. | Any active Employee | The Alumni Wall opens with "Hi <Name> 👋". |

---

#### ACC-013 · Production sign-in uses Microsoft SSO and exposes no password or password reset

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Manual — Microsoft SSO, production-only (not on the test site) | Review — SSO is planned for the AWS go-live; Microsoft sign-in and sign-out screens not yet available (Appendix C #1) | UAT Feedback (UAT-003) |

**Role:** Employee

**Preconditions:**

1. The production (or staging) app with Microsoft sign-in switched on.
2. A real Yoma Group Microsoft account.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the app while signed out. | | The sign-in page offers "Sign in with Microsoft"; there is no account switcher, password field or password-reset link. |
| 2 | Click "Sign in with Microsoft" and complete the Microsoft sign-in. | Yoma Group account | The Alumni Wall opens with "Hi <Name> 👋". |
| 3 | Click "Sign out". | | "You're signed out" is shown, and opening the wall sends you to sign-in again. |

---

#### ACC-014 · Signing in with email and password on the test site opens the Alumni Wall

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Obsolete | User Guide v1.1 §2 (FW-008) |

**Role:** Employee

**Preconditions:**

1. A new browser session with no account signed in.
2. A test account with an email and password exists on https://farewell-wall-beryl.vercel.app.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open https://farewell-wall-beryl.vercel.app/login. | | A sign-in form with email and password fields is shown. |
| 2 | Enter the email and password and submit. | Test account credentials (from env, never in the repo) | The Alumni Wall opens with "Hi <Name> 👋" and the account's role button in the top bar. |

---
