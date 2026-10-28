# 02 · Peer Recognition

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
<!-- /generated:summary -->

## Test cases

### Send recognition

#### ★ PEER-001 · Sending a peer recognition shows "Spark sent!" and posts the card to the board

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI | Active | SPARK Business Logic §5.1, §5.3 |

**Role:** Employee

**Preconditions:**

1. Employee S has peer allowance left this month (fewer than 5 peer recognitions sent).
2. Employee R (another person) has signed in to SPARK at least once.
3. S is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | On Home click "Send recognition". | | The send form opens with recipient, core value and message fields. |
| 2 | Type the first 2 characters of R's name in the recipient search and pick R. | First 2 letters of R's name | R is selected; the result showed R's entity and department. |
| 3 | Pick the core value. | Teamwork | Teamwork is selected. |
| 4 | Enter a message. | "Thanks for staying late to finish the Q3 report with me." | "Spread the spark" becomes enabled. |
| 5 | Click "Spread the spark". | | "Spark sent!" is shown with a celebration animation. |
| 6 | Open Home and look at "Latest recognitions". | | A card from S to R with the value Teamwork and the message is shown at the top. |
| 7 | Open My Sparks. | | The recognition is listed as sent. |

---

#### PEER-002 · "Spread the spark" on My Sparks opens the send recognition form

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §5.1 |

**Role:** Employee

**Preconditions:**

1. The employee is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open My Sparks. | | My Sparks opens. |
| 2 | Click "Spread the spark". | | The send recognition form opens with recipient, core value and message fields. |

---

#### PEER-003 · Recipient search starts at 2 characters and shows entity and department

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §5.1 |

**Role:** Employee

**Preconditions:**

1. Employee R has signed in at least once.
2. The sender is signed in with the send form open.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type the search text of the variant in the recipient field. | Search text of the variant | The result of the variant is shown. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) 2 characters of R's name | §5.1 | R is listed with entity and department |
| 2 | 1 character | §5.1 | Review; the guide gives the minimum but not what is shown below it (no list, hint text?) |

---

#### PEER-004 · A person from another entity can receive a peer recognition

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §5.1 |

**Role:** Employee

**Preconditions:**

1. Sender S belongs to entity A and has peer allowance left.
2. Employee R2 belongs to entity B and has signed in at least once.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Send recognition" and search for R2. | R2's name | R2 is listed with entity B. |
| 2 | Pick R2, a core value and a 20–300 character message, then click "Spread the spark". | Integrity; valid message | "Spark sent!" is shown and the card appears in "Latest recognitions". |

---

#### PEER-005 · A person who has never signed in is not offered as a recipient

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §5.1 |

**Role:** Employee

**Preconditions:**

1. Person N exists in the directory but has never signed in to SPARK.
2. The sender is signed in with the send form open.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type N's name in the recipient search. | N's name | N is not in the results. |

---

#### PEER-006 · Each core value can be chosen and is shown on the card

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §1, §5.1 |

**Role:** Employee

**Preconditions:**

1. The sender has peer allowance left.
2. Recipient R has signed in at least once.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Send recognition", pick R and the value of the variant, enter a valid message and click "Spread the spark". | Value of the variant | "Spark sent!" is shown. |
| 2 | Open "Latest recognitions" on Home. | | The new card shows the value of the variant. |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Innovation | §1 | |
| 2 | Integrity | §1 | |
| 3 | Teamwork | §1 | |
| 4 | Respect | §1 | |

---

#### PEER-007 · A message in Burmese or mixed Burmese and English is accepted

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — how are Burmese characters (combining marks) counted toward the 20–300 limit, and does recipient/board search work with Burmese text? | SPARK Business Logic §5.1, §14 #3 |

**Role:** Employee

**Preconditions:**

1. The sender has peer allowance left.
2. Recipient R has signed in at least once.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Send recognition", pick R and a value, enter the message of the variant and click "Spread the spark". | Message of the variant | "Spark sent!" is shown. |
| 2 | Open "Latest recognitions" on Home. | | The card shows the message exactly as entered, with no broken characters. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) English | §5.1 | |
| 2 | Burmese | §5.1 | |
| 3 | Burmese + English mix | §5.1 | |

---

### Validation

#### PEER-008 · "Spread the spark" stays disabled until recipient, value and a valid message are all set

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §5.1 |

**Role:** Employee

**Preconditions:**

1. The sender has peer allowance left.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Send recognition". | | "Spread the spark" is disabled. |
| 2 | Pick a recipient. | Recipient R | "Spread the spark" is still disabled. |
| 3 | Pick a core value. | Respect | "Spread the spark" is still disabled. |
| 4 | Enter a valid message. | 25-character message | "Spread the spark" is enabled. |

