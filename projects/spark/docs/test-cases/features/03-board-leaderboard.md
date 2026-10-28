# 03 · Board, My Sparks & Leaderboard

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
<!-- /generated:summary -->

## Test cases

### Latest recognitions

#### ★ BOARD-001 · A new recognition is visible to every signed-in employee within 60 seconds

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Active | SPARK Business Logic §5.1, §5.3 |

**Role:** Employee (viewer, not sender or recipient)

**Preconditions:**

1. Employee S has just sent a peer recognition to R (note the send time).
2. Employee V, in a different department from S and R, is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As V, open Home and look at "Latest recognitions" (reload until 60 seconds after the send). | | The card from S to R, with its value and message, is shown within 60 seconds of the send. |

---

#### BOARD-002 · "See more" loads older recognitions on the board

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — how many cards are shown before "See more" (PRD says 20 per page) and per click? | SPARK Business Logic §14 #13 |

**Role:** Employee

**Preconditions:**

1. More recognitions exist than fit on the first view of "Latest recognitions".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Home and note the oldest card shown. | | "See more" is shown under the list. |
| 2 | Click "See more". | | Older cards are added below the cards already shown. |

---

#### BOARD-003 · The board filters by period, department and search text

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §14 #13 |

**Role:** Employee

**Preconditions:**

1. Recognitions exist from this month and from earlier months, in at least two departments.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | On Home apply the filter of the variant. | Filter value of the variant | Only cards that match the filter of the variant are shown. |
| 2 | Clear the filter. | | All cards are shown again. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Period = this month | §14 #13 | Only this month's cards; Review the list of period options |
| 2 | Department | §14 #13 | Only cards whose sender or recipient is in the department — Review which side is matched |
| 3 | Search by person name | §14 #13 | Only cards with that person |

---

#### BOARD-004 · Recognitions of a deactivated user stay on the board under their name

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §12.2 |

**Role:** HR Admin, then Employee

**Preconditions:**

1. Employee D has sent and received recognitions shown on the board.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, deactivate D in User management. | | D is shown as inactive. |
| 2 | As another employee, open "Latest recognitions" and search for D. | D's name | D's recognitions are still shown under D's name. |

---

### Award amount visibility

#### ★ BOARD-005 · People not entitled never see an award amount on the board or Leaderboard

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Active | SPARK Business Logic §1, §3.3 |

**Role:** Viewer of the variant

**Preconditions:**

1. Leader L has sent a financial award of 10,000 MMK to direct report R.
2. The viewer of the variant is neither L nor R.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Home and find the card from L to R in "Latest recognitions". | | The card shows "includes a financial award" and no amount. |
| 2 | Open Leaderboard. | | No MMK amount is shown anywhere. |
| 3 | Open L's and R's recognitions via board search. | L's name | No MMK amount is shown anywhere. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Employee in another team | §3.3 | No amount |
| 2 | Another leader | §3.3 | No amount |
| 3 | Group Admin | §3.3 | No amount (counts only) |

---

#### ★ BOARD-006 · Recipient, sending leader, HR Admin and Finance Admin see the award amount

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §3.3 |

**Role:** Viewer of the variant

**Preconditions:**

1. Leader L has sent a financial award of 10,000 MMK to direct report R in entity A.
2. HR Admin and Finance Admin have access to entity A.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As the viewer of the variant, open the page given in Note. | | The award to R is listed with 10,000 MMK. |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Recipient R | §3.3 | My Sparks |
| 2 | Leader L | §3.3 | My Team, awards given |
| 3 | HR Admin | §3.3 | Payroll export preview for entity A |
| 4 | Finance Admin | §3.3 | Payroll export preview for entity A |

---

#### ★ BOARD-007 · The recipient is never told that their award is flagged or on hold

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — which payment status does the recipient see for an award that is On hold? | SPARK Business Logic §3.3, §6.1 |

**Role:** Employee (recipient)

**Preconditions:**

1. Leader L sent R a financial award that was flagged (for example a 35-character message) and is On hold.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As R, open My Sparks and the award. | | No flag, rule name or "On hold" text is shown. |
| 2 | As R, open the notification log under the bell. | | No email mentions a flag or a hold. |

---

### My Sparks

#### BOARD-008 · My Sparks lists the recognitions a user received and sent

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §5.3 |

**Role:** Employee

**Preconditions:**

1. Employee E has received one recognition from A and sent one to B this month.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As E, open My Sparks. | | The recognition from A is listed as received. |
| 2 | Look at the sent recognitions. | | The recognition to B is listed as sent. |

---

#### BOARD-009 · The recipient sees when their award will be paid and when it was paid

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | @e2e | Auto-UI | Review — confirm the page where the recipient sees the payment status (My Sparks?) | SPARK Business Logic §6.4 |

**Role:** Employee (recipient)

**Preconditions:**

1. R has a financial award in the state of the variant; {month} is its payroll month.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As R, open My Sparks and the award. | | The status text of the variant is shown. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Waiting for payroll | §6.4 | "Not yet paid — planned for the {month} salary slip" |
| 2 | Exported | §6.4 | "Paid in the {month} salary slip" |

---

### Leaderboard

#### BOARD-010 · The Leaderboard and "Top receivers" rank people by recognitions received

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — PRD wanted Top Givers public and Top Receivers HR-only; the built app ranks receivers publicly. Confirm with HR (§14 #2) | SPARK Business Logic §5.3, §14 #2 |

**Role:** Employee

**Preconditions:**

1. In this month, X received 4 recognitions, Y received 3 and Z received 1; nobody else received more than 1.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Leaderboard with period = this month. | | X is ranked 1 with 4, Y is ranked 2 with 3. |
| 2 | Open Home and look at "Top receivers". | | X and Y are listed in that order with their counts. |

---

#### BOARD-011 · People with the same count share a rank on the Leaderboard

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §5.3 |

**Role:** Employee

**Preconditions:**

1. In this month, P and Q each received 3 recognitions and nobody received more.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Leaderboard with period = this month. | | P and Q are both shown with rank 1. |

---

#### BOARD-012 · The Leaderboard filters by period, core value and department

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §5.3 |

**Role:** Employee

**Preconditions:**

1. Recognitions exist in this month, earlier this quarter and in earlier quarters, with different values and departments.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Leaderboard and apply the filter of the variant. | Filter of the variant | Counts include only recognitions that match the filter. |

**Data variants (5 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Month | §5.3 | This calendar month only |
| 2 | Quarter | §5.3 | This quarter only |
| 3 | All time | §5.3 | All recognitions |
| 4 | Core value = Integrity | §5.3 | Integrity recognitions only |
| 5 | Department | §5.3 | People of that department only |

---

#### BOARD-013 · A person hidden by HR is not shown on the Leaderboard

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §5.3, §12.2 |

**Role:** HR Admin, then Employee

**Preconditions:**

1. Employee H is in the Leaderboard top list this month.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, open H in User management, turn on hide from leaderboard and save. | | The setting is saved. |
| 2 | As an employee, open Leaderboard with period = this month. | | H is not listed. |

---
