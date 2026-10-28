# 08 · Payroll

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
<!-- /generated:summary -->

## Test cases

### Payroll months

#### PAY-001 · Each entity has exactly one Open payroll month

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §10.1, §10.2 |

**Role:** HR Admin

**Preconditions:**

1. The HR Admin has access to entities A and B.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Payroll periods for entity A. | Entity A | Exactly one month has the status Open. |
| 2 | Switch to entity B. | Entity B | Exactly one month has the status Open. |

---

#### ★ PAY-002 · At the cutoff on the 23rd the open month locks and the next month opens

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Manual — needs the date to reach the 23rd in the test environment | Active | SPARK Business Logic §10.1, §12.3 |

**Role:** HR Admin, then Leader

**Preconditions:**

1. Entity A's open payroll month is {month}; the cutoff is the default 23rd.
2. The `payroll.cutoff` job has run on the 23rd.
3. Leader L has budget left.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, open Payroll periods for entity A. | | {month} is Locked and {month + 1} is Open. |
| 2 | As L, send a clean award to R1. | 5,000 | "Spark sent!" shows the payroll month {month + 1}. |

---

#### ★ PAY-003 · Exporting before the cutoff locks the month early and new awards go to the next month

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — the exact wording of the early-lock warning on the confirmation is not documented | SPARK Business Logic §10.1, §10.2 |

**Role:** HR Admin, then Leader

**Preconditions:**

1. Today is before the 23rd. Entity A's open month {month} has clean awards and no award On hold.
2. Leader L has budget left.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, open the payroll export for entity A and {month} and click "Generate CSV". | | The confirmation warns that new awards will go to the next month. |
| 2 | Confirm. | | The file is created and {month} is Exported. |
| 3 | Open Payroll periods for entity A. | | {month} is Exported and {month + 1} is Open. |
| 4 | As L, send a clean award to R1. | 5,000 | "Spark sent!" shows the payroll month {month + 1}. |

---

### Export

#### ★ PAY-004 · HR or Finance generates the payroll CSV for an entity and month

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI+API | Active | SPARK Business Logic §10.3 |

**Role:** Admin of the variant

**Preconditions:**

1. Entity A's open month {month} has clean awards: R1 received 10,000 and 5,000 from L; R2 received 8,000 from M. All recipients have an Employee ID.
2. No award in {month} is On hold.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the payroll export, select the entity and month. | Entity A; {month} | The preview shows one row per person: R1 with 2 awards and 15,000 MMK; R2 with 1 award and 8,000 MMK. |
| 2 | Look at the totals. | | Total 23,000 MMK over 2 people. |
| 3 | Click "Generate CSV". | | A confirmation shows 2 rows and 23,000 MMK. |
| 4 | Confirm. | | The file is listed under "Files already exported". |
| 5 | Download the file and read it. | | It has 2 rows matching the preview: Employee ID, name, department, entity, number of awards, total MMK and pay period. |
| 6 | Open Payroll periods for entity A. | | {month} is Exported. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) HR Admin | §3.1 | Export succeeds |
| 2 | Finance Admin | §3.1 | Export succeeds |

---

#### ★ PAY-005 · "Generate CSV" is disabled while any award in the month is on hold

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Active | SPARK Business Logic §8.1, §10.3 |

**Role:** HR Admin

**Preconditions:**

1. Entity A's month {month} has one award On hold with an open flag and other clean awards.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the payroll export for entity A and {month}. | | "Generate CSV" is disabled. |
| 2 | Dismiss the flag in the fraud queue and reopen the export. | | "Generate CSV" is enabled. |

---

#### ★ PAY-006 · Voided awards are left out of the payroll preview and file

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI+API | Active | SPARK Business Logic §2, §8.1, §10.3 |

**Role:** HR Admin

**Preconditions:**

1. In entity A's month {month}, R1 has a clean 10,000 award and a voided 5,000 award.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the payroll export preview for entity A and {month}. | | R1's row shows 1 award and 10,000 MMK. |
| 2 | Generate the CSV, confirm, download and read it. | | R1's row shows 1 award and 10,000 MMK. |

---

#### PAY-007 · People without an Employee ID are exported with a blank ID after a confirmation

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI+API | Review — the no-Employee-ID confirmation is still to be verified (User Guide App. C), and the Employee ID source is open (PRD Q6) | SPARK Business Logic §10.3, §15 |

