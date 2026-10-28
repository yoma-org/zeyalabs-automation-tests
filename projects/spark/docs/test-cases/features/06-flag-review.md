# 06 · Flag Review, Void & Restore

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
<!-- /generated:summary -->

## Test cases

### Fraud queue

#### FLAG-001 · The fraud queue is open to HR Admins only

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — what does a user without permission see when opening the fraud queue by URL? | SPARK Business Logic §3.1 |

**Role:** Role of the variant

**Preconditions:**

1. At least one open flag exists.
2. The user is signed in with only the role of the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look for the fraud queue in the navigation and open it by URL. | | Only the HR Admin sees the flags. |

**Data variants (5 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) HR Admin | §3.1 | Queue with open flags and the "Blocked" tab |
| 2 | Leader | §3.1 | No access |
| 3 | Employee | §3.1 | No access |
| 4 | Finance Admin | §3.1 | No access |
| 5 | Group Admin | §3.1 | No access |

---

#### FLAG-002 · The flag page shows the award, the rule reason and the quarter context

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §8.1 |

**Role:** HR Admin

**Preconditions:**

1. Leader L sent R1 a 10,000 MMK award that has an open Generic message flag.
2. This quarter R1 also received a peer recognition from E, and L also sent a 5,000 MMK award to R2.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the fraud queue and the flag. | | The award (L → R1, 10,000 MMK, message) and the Generic message reason are shown. |
| 2 | Look at the recipient table. | | It lists what else R1 received this quarter, including the recognition from E. |
| 3 | Look at the sender table. | | It lists what else L sent this quarter, including the award to R2. |
| 4 | Look at the table between L and R1. | | It lists everything between L and R1 with the total and its share of L's budget. |

---

#### FLAG-003 · The sending leader sees the flag on their award

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §3.3, §6.1 |

**Role:** Leader

**Preconditions:**

1. Leader L sent R1 an award that has an open flag.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As L, open My Team and the award to R1. | | The flag and the status "On hold" are shown. |

---

### Flag decisions

#### ★ FLAG-004 · Dismissing the only flag releases the award to payroll

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI | Active | SPARK Business Logic §8.1, §6.4 |

**Role:** HR Admin

**Preconditions:**

1. Leader L sent R1 a 10,000 MMK award with one open flag; the award is On hold in the open payroll month.
2. The HR Admin did not send or receive the award.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the fraud queue and the flag. | | The flag is Open. |
| 2 | Click "Dismiss" and save with an optional note. | Note "Checked with L" | The flag is Dismissed and no longer listed as open. |
| 3 | As L, open My Team and the award. | | The status is "Waiting for payroll"; no open flag is shown. |
| 4 | As HR Admin, open the payroll export preview for the month. | | R1's row includes the 10,000 MMK award. |

---

#### FLAG-005 · "Mark as under review" keeps the award on hold

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §8.1 |

**Role:** HR Admin

**Preconditions:**

1. An award has one open flag and is On hold.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the flag and click "Mark as under review". | Optional note | The flag status is Under review. |
| 2 | Open the award's payroll state. | | The award is still On hold. |

---

