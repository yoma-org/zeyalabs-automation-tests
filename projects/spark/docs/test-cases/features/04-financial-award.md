# 04 · Financial Award

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
<!-- /generated:summary -->

## Test cases

### Give an award

#### ★ AWARD-001 · A leader sends a clean award to a direct report; the budget is debited and the payroll month is shown

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI | Active | SPARK Business Logic §6.1, §6.3, §9.3 |

**Role:** Leader

**Preconditions:**

1. Leader L in entity A has 3 direct reports (R1, R2, R3) who have signed in at least once.
2. L has a budget of 105,000 MMK this quarter and has sent no awards this quarter.
3. Entity A uses the default settings and has an open payroll month ({month}).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open My Team and click "Give an award". | | The award form opens. |
| 2 | Pick R1, a core value and a message longer than 40 characters. | Innovation; "Your new onboarding checklist cut setup time in half for the team." | The fields are filled. |
| 3 | Turn on "Add a financial award" and enter the amount. | 10,000 | The side panel shows Left now 105,000, This award 10,000, Left after 95,000. |
| 4 | Click "Send with award · 10,000 MMK". | | "Spark sent!" is shown with the payroll month {month}. |
| 5 | Open My Team. | | The remaining budget is 95,000 MMK and the award to R1 is listed with 10,000 MMK. |
| 6 | Look at the award's payment status. | | "Waiting for payroll" (or "Not yet paid — planned for the {month} salary slip") is shown; no flag is shown. |

---

#### AWARD-002 · Only the leader's own direct reports can receive an award

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — is a non-direct report hidden from the award recipient picker, or offered and then blocked on send with a reason? | SPARK Business Logic §6.1, §6.3 |

**Role:** Leader

**Preconditions:**

1. Leader L has direct report R1. R1 has a direct report G (L's indirect report). Employee P in the same entity reports to another manager.
2. L has budget left this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open My Team → "Give an award" and search for the person of the variant. | Person of the variant | The person of the variant cannot receive an award from L. |
| 2 | Open My Team. | | The remaining budget is unchanged. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) R1 (direct report) | §6.1 | Eligible — R1 can be picked |
| 2 | G (report of a report) | §6.1 | Not eligible |
| 3 | P (same entity, other manager) | §6.1 | Not eligible |

---

#### AWARD-003 · Quick amount buttons fill 5,000, 10,000 and the maximum for this person

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §6.1, §6.2 |

**Role:** Leader

**Preconditions:**

1. Leader L has a budget of 105,000 MMK this quarter and has sent no awards to R1.
2. The award form is open for R1 with "Add a financial award" turned on.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click the quick button of the variant. | | The amount field shows the amount in Note. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) 5,000 | §6.1 | 5,000 |
| 2 | 10,000 | §6.1 | 10,000 |
| 3 | Maximum for this person | §6.2 | 26,250 (25% of 105,000) |

---

#### AWARD-004 · The side panel shows the limits line and a card preview without the amount

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §6.1 |

**Role:** Leader

**Preconditions:**

1. Leader L has a budget of 105,000 MMK this quarter and has sent no awards to R1.
2. Entity A's open payroll month is {month}.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Give an award", pick R1, a value and a message, and turn on "Add a financial award". | | The side panel shows "Minimum 5,000 · up to 26,250 · whole kyat only · paid in {month}". |
| 2 | Enter an amount. | 12,000 | The card preview shows the message and value but no amount. |

---

#### AWARD-005 · The maximum for a recipient is the lowest of the single cap, the per-person room and the budget left

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §6.2 |

**Role:** Leader

**Preconditions:**

1. Leader L's allocation this quarter is 105,000 MMK (single cap 26,250; per-person cap 52,500).
2. The awards already sent this quarter match the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Give an award", pick R1 and turn on "Add a financial award". | | The limits line shows "up to" the amount in Note. |
| 2 | Click the maximum quick button. | | The amount field shows the amount in Note. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) No awards yet | §6.2 | 26,250 (single cap) |
| 2 | 1 award of 40,000 to R1 (single cap set to block off so it could be sent) | §6.2 | 12,500 (52,500 − 40,000) |
| 3 | Awards to others leave 8,000 budget | §6.2 | 8,000 (budget left) |

---

#### AWARD-006 · An amount that is not whole kyat is not accepted

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — the guide says "whole kyat only" but not whether the field rejects decimals on input or the send is refused, nor the message | SPARK Business Logic §6.1, §6.2 |

**Role:** Leader

**Preconditions:**

1. The award form is open for R1 with "Add a financial award" turned on.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Enter the amount of the variant. | Amount of the variant | The award cannot be sent with this amount. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) 5,000.50 | §6.2 | Not accepted |
| 2 | Letters "abc" | — | Not accepted |

---

#### AWARD-007 · A financial award does not use the leader's monthly peer allowance

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §2, §6.1 |

**Role:** Leader

**Preconditions:**

1. Leader L has already sent 5 peer recognitions this month (allowance 0).
2. L has budget left and has sent no award to R1 this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open My Team → "Give an award" and send a 5,000 MMK award to R1 with a message longer than 40 characters. | 5,000 | "Spark sent!" is shown. |

---

#### AWARD-008 · A leader cannot cancel a confirmed award

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §6.1 |

**Role:** Leader

**Preconditions:**

1. Leader L has sent an award to R1 this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open My Team and the award to R1. | | No cancel, delete or edit action is offered. |

---

#### AWARD-009 · "Send recognition" on Home sends a peer recognition only

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §6.1 |

**Role:** Leader

**Preconditions:**

1. Leader L has budget left and peer allowance left.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | On Home click "Send recognition". | | The form has no "Add a financial award" option. |

---

### Access to awards

#### AWARD-010 · My Team and "Give an award" are available to leaders only

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — is My Team hidden or shown empty for roles without it? | SPARK Business Logic §3.1 |

**Role:** Role of the variant

**Preconditions:**

1. The user is signed in with only the role of the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look for My Team in the navigation and open it by URL. | | My Team is available only to the Leader. |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Leader | §3.1 | My Team with "Give an award" |
| 2 | Employee | §3.1 | No My Team |
| 3 | Finance Admin | §3.1 | No My Team |
| 4 | Group Admin | §3.1 | No My Team |

---

#### AWARD-011 · An HR Admin can give an award only when they have their own budget

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — §14 #9: My Team may show for an HR Admin without a budget. What exactly does it show, and is "Give an award" disabled? | SPARK Business Logic §3.1, §14 #9 |

**Role:** HR Admin

**Preconditions:**

1. HR Admin H has direct report D who has signed in.
2. H's budget this quarter matches the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open My Team. | | My Team opens. |
| 2 | Try to send a 5,000 MMK award to D with a message longer than 40 characters. | 5,000 | The result in Note. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) H has a budget (allocated by another HR Admin) | §3.1 | "Spark sent!" is shown |
| 2 | H has no budget | §3.1 | No award can be sent |

---