**Role:** HR Admin

**Preconditions:**

1. In entity A's month {month}, R3 (no Employee ID in the directory) has a clean award.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the payroll export preview and click "Generate CSV". | | A warning names R3 as having no Employee ID and asks to confirm. |
| 2 | Confirm. | | The file is created. |
| 3 | Download and read the file. | | R3's row is present with a blank Employee ID. |

---

#### PAY-008 · Cancelling the export confirmation writes nothing and leaves the month unchanged

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §10.3 |

**Role:** HR Admin

**Preconditions:**

1. Entity A's month {month} is Open with clean awards and none On hold.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the payroll export, click "Generate CSV" and cancel the confirmation. | | The confirmation closes. |
| 2 | Look at "Files already exported". | | No new file is listed. |
| 3 | Open Payroll periods. | | {month} is still Open. |

---

#### PAY-009 · An exported file can be downloaded again

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI+API | Active | SPARK Business Logic §10.3 |

**Role:** HR Admin

**Preconditions:**

1. A file was exported for entity A and {month}.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Files already exported" and download the file. | | The file downloads with the same rows and total as when it was generated. |

---

#### PAY-010 · The CSV column names and order match what payroll needs

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI+API | Review — the exact header names and order are not documented, and Finance may need extra fields such as cost centre or tax category (PRD Q9) | SPARK Business Logic §10.3, §15 |

**Role:** HR Admin

**Preconditions:**

1. A file was exported for entity A and {month}.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Download the file and read the header row. | | The columns are Employee ID, name, department, entity, number of awards, total MMK and pay period. |

---

#### PAY-011 · Payroll export and Payroll periods are open only to HR and Finance Admins

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — what does a user without permission see when opening these pages by URL? | SPARK Business Logic §3.1 |

**Role:** Role of the variant

**Preconditions:**

1. The user is signed in with only the role of the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look for Payroll export and Payroll periods in the navigation and open them by URL. | | No payroll data is shown. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Employee | §3.1 | No access |
| 2 | Leader | §3.1 | No access |
| 3 | Group Admin | §3.1 | No access |

---

### Corrections

#### ★ PAY-012 · Unlocking a month needs a reason and a reopened month takes no new awards

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Active | SPARK Business Logic §10.2 |

**Role:** HR Admin, then Leader

**Preconditions:**

1. Entity A's month {month} is Exported and {month + 1} is Open.
2. Leader L has budget left.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Payroll periods and unlock {month} with an empty reason. | Empty reason | The unlock cannot be confirmed. |
| 2 | Unlock {month} with a reason. | Reason "Void correction" | {month} is Reopened. |
| 3 | As L, send a clean award to R1. | 5,000 | "Spark sent!" shows the payroll month {month + 1}. |

---

#### ★ PAY-013 · A correction in an exported month is re-exported and the new file supersedes the old one

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI+API | Review — the re-export history display is still to be verified (User Guide App. C) | SPARK Business Logic §10.2, §10.3 |

**Role:** HR Admin

**Preconditions:**

1. Entity A's month {month} was exported with R1 15,000 (2 awards) and R2 8,000. The month is Exported.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Unlock {month} with a reason. | Reason "Void wrong award" | {month} is Reopened. |
| 2 | Void R2's 8,000 award with a reason. | Reason "Sent in error" | The award is Voided. |
| 3 | Lock {month} again. | | {month} is Locked. |
| 4 | Generate the CSV for {month} and confirm. | | {month} is Exported. |
| 5 | Look at "Files already exported". | | Both files are listed; the new one is marked as the latest and the old one as superseded. |
| 6 | Download the new file and read it. | | Only R1's row is present with 15,000 MMK. |

---

#### PAY-014 · Finance Admin can lock and unlock payroll months

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — PRD gives Finance view + export only; the built app also lets Finance lock / unlock. Confirm (§14 #11) | SPARK Business Logic §3.1, §14 #11 |

**Role:** Finance Admin

**Preconditions:**

1. Entity A's month {month} is Exported.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Payroll periods and unlock {month} with a reason. | Reason "Finance correction" | {month} is Reopened. |
| 2 | Lock {month} again. | | {month} is Locked. |

---