---

#### PEER-009 · A message shorter than 20 or longer than 300 characters is refused

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §5.2 |

**Role:** Employee

**Preconditions:**

1. The sender has peer allowance left.
2. The send form is open with a recipient and a core value picked.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Enter the message of the variant. | Message of the variant | "Message must be between 20 and 300 characters." is shown. |
| 2 | Look at "Spread the spark". | | The button is disabled and no recognition is sent. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) 19 characters | §5.2 | Refused |
| 2 | 301 characters | §5.2 | Refused |
| 3 | Only spaces (25) | — | Review; the guide does not say whether whitespace counts toward the length |

---

#### PEER-010 · Messages of exactly 20 and exactly 300 characters are accepted

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | SPARK Business Logic §5.2 |

**Role:** Employee

**Preconditions:**

1. The sender has peer allowance left.
2. Recipient R has signed in at least once.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Send recognition", pick R and a value and enter the message of the variant. | Message of the variant | No length error is shown and "Spread the spark" is enabled. |
| 2 | Click "Spread the spark". | | "Spark sent!" is shown. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) 20 characters | §5.2 | Accepted |
| 2 | 300 characters | §5.2 | Accepted |

---

#### PEER-011 · A user cannot send a recognition to themselves

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — is the sender hidden from the recipient search, or refused on send, and with which message? | SPARK Business Logic §5.2 |

**Role:** Employee

**Preconditions:**

1. The sender has peer allowance left.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Send recognition" and search for the sender's own name. | Sender's own name | The sender cannot be chosen as recipient, or the send is refused. |
| 2 | Open My Sparks. | | No recognition from the sender to themselves exists. |

---

### Monthly allowance

#### ★ PEER-012 · After 5 peer recognitions in a calendar month the send button is disabled

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | SPARK Business Logic §2, §5.1, §5.2 |

**Role:** Employee

**Preconditions:**

1. The entity's monthly allowance is the default 5.
2. Employee S has sent exactly 4 peer recognitions this calendar month.
3. Recipient R has signed in at least once.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Send a peer recognition to R with a valid message. | Valid message | "Spark sent!" is shown (5th recognition). |
| 2 | Open "Send recognition" again and fill recipient, value and a valid message. | Valid message | "Spread the spark" is disabled. |

---

#### PEER-013 · The peer allowance resets on the 1st of the month

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Manual — needs the calendar month to roll over in the test environment | Active | SPARK Business Logic §2, §4 |

**Role:** Employee

**Preconditions:**

1. Employee S used all 5 peer recognitions in the previous calendar month.
2. Today is the 1st (or later) of the new month.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Send recognition" and fill recipient, value and a valid message. | Valid message | "Spread the spark" is enabled. |
| 2 | Click "Spread the spark". | | "Spark sent!" is shown. |

---

#### PEER-014 · The monthly allowance follows the entity setting

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §12.1 |

**Role:** HR Admin, then Employee

**Preconditions:**

1. Employee S in entity A has sent 0 peer recognitions this month.
2. An HR Admin with access to entity A is available.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As HR Admin, set the monthly allowance of entity A to 2 with a reason. | 2; reason "UAT allowance test" | The new value is saved and shows the "Changed" badge. |
| 2 | As S, send 2 peer recognitions. | Valid messages | "Spark sent!" is shown each time. |
| 3 | As S, open "Send recognition" again and fill all fields. | Valid message | "Spread the spark" is disabled. |
| 4 | As S, open Rules and limits. | | The monthly allowance shows 2. |

---

### Permissions and fraud scope

#### PEER-015 · Finance Admin and Group Admin cannot send peer recognitions

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — is "Send recognition" hidden or disabled for these roles? | SPARK Business Logic §1, §3.1 |

**Role:** Role of the variant

**Preconditions:**

1. The user is signed in with only the role of the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open Home and My Sparks. | | The user cannot open the send recognition form. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Finance Admin | §3.1 | No send |
| 2 | Group Admin | §3.1 | No send |

---

#### PEER-016 · Peer recognitions are not checked by the fraud rules

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | SPARK Business Logic §5.2 |

**Role:** Employee, then HR Admin

**Preconditions:**

1. Employee S has peer allowance left.
2. The Generic message rule (20–40 characters) is on for S's entity.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As S, send a peer recognition with a 30-character message. | "Thanks for your help this week" | "Spark sent!" is shown. |
| 2 | As HR Admin, open the fraud queue. | | No flag and no Blocked record exists for this recognition. |

---
