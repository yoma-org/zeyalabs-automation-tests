# 05 · Fraud Rules

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
<!-- /generated:summary -->

## Test cases

### Blocking rules

#### FRAUD-001 · An award from a leader to themselves is blocked

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-API | Review — the UI only offers direct reports, so this needs the award API. Endpoint and refusal response are not documented | SPARK Business Logic §7.1 #1 |

**Role:** Leader

**Preconditions:**

1. Leader L has 105,000 MMK budget left this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Submit a financial award with recipient = L through the award API. | 5,000; message longer than 40 characters | The award is refused with the Self award reason. |
| 2 | As HR Admin, open the fraud queue "Blocked" tab. | | A record for L → L with rule Self award is listed. |
| 3 | As L, open My Team. | | The budget left is still 105,000 MMK. |

---

#### ★ FRAUD-002 · An award to a direct report in another entity is blocked and the rule cannot be changed

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §7.1 #2 |

**Role:** Leader, then HR Admin

**Preconditions:**

1. Leader L is in entity A. Direct report X reports to L but belongs to entity B.
2. L has budget left and has sent no award to X this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As L, try to send a 5,000 MMK award to X with a message longer than 40 characters. | 5,000 | The award is refused and a reason is shown; "Spark sent!" is not shown. |
| 2 | As HR Admin, open Settings → Fraud for entity A and find the Cross-entity award rule. | | The rule is shown as fixed: it cannot be switched off or set to flag. |

---

#### FRAUD-003 · An award to the leader's own manager or above is blocked

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-API | Review — the UI only offers direct reports, so this needs the award API. Endpoint and refusal response are not documented | SPARK Business Logic §7.1 #3 |

**Role:** Leader

**Preconditions:**

1. Leader L reports to manager M, who reports to M2. All are in entity A.
2. L has budget left.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Submit a financial award from L to the person of the variant through the award API. | 5,000; message longer than 40 characters | The award is refused with the Upward gifting reason. |
| 2 | As HR Admin, open the "Blocked" tab. | | A record with rule Upward gifting is listed. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Manager M | §7.1 #3 | Blocked |
| 2 | Manager's manager M2 | §7.1 #3 | Blocked if within the configured levels up — Review the default number of levels |

---

#### ★ FRAUD-004 · An award below the minimum of 5,000 MMK is blocked

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §6.2, §7.1 #4 |

**Role:** Leader

**Preconditions:**

1. Leader L has a budget of 105,000 MMK and no awards this quarter.
2. Entity A uses the default settings.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Send an award to R1 with a message longer than 40 characters and the amount of the variant. | Amount of the variant | The result in Note. |
| 2 | Open My Team. | | The budget left matches the result (unchanged when blocked). |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) 4,999 | §7.1 #4 | Refused with a reason; record on the "Blocked" tab; budget 105,000 |
| 2 | 5,000 | §6.2 | "Spark sent!"; budget 100,000 |

---

#### ★ FRAUD-005 · An award larger than the budget left is blocked

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §7.1 #5 |

**Role:** Leader

**Preconditions:**

1. Leader L's allocation is 105,000 MMK and awards to others leave 8,000 MMK this quarter.
2. L has sent no award to R3 this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Send an award to R3 with a message longer than 40 characters and the amount of the variant. | Amount of the variant | The result in Note. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) 8,001 | §7.1 #5 | Refused with a reason; record on the "Blocked" tab; budget left 8,000 |
| 2 | 8,000 | §7.1 #5 | "Spark sent!"; budget left 0 |

---

#### ★ FRAUD-006 · An award above 25% of the allocation is blocked

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Review — PRD v0.1 sets the single cap at 50% and the per-person cap at 25% (swapped). Built app uses 25% / 50%. Confirm and update the PRD (§14 #1) | SPARK Business Logic §6.2, §7.1 #6, §14 #1 |

**Role:** Leader

**Preconditions:**

1. Leader L's allocation is 105,000 MMK (25% = 26,250) and L has sent no awards this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Send an award to R1 with a message longer than 40 characters and the amount of the variant. | Amount of the variant | The result in Note. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) 26,251 | §7.1 #6 | Refused with a reason; record on the "Blocked" tab; budget left 105,000 |
| 2 | 26,250 | §6.2 | "Spark sent!"; budget left 78,750 |

---

#### ★ FRAUD-007 · Awards to one recipient above 50% of the allocation in a quarter are blocked

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §6.2, §7.1 #7 |

**Role:** Leader

**Preconditions:**

1. Leader L's allocation is 105,000 MMK (50% = 52,500).
2. L has sent 1 award of 26,250 MMK to R1 this quarter (that award was dismissed if flagged).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Send a second award to R1 with a message longer than 40 characters and the amount of the variant. | Amount of the variant | The result in Note. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) 26,250 with the single cap raised to 30% | §7.1 #7 | Allowed (total 52,500 = 50%): "Spark sent!" |
| 2 | 26,251 with the single cap raised to 30% | §7.1 #7 | Refused (total 52,501 > 50%); record on the "Blocked" tab |

