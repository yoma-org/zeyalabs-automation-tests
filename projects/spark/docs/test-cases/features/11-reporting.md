# 11 · Reporting

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
<!-- /generated:summary -->

## Test cases

### Admin overview

#### RPT-001 · Admin overview shows open flags, held amounts and the oldest wait

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — the test data shows count mismatches between the overview and the fraud queue (User Guide App. C). Which count is right? | SPARK Business Logic §12.4, §15 |

**Role:** HR Admin

**Preconditions:**

1. Entity A has 2 awards with open flags (10,000 and 5,000 MMK); the older one was flagged 3 days ago.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Admin overview for entity A. | | Open flags shows 2. |
| 2 | Look at the held amount. | | 15,000 MMK is held. |
| 3 | Look at the oldest wait. | | 3 days. |
| 4 | Open the fraud queue for entity A. | | The number of open flags matches the overview. |

---

#### RPT-002 · Admin overview shows the activity and spend sections

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §12.4 |

**Role:** HR Admin

**Preconditions:**

1. Recognitions and awards exist this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Admin overview. | | Peer and award counts, spend vs budget, participation, by entity, recognitions per day and the fraud rule summary are shown. |

---

### Group overview

#### ★ RPT-003 · Group overview shows counts only and no MMK anywhere

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §3.3, §12.4 |

**Role:** Group Admin

**Preconditions:**

1. Financial awards exist this quarter in at least two entities.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As Group Admin, open Group overview. | | Recognitions, peer vs awards, participation, leaders who award most, most recognised people, core values that earn awards and fraud flag outcomes are shown as counts. |
| 2 | Search the whole page for amounts. | "MMK" and award amounts | No MMK amount is shown anywhere. |

---

#### RPT-004 · An HR Admin can open Group overview via /group

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §3.1 |

**Role:** HR Admin

**Preconditions:**

1. The HR Admin is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open `/group`. | | Group overview opens with counts only. |

---

#### RPT-005 · Group overview is not available to employees, leaders or Finance Admins

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — what does a user without permission see on `/group`? | SPARK Business Logic §3.1 |

**Role:** Role of the variant

**Preconditions:**

1. The user is signed in with only the role of the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open `/group`. | | The group figures are not shown. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Employee | §3.1 | No access |
| 2 | Leader | §3.1 | No access |
| 3 | Finance Admin | §3.1 | No access — Review; PRD Q10 on Finance cross-entity visibility is open |

---

#### RPT-006 · Voided awards are left out of the overview counts

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §2, §8.1 |

**Role:** Group Admin

**Preconditions:**

1. At least one award that is not voided exists this quarter.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As Group Admin, open Group overview and note the award count. | | The award count is shown. |
| 2 | As HR Admin, void one award with a reason. | Reason "UAT count" | The award is Voided. |
| 3 | As Group Admin, reload Group overview. | | The award count is one lower. |

---

#### RPT-007 · A Group Admin with several entities can pick the entity

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — an entity picker for multi-entity Group Admins is still to be verified (User Guide App. C) | SPARK Business Logic §15 |

**Role:** Group Admin

**Preconditions:**

1. The Group Admin has access to entities A and B.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Group overview and pick entity A. | Entity A | Only entity A counts are shown. |

---
