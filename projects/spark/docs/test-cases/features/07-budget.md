# 07 · Budget

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
<!-- /generated:summary -->

## Test cases

### Quarterly allocation

#### ★ BUDG-001 · When a quarter opens each leader gets 35,000 MMK per direct report

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Manual — needs a quarter start in the test environment | Review — PRD gives ≈ USD 7.50 per direct report and the total envelope is not decided (PRD Q1, §14 #12) | SPARK Business Logic §9.1, §12.3 |

**Role:** HR Admin

**Preconditions:**

1. Leader L has 3 direct reports and Leader M has 1 in entity A, which uses the default standard budget.
2. A new quarter has just started and the `budgets.quarter_open` job has run.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Budget tracker for entity A and the new quarter. | | L has 105,000 MMK and M has 35,000 MMK. |
| 2 | Open L's budget history. | | An allocation for the new quarter is recorded. |

---

#### BUDG-002 · Unused budget expires when the quarter closes

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Manual — needs a quarter end in the test environment | Active | SPARK Business Logic §9.1, §12.3 |

**Role:** HR Admin

**Preconditions:**

1. Leader L ended the previous quarter with 40,000 MMK unused.
2. The `budgets.quarter_close` and `budgets.quarter_open` jobs have run.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Budget tracker for the new quarter. | | L's budget is the standard allocation only; the 40,000 MMK was not carried over. |

---

### HR budget operations

#### ★ BUDG-003 · HR allocates a first budget to a leader who has none this quarter

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Review — the Allocate dialog is still to be verified (User Guide App. C) | SPARK Business Logic §9.1, §9.2 |

**Role:** HR Admin

**Preconditions:**

1. Leader L in entity A has no budget this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Budget tracker, find L and choose Allocate. | | The Allocate dialog opens. |
| 2 | Enter the amount and a reason and confirm. | 105,000; reason "New leader" | L's budget is 105,000 MMK. |
| 3 | Open L's budget history. | | The allocation is listed with 105,000, the reason, the HR Admin's name and the time. |
| 4 | As L, open My Team. | | The budget left is 105,000 MMK. |

---

#### ★ BUDG-004 · HR tops up a leader's budget for the current quarter

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke | Auto-UI | Active | SPARK Business Logic §9.2 |

**Role:** HR Admin

**Preconditions:**

1. Leader L has a budget of 105,000 MMK this quarter and no awards.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Budget tracker, find L and choose Top up. | | Quick buttons +25k, +50k and +100k are shown. |
| 2 | Click the quick button of the variant, enter a reason and confirm. | Reason "Project bonus" | L's budget increases by the amount of the variant. |
| 3 | As L, open My Team. | | The budget left shows the new total. |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) +25k | §9.2 | 130,000 |
| 2 | +50k | §9.2 | 155,000 |
| 3 | +100k | §9.2 | 205,000 |
| 4 | Typed 12,000 | §9.2 | 117,000 |

---

#### BUDG-005 · Top up is not allowed for an earlier quarter

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — is Top up hidden or disabled for earlier quarters? | SPARK Business Logic §9.2 |

**Role:** HR Admin

**Preconditions:**

1. Leader L had a budget in the previous quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Budget tracker for the previous quarter and find L. | | Top up cannot be used; Adjust is available. |

---

#### BUDG-006 · A top-up above 500,000 MMK emails the Finance Admins

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §9.2, §11 |

**Role:** HR Admin, then Finance Admin

**Preconditions:**

1. Leader L has a budget this quarter. Finance Admins F1 and F2 have access to L's entity.
2. The top-up email threshold is the default 500,000 MMK.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, top up L by the amount of the variant with a reason. | Amount of the variant | The top-up is saved. |
| 2 | As F1 and F2, open the notification log. | | The result in Note. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) 500,001 | §9.2 | Each has a top-up email |
| 2 | 500,000 | §9.2 | No top-up email |

---

#### BUDG-007 · HR adjusts a budget up or down in the current or an earlier quarter

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — the Adjust dialog is still to be verified (User Guide App. C) | SPARK Business Logic §9.2 |

**Role:** HR Admin

**Preconditions:**

1. Leader L has a budget of 105,000 MMK in the quarter of the variant, with 20,000 MMK awarded.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Budget tracker for the quarter of the variant, find L and choose Adjust. | | The Adjust dialog opens. |
| 2 | Enter the change of the variant and a reason and confirm. | Change of the variant | L's budget shows the new amount in Note. |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Current quarter +10,000 | §9.2 | 115,000 |
| 2 | Current quarter −10,000 | §9.2 | 95,000 |
| 3 | Previous quarter +10,000 | §9.2 | 115,000 |
| 4 | Current quarter −85,000 (down to exactly what is awarded) | §9.2 | 20,000; budget left 0 |

---

#### BUDG-008 · A budget cannot be reduced below what is already awarded

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — the refusal message is not documented | SPARK Business Logic §9.2 |

**Role:** HR Admin

**Preconditions:**

1. Leader L has a budget of 105,000 MMK this quarter with 20,000 MMK awarded (85,000 left).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Adjust L's budget by −85,001 with a reason. | −85,001 | The adjustment is refused. |
| 2 | Open L's budget. | | It is still 105,000 MMK with 85,000 left. |