---

#### ★ FRAUD-008 · A third award to the same recipient in a quarter is blocked, however small

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §6.2, §7.1 #8 |

**Role:** Leader

**Preconditions:**

1. Leader L has sent 2 awards of 5,000 MMK each to R1 this quarter.
2. L has budget left.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Send a third award to R1 with a message longer than 40 characters. | 5,000 | The award is refused and a reason is shown; "Spark sent!" is not shown. |
| 2 | As HR Admin, open the "Blocked" tab. | | A record for L → R1, 5,000 MMK, rule Awards to the same person is listed. |

---

#### ★ FRAUD-009 · A blocked award is not created, uses no budget and is recorded on the Blocked tab

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Active | SPARK Business Logic §6.3, §7.3, §13 |

**Role:** Leader, then HR Admin

**Preconditions:**

1. Leader L's allocation is 105,000 MMK and L has sent no awards this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As L, send an award of 26,251 MMK to R1 with a message longer than 40 characters. | 26,251 | The award is refused and a reason is shown. |
| 2 | As L, open My Team. | | The budget left is 105,000 MMK and no award to R1 is listed. |
| 3 | Open Home "Latest recognitions". | | No card from L to R1 for this attempt is shown. |
| 4 | As HR Admin, open the fraud queue "Blocked" tab. | | A record shows sender L, recipient R1, 26,251 MMK, the Single award cap rule, the reason and the time. |
| 5 | Look at the open flags in the fraud queue. | | The blocked attempt is not listed as a flag. |

---

#### FRAUD-010 · The Rules and limits page shows only the rules that refuse a send

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §7.3 |

**Role:** Leader

**Preconditions:**

1. Leader L's entity uses the default settings.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Rules and limits. | | Minimum award, single award cap, per-person cap, awards to the same person and the monthly allowance are listed with their values. |
| 2 | Look for the flag-only rules. | | Rapid spend, Generic message, Concentration risk and Late-cycle clustering are not shown anywhere on the page. |

---

### Flagging rules

#### ★ FRAUD-011 · An award with a generic 20–40 character message is saved but held from payroll

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Active | SPARK Business Logic §6.3, §7.2 #10 |

**Role:** Leader, then HR Admin

**Preconditions:**

1. Leader L's allocation is 105,000 MMK and L has sent no awards this quarter.
2. The Generic message rule is on with the defaults (20–40 characters, flag).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As L, send a 10,000 MMK award to R1 with the message of the variant. | Message of the variant | The result in Note. |
| 2 | As L, open My Team and the award. | | The budget left is 95,000 MMK. Flagged variants show the flag and "On hold"; others show "Waiting for payroll". |
| 3 | As HR Admin, open the fraud queue. | | Flagged variants have an open Generic message flag for this award. |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) 35 chars "Thanks for your help on the project" | §7.2 #10 | "Spark sent!"; flagged, On hold |
| 2 | Exactly 20 characters | §7.2 #10 | Flagged, On hold |
| 3 | Exactly 40 characters | §7.2 #10 | Flagged, On hold |
| 4 | 41 characters | §7.2 #10 | Not flagged, Waiting for payroll |

---

#### FRAUD-012 · Spending more than 60% of the budget early in the quarter flags the award

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — the rule says "> 60%" but the example says "≥ 63,000". Is exactly 60% flagged? | SPARK Business Logic §7.2 #9 |

**Role:** Leader, then HR Admin

**Preconditions:**

1. Leader L's allocation is 105,000 MMK (60% = 63,000) and L has 3 direct reports.
2. The Rapid spend window is set so that today is inside it (for example 92 days) and the threshold is 60%.
3. L has sent 26,250 to R1 and 26,250 to R2 this quarter (52,500 in total, not flagged).
4. Late-cycle clustering is switched off for the entity.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As L, send an award to R3 with a message longer than 40 characters and the amount of the variant. | Amount of the variant | "Spark sent!" is shown. |
| 2 | As HR Admin, open the fraud queue. | | The result in Note. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) 11,000 (total 63,500) | §7.2 #9 | Rapid spend flag; award On hold |
| 2 | 10,000 (total 62,500) | §7.2 #9 | No flag |
| 3 | 10,500 (total exactly 63,000) | §7.2 #9 | Review; "> 60%" says no flag, the example "≥ 63,000" says flag |

---

#### FRAUD-013 · A third award to a small team within 7 days is flagged as concentration risk

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — is the team the leader's direct reports? Is the award that reaches 3 the only one flagged? | SPARK Business Logic §7.2 #11 |

**Role:** Leader, then HR Admin

**Preconditions:**

1. Leader L has a team of 3 direct reports (R1, R2, R3) and a budget of 105,000 MMK.
2. Concentration risk uses the defaults (≥ 3 awards, team ≤ 5, 7 days, flag).
3. Within the last 7 days L sent 5,000 MMK to R1 and 5,000 MMK to R2, both with messages longer than 40 characters.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As L, send 5,000 MMK to R3 with a message longer than 40 characters. | 5,000 | "Spark sent!" is shown. |
| 2 | As HR Admin, open the fraud queue. | | The award to R3 has an open Concentration risk flag and is On hold. |

