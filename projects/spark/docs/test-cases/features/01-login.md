# 01 · Sign-in & Access

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
<!-- /generated:summary -->

## Test cases

### Sign-in

#### ★ AUTH-001 · Sign-in with a Yoma Group Microsoft account opens SPARK

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — the sign-in screen is not documented yet; confirm the screens with the automation account, then set Active and add @smoke | SPARK Business Logic §1, §15 Q2 |

**Role:** Employee

**Preconditions:**

1. The dedicated automation Microsoft account exists in the Yoma Group directory and can sign in without an interactive MFA prompt (or its TOTP secret is available to the test).
2. The user is signed out of SPARK.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the SPARK URL. | | The user is taken to Microsoft sign-in. |
| 2 | Complete the Microsoft sign-in. | Directory account | SPARK opens on Home. No SPARK password is asked for. |

---

#### AUTH-002 · First sign-in creates the SPARK user from the directory with read-only profile fields

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Manual — needs a directory account that has never signed in to SPARK | Active | SPARK Business Logic §5.1, §12.2 |

**Role:** Employee (first sign-in), then HR Admin

**Preconditions:**

1. A directory account exists with name, email, department, entity, manager and Employee ID, and has never signed in to SPARK.
2. An HR Admin with access to that entity is available.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Sign in to SPARK with the new directory account. | New directory account | SPARK opens on Home. |
| 2 | As HR Admin, open User management and search for the new user. | Name of the new user | The user is listed. |
| 3 | Open the user's details. | | Name, email, department, entity, manager and Employee ID match the directory. |
| 4 | Try to edit the name, email, department, entity, manager or Employee ID. | | These fields are read-only. |

---

#### AUTH-003 · A deactivated user cannot use SPARK

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — the documents do not say what a deactivated user sees when signing in (error page, message text, redirect?) | SPARK Business Logic §12.2 |

**Role:** Employee (deactivated)

**Preconditions:**

1. An employee account was deactivated by an HR Admin in User management.
2. The user is signed out.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Sign in to SPARK with the deactivated account. | Deactivated account | Home does not open and the user cannot reach any SPARK page. |

---

### Landing page by role

#### ★ AUTH-004 · After sign-in each role lands on its own start page

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke | Auto-UI | Active | SPARK Business Logic §3.1 |

**Role:** Role of the variant

**Preconditions:**

1. An active account with only the role of the variant exists.
2. The user is signed out.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Sign in with the account of the variant. | Account of the variant | The start page of the variant opens. |

**Data variants (6 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Employee | §3.1 | Home |
| 2 | Leader | §3.1 | Home |
| 3 | HR Admin | §3.1 | Admin overview |
| 4 | Finance Admin | §3.1 | Budget tracker |
| 5 | Group Admin | §3.1 | Group overview |
| 6 | HR Admin + Leader | — | Review; the start page for a person with several roles is not documented |

---

### Page access by role

#### AUTH-005 · Every role can open Home, Leaderboard, My Sparks, Notifications and Profile

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §3.1 |

**Role:** Role of the variant

**Preconditions:**

1. The user is signed in with only the role of the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Home. | | Home opens. |
| 2 | Open Leaderboard. | | Leaderboard opens. |
| 3 | Open My Sparks. | | My Sparks opens. |
| 4 | Open Notifications (the bell). | | The user's notification / email log opens. |
| 5 | Open Profile. | | The user's profile opens. |

**Data variants (5 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Employee | §3.1 | All five pages open |
| 2 | Leader | §3.1 | All five pages open |
| 3 | HR Admin | §3.1 | All five pages open |
| 4 | Finance Admin | §3.1 | All five pages open |
| 5 | Group Admin | §3.1 | All five pages open |

---

#### AUTH-006 · Admin overview, User management, Settings and Background jobs are open to HR Admin only

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — the documents do not say what a user without permission sees (menu item hidden, access-denied page, or redirect) when opening an admin page by URL | SPARK Business Logic §3.1 |

**Role:** Role of the variant

**Preconditions:**

1. The user is signed in with only the role of the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look for Admin overview, User management, Settings and Background jobs in the navigation. | | The pages are offered only to HR Admin. |
| 2 | Open each of the four pages by URL. | | HR Admin sees the page; other roles cannot see its content. |

**Data variants (5 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) HR Admin | §3.1 | All four pages open |
| 2 | Employee | §3.1 | No access |
| 3 | Leader | §3.1 | No access |
| 4 | Finance Admin | §3.1 | No access |
| 5 | Group Admin | §3.1 | No access |

---

### Entity-scoped admin access

#### ★ AUTH-007 · An entity-scoped admin sees only the people, budgets, awards and payroll of permitted entities

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §3.2 |

**Role:** Admin of the variant, with entity access limited to entity A

**Preconditions:**

1. Entities A and B each have at least one leader with a budget, one financial award in the open payroll month and one open fraud flag.
2. The admin of the variant has entity access to entity A only.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the page of the variant. | | Only records of entity A are listed; nothing from entity B is shown. |
| 2 | Open any entity selector on the page. | | Entity B is not offered. |

**Data variants (6 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) HR Admin · User management | §3.2 | Only entity A people |
| 2 | HR Admin · Budget tracker | §3.2 | Only entity A leaders |
| 3 | HR Admin · Fraud queue | §3.2 | Only entity A flags and blocked attempts |
| 4 | HR Admin · Payroll export | §3.2 | Only entity A payroll months |
| 5 | Finance Admin · Budget tracker | §3.2 | Only entity A leaders |
| 6 | Finance Admin · Payroll export | §3.2 | Only entity A payroll months |

---
