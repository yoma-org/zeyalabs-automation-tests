# 09 · Notifications

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
<!-- /generated:summary -->

## Test cases

### Recognition emails

#### NOTIF-001 · The recipient is emailed when they receive a peer recognition

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | @e2e | Auto-UI | Active | SPARK Business Logic §5.1, §11 |

**Role:** Employee (recipient)

**Preconditions:**

1. Employee S has just sent a peer recognition to R.
2. The `notifications.deliver` job is running and email is configured.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As R, open the notification log under the bell within 2 minutes. | | A peer-recognition email from S is listed with status Sent. |

---

#### ★ NOTIF-002 · The award email tells the recipient it includes a financial award but never the amount

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Active | SPARK Business Logic §3.3, §11 |

**Role:** Employee (recipient)

**Preconditions:**

1. Leader L has just sent R1 a 10,000 MMK award.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As R1, open the notification log and the award email. | | The email says it is "including a financial award". |
| 2 | Read the whole email. | | No amount (10,000 or MMK) appears anywhere. |

---

#### ★ NOTIF-003 · Void emails go to the recipient and the leader without the amount

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Active | SPARK Business Logic §8.1, §11 |

**Role:** Person of the variant

**Preconditions:**

1. HR has just voided a 10,000 MMK award from leader L to R1.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As the person of the variant, open the notification log. | | The email in Note is listed. |
| 2 | Read the whole email. | | No amount appears anywhere. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Recipient R1 | §11 | "A financial award on SPARK has been withdrawn" |
| 2 | Leader L | §11 | "A financial award you sent has been withdrawn" |

---

### Email log and delivery

#### NOTIF-004 · Each user sees only their own emails under the bell

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §11 |

**Role:** Employee

**Preconditions:**

1. Employees A and B have each received a recognition email.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As A, open the notification log under the bell. | | A's own email is listed; B's is not. |

---

#### NOTIF-005 · An email is Queued and then Sent within 2 minutes

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — the Queued / Not sent / Failed statuses are still to be verified (User Guide App. C) | SPARK Business Logic §11 |

**Role:** Employee (recipient)

**Preconditions:**

1. Email is configured and the `notifications.deliver` job is running.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Send a peer recognition to R and, as R, open the notification log at once. | | The email is listed as Queued. |
| 2 | Open the notification log again within 2 minutes. | | The email is listed as Sent. |

---

#### NOTIF-006 · When email is not configured, emails are recorded as Not sent

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Manual — needs email delivery switched off in a test environment | Review — the Not sent status is still to be verified (User Guide App. C) | SPARK Business Logic §11 |

**Role:** Employee (recipient)

**Preconditions:**

1. Email is not configured in the test environment.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Send a peer recognition to R and, as R, open the notification log. | | The email is recorded with status Not sent. |

---

#### NOTIF-007 · When the job worker is down, emails are recorded and sent once it is back

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Manual — needs the job worker stopped and started | Review — the guide says due runs wait; confirm that queued emails are sent when the worker restarts | SPARK Business Logic §11, §12.3 |

**Role:** Employee (recipient)

**Preconditions:**

1. The job worker is stopped.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Send a peer recognition to R and, as R, open the notification log. | | The email is recorded and not Sent. |
| 2 | Start the job worker and wait 2 minutes. | | The email status is Sent. |

---

#### NOTIF-008 · The Finance top-up email threshold is configurable

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §11, §12.1 |

**Role:** HR Admin, then Finance Admin

**Preconditions:**

1. Leader L in entity A has a budget this quarter. Finance Admin F has access to entity A.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, set the top-up email threshold of entity A to 100,000 MMK with a reason. | 100,000 | The setting is saved. |
| 2 | Top up L by 100,001 MMK with a reason. | 100,001 | The top-up is saved. |
| 3 | As F, open the notification log. | | A top-up email is listed. |

---