---

#### FRAUD-014 · Spending more than 40% of the budget late in the quarter flags the award

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §7.2 #12 |

**Role:** Leader, then HR Admin

**Preconditions:**

1. Leader L's allocation is 105,000 MMK (40% = 42,000) and L has sent no awards this quarter.
2. The Late-cycle clustering window is set so that today is inside it (for example 92 days) and the threshold is 40%.
3. Rapid spend is switched off for the entity.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As L, send 26,250 MMK to R1 with a message longer than 40 characters. | 26,250 | "Spark sent!"; no flag. |
| 2 | As L, send 16,000 MMK to R2 with a message longer than 40 characters. | 16,000 (total 42,250) | "Spark sent!" is shown. |
| 3 | As HR Admin, open the fraud queue. | | The award to R2 has an open Late-cycle clustering flag and is On hold. |

---

### Rule configuration

#### FRAUD-015 · Switching a blocking rule to flag lets the award through on hold

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §7, §7.1 |

**Role:** HR Admin, then Leader

**Preconditions:**

1. Leader L's allocation is 105,000 MMK and L has sent no awards this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, set the Single award cap rule of L's entity to flag, with a reason. | Reason "UAT flag mode" | The setting is saved. |
| 2 | As L, send 30,000 MMK to R1 with a message longer than 40 characters. | 30,000 | "Spark sent!" is shown. |
| 3 | As HR Admin, open the fraud queue. | | The award has an open Single award cap flag and is On hold. |

---

#### FRAUD-016 · Switching a flag rule off stops it for new awards only

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §7 |

**Role:** HR Admin, then Leader

**Preconditions:**

1. Leader L has an existing award to R1 with an open Generic message flag.
2. L has budget left and has sent no award to R2 this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, switch the Generic message rule off for L's entity, with a reason. | Reason "UAT rule off" | The setting is saved. |
| 2 | As L, send 5,000 MMK to R2 with a 35-character message. | "Thanks for your help on the project" | "Spark sent!"; the award shows "Waiting for payroll" and no flag. |
| 3 | As HR Admin, open the fraud queue. | | The earlier flag on the award to R1 is still open. |

---

#### FRAUD-017 · A changed rule threshold applies to the next award

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §7, §12.1 |

**Role:** HR Admin, then Leader

**Preconditions:**

1. Leader L has budget left and has sent no award to R1 this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, set the minimum award of L's entity to 6,000 MMK, with a reason. | 6,000 | The setting is saved and shows the "Changed" badge. |
| 2 | As L, open Rules and limits. | | The minimum award is 6,000 MMK. |
| 3 | As L, send 5,500 MMK to R1 with a message longer than 40 characters. | 5,500 | The award is refused and a reason is shown. |

---

#### FRAUD-018 · Which options each fraud rule offers in Settings

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §7.1, §7.4 |

**Role:** HR Admin

**Preconditions:**

1. The HR Admin is signed in with access to entity A.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Settings → Fraud for entity A and open the rule of the variant. | | The rule offers only the options in Note. |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Self award | §7.1 #1 | On/off only; always blocks |
| 2 | Budget exhausted | §7.1 #5 | On/off only; always blocks |
| 3 | Cross-entity award | §7.1 #2 | Fixed; no options |
| 4 | Self allocation | §7.4 | Block or flag only; cannot be switched off |

---

### Self allocation

#### ★ FRAUD-019 · An HR Admin allocating budget to themselves is blocked and every HR Admin is notified

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §3.4, §7.4, §11 |

**Role:** HR Admin

**Preconditions:**

1. HR Admin H1 is also a leader with direct reports and has no budget this quarter.
2. Another HR Admin H2 exists.
3. The Self allocation rule is set to block.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As H1, open the Budget tracker and allocate a budget to H1. | 35,000; reason "UAT self" | The allocation is refused; H1 still has no budget. |
| 2 | As H1 and as H2, open the notification log under the bell. | | Each has a Self allocation notification. |
| 3 | As H1, open Rules and limits. | | A "Budget allocation" rule is shown. |

---

#### FRAUD-020 · With Self allocation set to flag, a self allocation is flagged for another HR Admin

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — §9.2 says an HR Admin can't change their own budget, but §7.4 allows the rule in flag mode. Does flag mode let the allocation through? | SPARK Business Logic §7.4, §9.2 |

**Role:** HR Admin

**Preconditions:**

1. HR Admin H1 is also a leader with no budget this quarter; HR Admin H2 exists.
2. The Self allocation rule is set to flag.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As H1, allocate 35,000 MMK to H1 with a reason. | 35,000 | The allocation is saved and flagged. |
| 2 | As H1 and H2, open the notification log. | | Each has a Self allocation notification. |
| 3 | As H1, open the flag in the fraud queue. | | H1 cannot decide it. |
| 4 | As H2, open the flag. | | H2 can decide it. |

---