---

#### BUDG-009 · Every budget change needs a reason

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — is the confirm button disabled or is a message shown when the reason is empty? | SPARK Business Logic §1, §9.2 |

**Role:** HR Admin

**Preconditions:**

1. A leader with the budget state needed by the variant exists.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the dialog of the variant, enter an amount and leave the reason empty. | Valid amount; empty reason | The change cannot be confirmed and the budget is unchanged. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Allocate | §9.2 | Not saved |
| 2 | Top up | §9.2 | Not saved |
| 3 | Adjust | §9.2 | Not saved |

---

#### BUDG-010 · Budget changes are kept in the history and cannot be edited

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §9.2 |

**Role:** HR Admin

**Preconditions:**

1. Leader L had an allocation, a top-up and an adjustment this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open L's budget history. | | Each change is listed with type, amount, reason, user and time. |
| 2 | Look for an edit or delete action on a history entry. | | No edit or delete action is offered. |

---

### Budget balance

#### ★ BUDG-011 · Budget left = allocation + top-ups ± adjustments − awards not voided

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §9.3 |

**Role:** HR Admin, then Leader

**Preconditions:**

1. Leader L has 3 direct reports and no budget this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, allocate 105,000 MMK to L. | 105,000 | L's budget is 105,000. |
| 2 | Top up L by 25,000 and adjust by −10,000. | +25,000; −10,000 | L's budget is 120,000. |
| 3 | As L, send 20,000 to R1 and 10,000 to R2 with messages longer than 40 characters. | 20,000; 10,000 | My Team shows 90,000 left. |
| 4 | As HR Admin, void the 10,000 award with a reason. | Reason "UAT balance check" | The award status is Voided. |
| 5 | As L, open My Team. | | The budget left is 100,000 MMK. |

---

#### BUDG-012 · A flagged award counts as spent

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §7.3, §9.3 |

**Role:** Leader

**Preconditions:**

1. Leader L has 105,000 MMK left and no awards this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Send 10,000 MMK to R1 with a 35-character message. | "Thanks for your help on the project" | "Spark sent!"; the award is flagged and On hold. |
| 2 | Open My Team. | | The budget left is 95,000 MMK. |

---

#### BUDG-013 · My Team shows "Running low" at 20% left and emails the leader once

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — the "Running low" state and email are still to be verified (User Guide App. C) | SPARK Business Logic §9.3, §11 |

**Role:** Leader

**Preconditions:**

1. Leader L's allocation is 105,000 MMK (20% = 21,000) and 21,001 MMK is left.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open My Team. | | "Running low" is not shown. |
| 2 | Send an award that leaves exactly 21,000 MMK. | Award so that 21,000 is left | My Team shows "Running low". |
| 3 | Open the notification log. | | One budget-low email is listed. |
| 4 | Send one more 5,000 MMK award and open the notification log. | 5,000 | Still only one budget-low email. |

---

#### BUDG-014 · My Team estimates how many more minimum awards the team can receive

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — how is the estimate worked out (budget left ÷ minimum, or also per-person caps and the 2-award limit)? | SPARK Business Logic §9.3 |

**Role:** Leader

**Preconditions:**

1. Leader L has 23,000 MMK left and the minimum award is 5,000 MMK.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open My Team. | | The estimate of remaining minimum awards is shown. |

---

#### BUDG-015 · A leader with no budget this quarter sees the no-budget state on My Team

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — the no-budget state of My Team is not described (User Guide App. C) | SPARK Business Logic §15 |

**Role:** Leader

**Preconditions:**

1. Leader L has no budget this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open My Team. | | A no-budget state is shown and no award can be sent. |

---

### Budget tracker

#### BUDG-016 · Finance Admin sees the Budget tracker read-only

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §3.1 |

**Role:** Role of the variant

**Preconditions:**

1. Leaders with budgets exist in an entity both admins can access.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Budget tracker. | | Leaders and their budgets are listed. |
| 2 | Look for Allocate, Top up and Adjust. | | The result in Note. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) HR Admin | §3.1 | All three actions offered |
| 2 | Finance Admin | §3.1 | None offered |

---

#### BUDG-017 · The Budget tracker is not available to employees, leaders or Group Admins

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — what does a user without permission see when opening the Budget tracker by URL? | SPARK Business Logic §3.1 |

**Role:** Role of the variant

**Preconditions:**

1. The user is signed in with only the role of the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look for the Budget tracker in the navigation and open it by URL. | | No budgets are shown. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Employee | §3.1 | No access |
| 2 | Leader | §3.1 | No access |
| 3 | Group Admin | §3.1 | No access |

---

#### BUDG-018 · The "Above standard" filter lists leaders whose budget is above 35,000 MMK per direct report

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — the placement of the "Above standard" filter is still to be verified (User Guide App. C) | SPARK Business Logic §2 |

**Role:** HR Admin

**Preconditions:**

1. Leader L (3 direct reports) has 130,000 MMK; leader M (3 direct reports) has 105,000 MMK this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Budget tracker and apply "Above standard". | | L is listed; M is not. |

---