#### FLAG-006 · Escalating a flag keeps the award on hold and emails every HR Admin

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — PRD sends the escalation to the HR Head; the built app emails every HR Admin. Confirm the recipient (§14 #8) | SPARK Business Logic §8.1, §11, §14 #8 |

**Role:** HR Admin

**Preconditions:**

1. An award has one open flag. HR Admins H1 and H2 exist.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As H1, open the flag, click "Escalate", enter a reason and confirm. | Reason "Pattern across teams" | The flag status is Escalated. |
| 2 | Open the award's payroll state. | | The award is still On hold. |
| 3 | As H1 and as H2, open the notification log. | | Each has a flag-escalated email. |

---

#### ★ FLAG-007 · Voiding a flagged award returns the amount to the budget and removes the award everywhere

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Active | SPARK Business Logic §8.1, §9.3, §11 |

**Role:** HR Admin

**Preconditions:**

1. Leader L (budget left 95,000 MMK) sent R1 a 10,000 MMK award with one open flag, in the open payroll month.
2. The award is shown on the board and counts on the Leaderboard for R1.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the flag, choose "Void award", enter a reason and confirm. | Reason "Not a genuine award" | The award status is Voided. |
| 2 | As L, open My Team. | | The budget left is 105,000 MMK. |
| 3 | Open Home "Latest recognitions" and Leaderboard. | | The card is gone and R1's count is one lower. |
| 4 | Open the payroll export preview for the month. | | The award is not included. |
| 5 | Open R1's and L's notification logs. | | R1 has "A financial award on SPARK has been withdrawn" and L has "A financial award you sent has been withdrawn"; neither shows an amount. |

---

#### FLAG-008 · A reason is required to escalate a flag or void an award

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — the manuals say the reason is required, but the screen shows "Note · optional" (User Guide App. C) | SPARK Business Logic §8.1, §15 |

**Role:** HR Admin

**Preconditions:**

1. An award has one open flag.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the flag, choose the action of the variant and leave the reason empty. | Empty reason | The action cannot be confirmed. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Escalate | §8.1 | Not saved |
| 2 | Void award | §8.1 | Not saved |

---

#### ★ FLAG-009 · An award with two flags stays on hold until both are resolved

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §7.3, §6.4 |

**Role:** HR Admin

**Preconditions:**

1. An award carries two open flags (for example Generic message and Late-cycle clustering).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the award's first flag. | | "Flag 1 of 2" is shown. |
| 2 | Dismiss the first flag. | | The award is still On hold. |
| 3 | Dismiss the second flag. | | The award status is "Waiting for payroll". |

---

#### ★ FLAG-010 · An HR Admin cannot decide a flag on an award they sent or received

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — are the decision buttons hidden or disabled, and is a message shown? | SPARK Business Logic §3.4 |

**Role:** HR Admin

**Preconditions:**

1. HR Admin H is the party of the variant on an award with an open flag.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As H, open the flag. | | H cannot dismiss, review, escalate or void it. |
| 2 | As another HR Admin, open the flag. | | The decisions are available. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) H sent the award | §3.4 | No decision |
| 2 | H received the award | §3.4 | No decision |

---

### Void and restore

#### ★ FLAG-011 · An HR Admin can void a clean award directly with a reason

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Active | SPARK Business Logic §8.2 |

**Role:** HR Admin

**Preconditions:**

1. Leader L (budget left 95,000 MMK) sent R1 a clean 10,000 MMK award in the open payroll month.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Find the award and choose "Void award", enter a reason and confirm. | Reason "Sent to the wrong person" | The award status is Voided. |
| 2 | As L, open My Team. | | The budget left is 105,000 MMK. |
| 3 | Open Admin → Voided awards. | | The award is listed with the reason. |

---

#### ★ FLAG-012 · Restoring a voided award puts it back and debits the leader's current budget

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §8.2, §9.3 |

**Role:** HR Admin

**Preconditions:**

1. A clean 10,000 MMK award from L to R1 was voided directly; L's budget left is 105,000 MMK.
2. The award's payroll month is still Open.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Admin → Voided awards, choose "Restore" on the award, enter a reason and confirm. | Reason "Void was a mistake" | The award leaves the Voided awards list. |
| 2 | As L, open My Team. | | The budget left is 95,000 MMK. |
| 3 | Open Home "Latest recognitions" and Leaderboard. | | The card is back and R1's count is one higher. |

---

#### ★ FLAG-013 · Restoring an award voided from a flag re-opens the flag and holds the award

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Active | SPARK Business Logic §6.4, §8.1, §8.2 |

**Role:** HR Admin

**Preconditions:**

1. An award was voided from its Generic message flag; its payroll month is still Open.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Admin → Voided awards and restore the award with a reason. | Reason "Re-check needed" | The award leaves the Voided awards list. |
| 2 | Open the fraud queue. | | The Generic message flag is Open again. |
| 3 | Open the award's payroll state. | | The award is On hold. |

---

#### FLAG-014 · Restore requires a reason

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — is the confirm button disabled or is a message shown when the reason is empty? | SPARK Business Logic §8.2 |

**Role:** HR Admin

**Preconditions:**

1. A voided award exists in an Open payroll month.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Choose "Restore" on the award and leave the reason empty. | Empty reason | The restore cannot be confirmed and the award stays Voided. |

---

#### ★ FLAG-015 · An award in a Locked or Exported month cannot be voided until the month is unlocked

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — what does the screen show when HR tries to void an award in a Locked / Exported month? | SPARK Business Logic §6.4, §8.2, §10.3 |

**Role:** HR Admin

**Preconditions:**

1. A clean award from L to R1 is in a payroll month whose state matches the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Try to void the award with a reason. | Reason "Correction" | The void is not applied and the award keeps its status. |
| 2 | Unlock the month with a reason, then void the award. | Reason "Correction" | The award status is Voided. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Locked | §8.2 | |
| 2 | Exported | §8.2 | |

---
