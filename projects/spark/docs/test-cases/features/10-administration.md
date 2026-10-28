# 10 · Administration

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
<!-- /generated:summary -->

## Test cases

### Settings

#### ADMIN-001 · Settings lists 27 settings in 5 categories

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §12.1 |

**Role:** HR Admin

**Preconditions:**

1. The HR Admin has access to entity A.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Settings for entity A and the category of the variant. | | The category shows the number of settings in Note. |

**Data variants (5 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Award limits | §12.1 | 3 (monthly allowance, shortest and longest message) |
| 2 | Budget | §12.1 | 5 |
| 3 | Fraud | §12.1 | 13 (12 rules + Self allocation) |
| 4 | Notifications | §12.1 | 1 |
| 5 | Display | §12.1 | 5 |

---

#### ★ ADMIN-002 · A settings change needs a reason, takes effect at once and is versioned

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §1, §12.1, §13 |

**Role:** HR Admin, then Employee

**Preconditions:**

1. Entity A uses the default longest message of 300 characters.
2. Employee S in entity A has peer allowance left.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, set the longest message for entity A to 200 and save with a reason. | 200; reason "Shorter messages" | The value 200 is saved and shows the "Changed" badge. |
| 2 | Open the history of the setting. | | The change is listed with the new value, version, reason, user and time. |
| 3 | As S, open "Send recognition" and enter a 201-character message. | 201 characters | The length error is shown and "Spread the spark" is disabled. |
| 4 | As S, open Rules and limits. | | The longest message shows 200. |

---

#### ADMIN-003 · A settings change applies only to the selected entity

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §12.1 |

**Role:** HR Admin, then Leader

**Preconditions:**

1. Entities A and B use the default minimum award of 5,000 MMK.
2. Leader LB in entity B has budget left.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, set the minimum award of entity A to 8,000 with a reason. | 8,000 | The setting is saved for entity A. |
| 2 | Open Settings for entity B. | | The minimum award of entity B is still 5,000 with no "Changed" badge. |
| 3 | As LB, send a 5,000 MMK award to a direct report with a message longer than 40 characters. | 5,000 | "Spark sent!" is shown. |

---

#### ADMIN-004 · A settings change without a reason is not saved

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — is the save button disabled or is a message shown when the reason is empty? | SPARK Business Logic §12.1 |

**Role:** HR Admin

**Preconditions:**

1. The HR Admin has access to entity A.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Change the monthly allowance of entity A to 4 and try to save without a reason. | 4; empty reason | The change is not saved and the value stays 5. |

---

### User management

#### ADMIN-005 · HR gives a user the Leader role and the user gets My Team

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §3.1, §12.2 |

**Role:** HR Admin, then Employee

**Preconditions:**

1. Employee E has only the Employee role and has direct reports in the directory.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, open E in User management, add the Leader role and save. | Leader | E's roles show Employee and Leader. |
| 2 | As E, reload SPARK. | | My Team is available. |

---

#### ★ ADMIN-006 · An HR Admin cannot change their own roles or entity access

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — are the controls hidden or disabled on the admin's own record, and is a message shown? | SPARK Business Logic §3.4 |

**Role:** HR Admin

**Preconditions:**

1. HR Admin H is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open H's own record in User management. | | H's roles cannot be changed. |
| 2 | Look at H's entity access. | | H's entity access cannot be changed. |

---

#### ★ ADMIN-007 · SPARK always keeps at least one active HR Admin

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — how can the last HR Admin be removed at all (only by acting on their own record, or also via the directory)? The refusal message is not documented | SPARK Business Logic §3.4 |

**Role:** HR Admin

**Preconditions:**

1. HR Admin H1 is the only active HR Admin.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As H1, try the action of the variant on H1's own record in User management. | | The action is refused. |
| 2 | Reload User management. | | H1 is still an active HR Admin. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Deactivate | §3.4 | Refused |
| 2 | Delete | §3.4 | Refused |
| 3 | Remove the HR Admin role | §3.4 | Refused |

---

#### ADMIN-008 · HR deactivates and reactivates a user

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — can a deactivated person still be picked as a recipient? The guide only says their recognitions stay on the board | SPARK Business Logic §12.2 |

**Role:** HR Admin

**Preconditions:**

1. Employee D is active and has recognitions on the board.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open D in User management and deactivate D. | | D is shown as inactive. |
| 2 | Open Home "Latest recognitions". | | D's recognitions are still shown under D's name. |
| 3 | Reactivate D. | | D is shown as active. |

---

#### ADMIN-009 · HR deletes a user and restores them

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — what happens to a deleted person's recognitions and awards, and where is a deleted person restored from? | SPARK Business Logic §12.2 |

**Role:** HR Admin

**Preconditions:**

1. Employee X exists in SPARK.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Delete X in User management. | | X is no longer in the active user list. |
| 2 | Restore X. | | X is back in the user list. |

---

#### ADMIN-010 · User management shows a banner listing people with no manager

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §7.3 |

**Role:** HR Admin

**Preconditions:**

1. Employee N in entity A has no manager in the directory.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open User management for entity A. | | A banner lists the people with no manager, including N. |

---

### Background jobs

#### ADMIN-011 · The Background jobs page lists the five jobs

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §12.3 |

**Role:** HR Admin

**Preconditions:**

1. The HR Admin is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Background jobs. | | `budgets.quarter_open`, `budgets.quarter_close`, `payroll.cutoff`, `notifications.deliver` and `budgets.reconcile` are listed. |

---

#### ADMIN-012 · "Run now" is available only to an HR Admin with access to every entity

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — the placement of "Run now" is still to be verified, and whether it is hidden or disabled (User Guide App. C) | SPARK Business Logic §3.2, §12.3 |

**Role:** HR Admin of the variant

**Preconditions:**

1. The HR Admin's entity access matches the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Background jobs. | | The result in Note. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Access to every entity | §12.3 | "Run now" can be used |
| 2 | Access to entity A only | §12.3 | "Run now" cannot be used |

---
