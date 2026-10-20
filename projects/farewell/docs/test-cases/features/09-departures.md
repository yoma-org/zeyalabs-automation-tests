# 09 · Departures (Admin)

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 18 (+16 data-variant rows)  
**Priority:** P1 4 · P2 6 · P3 8 · **★ Critical:** 2 · **Smoke:** 1 · **E2E:** 2 · **Auto:** 18 · **Manual:** 0 · **Review:** 2

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [DEP-001](#dep-001--departures-tab-shows-tabs-company-heading-count-tiles-and-table-columns) | Departures tab shows tabs, company heading, count tiles and table columns | Departures console | P2 | — | Auto-UI | Active |  |
| [DEP-002](#dep-002--platform-admin-switches-company-with-the-chips-and-the-heading-follows) | Platform admin switches company with the chips and the heading follows | Departures console | P1 | — | Auto-UI | Active |  |
| [DEP-003](#dep-003--row-actions-match-the-departure-status) | Row actions match the departure status | Departures console | P2 | — | Auto-UI | Active | 4 |
| [DEP-004](#dep-004--messages-column-text-matches-the-departure-state) | MESSAGES column text matches the departure state | Departures console | P3 | — | Auto-UI | Active | 4 |
| [DEP-005](#-dep-005--record-a-last-working-day-adds-the-person-as-not-triggered) | ★ Record a last working day adds the person as Not triggered | Record a last working day | P1 | @smoke @e2e | Auto-UI | Active |  |
| [DEP-006](#dep-006--last-working-day-that-is-not-after-today-is-refused-when-recording) | Last working day that is not after today is refused when recording | Record a last working day | P3 | — | Auto-UI | Active | 3 |
| [DEP-007](#dep-007--employee-list-offers-nobody-who-has-a-departure-or-is-disabled) | Employee list offers nobody who has a departure or is disabled | Record a last working day | P2 | — | Auto-UI | Active | 2 |
| [DEP-008](#dep-008--employee-list-explains-when-everyone-already-has-a-departure-or-is-disabled) | Employee list explains when everyone already has a departure or is disabled | Record a last working day | P3 | — | Auto-UI | Active |  |
| [DEP-009](#dep-009--change-date-of-a-not-triggered-departure-shows-date-changed) | Change date of a Not triggered departure shows "Date changed." | Change date and trigger | P2 | — | Auto-UI | Active |  |
| [DEP-010](#dep-010--change-date-to-a-day-that-is-not-after-today-is-refused) | Change date to a day that is not after today is refused | Change date and trigger | P3 | — | Auto-UI | Active | 2 |
| [DEP-011](#-dep-011--trigger-a-departure-moves-it-to-draft-and-lets-the-leaver-build) | ★ Trigger a departure moves it to Draft and lets the leaver build | Change date and trigger | P1 | @e2e | Auto-UI | Active |  |
| [DEP-012](#dep-012--cancel-in-the-trigger-dialog-leaves-the-departure-not-triggered) | Cancel in the trigger dialog leaves the departure Not triggered | Change date and trigger | P3 | — | Auto-UI | Active |  |
| [DEP-013](#dep-013--company-admin-can-change-the-date-and-trigger-in-their-own-company) | Company admin can change the date and trigger in their own company | Change date and trigger | P1 | — | Auto-UI | Review |  |
| [DEP-014](#dep-014--a-stale-second-tab-cannot-record-or-trigger-the-same-departure-twice) | A stale second tab cannot record or trigger the same departure twice | Change date and trigger | P3 | — | Auto-UI | Active | 2 |
| [DEP-015](#dep-015--department-status-and-name-filters-narrow-the-table) | DEPARTMENT, STATUS and NAME filters narrow the table | Search and filters | P2 | — | Auto-UI | Active | 6 |
| [DEP-016](#dep-016--filters-are-kept-in-the-page-address-and-restored-from-a-bookmark) | Filters are kept in the page address and restored from a bookmark | Search and filters | P2 | — | Auto-UI | Active |  |
| [DEP-017](#dep-017--no-match-shows-no-departures-match-these-filters-and-clear-filters-resets) | No match shows "No departures match these filters." and Clear filters resets | Search and filters | P3 | — | Auto-UI | Active |  |
| [DEP-018](#dep-018--status-filter-archived-lists-no-rows) | STATUS filter "Archived" lists no rows | Search and filters | P3 | — | Auto-UI | Review |  |
<!-- /generated:summary -->

## Test cases

### Departures console

#### DEP-001 · Departures tab shows tabs, company heading, count tiles and table columns

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §10 (FW-050) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Admin" in the top bar. | | The console opens on "Departures" and shows three tabs: "Departures", "Employee List" and "Admins". |
| 2 | Look at the company chips and the heading. | | Only the "Wave Money" chip is shown; the page reads "WAVE MONEY ADMIN" and the heading "Departures · Wave Money". |
| 3 | Look at the count tiles. | | The tiles "Not triggered", "Draft", "Live now", "Closed", "Messages visible" and "Messages hidden" are shown, each with a number. |
| 4 | Look at the table header. | | The columns are "EMPLOYEE", "DEPARTMENT", "LAST DAY", "STATUS", "MESSAGES" and "ACTIONS". |
| 5 | Look at "Record a last working day". | | It reads "This adds the person to the list below as not triggered. Nobody is told anything until you trigger." |

---

#### DEP-002 · Platform admin switches company with the chips and the heading follows

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §10 (FW-069) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Admin" in the top bar. | | "Departures" opens with "PLATFORM ADMIN" and a chip for every company. |
| 2 | Click the company chip. | Yoma Bank | The heading reads "Departures · Yoma Bank" and the table lists only Yoma Bank departures. |
| 3 | Click the company chip. | Wave Money | The heading reads "Departures · Wave Money" and the table lists only Wave Money departures. |

---

#### DEP-003 · Row actions match the departure status

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §10 (FW-050) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in, on "Departures" for Wave Money.
2. A departure in each status of the variants exists in Wave Money.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Find the row of the departure with the variant status. | Not triggered | The row shows the status "Not triggered". |
| 2 | Look at "ACTIONS" in that row. | | It shows "Change date" and "Trigger" only. |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Not triggered: "Change date", "Trigger" | User Guide v1.1 §10 (FW-050) | |
| 2 | Draft: "View draft" | User Guide v1.1 §10 (FW-050) | Also proves the date can no longer be changed once triggered (§14). |
| 3 | Live: "Messages", "View page" | User Guide v1.1 §10 (FW-050) | |
| 4 | Closed: "Messages", "View page" | User Guide v1.1 §10 (FW-050) | |

---

#### DEP-004 · MESSAGES column text matches the departure state

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §15 |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in, on "Departures" for Wave Money.
2. Departures matching each variant exist in Wave Money.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Find the row of the departure of the variant. | Closed, 2 visible messages | The row shows the status "Closed". |
| 2 | Read the "MESSAGES" cell. | | It reads "2 messages · window closed". |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Closed: "N messages · window closed" | User Guide v1.1 §15 | |
| 2 | Closed with one hidden: "1 message · 1 hidden · window closed" | User Guide v1.1 §15 | |
| 3 | Live: "N days left" | User Guide v1.1 §15 | N = days left of the five-day window. |
| 4 | Draft: "—" | User Guide v1.1 §15 | |

---

### Record a last working day

#### ★ DEP-005 · Record a last working day adds the person as Not triggered

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI | Active | User Guide v1.1 §10 (FW-052) |

**Role:** Company admin, Platform admin

**Preconditions:**

1. An admin of Wave Money is signed in.
2. A freshly created active Wave Money employee with no departure exists (created by the test in the Employee List).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Admin" in the top bar and note the number in the "Not triggered" tile. | | "Departures · Wave Money" is shown. |
| 2 | Scroll to "Record a last working day" and choose the person in "Employee". | the new employee | The person can be chosen. |
| 3 | Choose a date in "Last working day". | today + 30 days | The date is shown in the field. |
| 4 | Click "Record". | | "Recorded. They are listed below as not triggered." appears. |
| 5 | Find the person in the table. | | The row shows the person, "LAST DAY" with the chosen date and the status "Not triggered". |
| 6 | Look at the "Not triggered" tile. | | It is one higher than before. |

---

#### DEP-006 · Last working day that is not after today is refused when recording

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §10 (FW-052) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in, on "Departures".
2. A freshly created active Wave Money employee with no departure exists.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Under "Record a last working day", choose the person in "Employee" and the variant date in "Last working day". | today | The date cannot be chosen, or the form says the last working day must be after today. |
| 2 | Click "Record" (if enabled) and look at the table. | | Nothing is recorded: the person is not in the table and the "Not triggered" tile is unchanged. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) today | User Guide v1.1 §10 (FW-052) | The guide gives the rule, not the exact message text. |
| 2 | yesterday | User Guide v1.1 §14 | |
| 3 | tomorrow (boundary, accepted) | User Guide v1.1 §14 | Expected: "Recorded. They are listed below as not triggered." |

---

#### DEP-007 · Employee list offers nobody who has a departure or is disabled

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §10 (FW-052) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in, on "Departures".
2. A Wave Money employee matching the variant exists.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Employee" under "Record a last working day". | | The list of people is shown. |
| 2 | Look for the person of the variant (type their name if the list can be searched). | already has a departure | The person is not offered. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) already has a departure | User Guide v1.1 §10 (FW-052) | Any status, e.g. a freshly recorded Not triggered one. |
| 2 | disabled employee | User Guide v1.1 §10 (FW-052) | Disable a freshly created employee in the Employee List first. |

---

#### DEP-008 · Employee list explains when everyone already has a departure or is disabled

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §10 (FW-052) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in.
2. A company exists in which every employee already has a departure or is disabled (the test creates the employees and records or disables each).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Departures" and click that company's chip. | | "Departures · <company>" is shown. |
| 2 | Look at "Employee" under "Record a last working day". | | It reads "Everyone in this entity already has a departure, or is disabled." and no person can be chosen. |

---

### Change date and trigger

#### DEP-009 · Change date of a Not triggered departure shows "Date changed."

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §10 (FW-068) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in, on "Departures" for Wave Money.
2. A freshly recorded Not triggered departure exists in Wave Money.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Change date" in that row. | | A date field and "Save" are shown. |
| 2 | Choose a new date and click "Save". | today + 45 days | "Date changed." appears. |
| 3 | Read "LAST DAY" in the row. | | It shows the new date; the status is still "Not triggered". |

---

#### DEP-010 · Change date to a day that is not after today is refused

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §14 |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in, on "Departures" for Wave Money.
2. A freshly recorded Not triggered departure exists in Wave Money.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Change date" in that row and choose the variant date. | today | The date cannot be chosen, or the form says the last working day must be after today. |
| 2 | Click "Save" (if enabled) and read "LAST DAY". | | "Date changed." does not appear and "LAST DAY" keeps the old date. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) today | User Guide v1.1 §14 | The guide gives the rule, not the exact message text. |
| 2 | yesterday | User Guide v1.1 §10 (FW-068) | |

---

#### ★ DEP-011 · Trigger a departure moves it to Draft and lets the leaver build

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Active | User Guide v1.1 §10 (FW-067) |

**Role:** Platform admin, Leaver

**Preconditions:**

1. A Platform admin is signed in, on "Departures" for Wave Money.
2. A freshly recorded Not triggered departure exists in Wave Money (DEP-005).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Trigger" in that row. | | The dialog "Trigger this departure?" opens with "Confirm trigger" and "Cancel". |
| 2 | Click "Confirm trigger". | | "Triggered." appears and the status changes to "Draft". |
| 3 | Look at the tiles. | | "Not triggered" is one lower and "Draft" one higher than before. |
| 4 | Switch to the leaver from the account menu. | the triggered person | The leaver can open their builder ("Your farewell page") and it shows "Draft · last day <date>". |

---

#### DEP-012 · Cancel in the trigger dialog leaves the departure Not triggered

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §10 (FW-067) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in, on "Departures" for Wave Money.
2. A freshly recorded Not triggered departure exists in Wave Money.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Trigger" in that row. | | "Trigger this departure?" opens. |
| 2 | Click "Cancel". | | The dialog closes, no "Triggered." message appears and the status is still "Not triggered" with "Change date" and "Trigger". |

---

#### DEP-013 · Company admin can change the date and trigger in their own company

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — Appendix C #9: "Change date" and "Trigger" were not seen for a company admin | User Guide v1.1 §10 (FW-067) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in, on "Departures".
2. The admin has just recorded a Not triggered departure in Wave Money.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Change date" in the row, choose a new date and click "Save". | today + 40 days | "Date changed." appears and "LAST DAY" shows the new date. |
| 2 | Click "Trigger" and then "Confirm trigger". | | "Triggered." appears and the status changes to "Draft". |

---

#### DEP-014 · A stale second tab cannot record or trigger the same departure twice

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §10 |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin has "Departures" for Wave Money open in two browser tabs (A and B).
2. A freshly created employee with no departure exists, recorded or triggered in tab A per the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | In tab A, record the person (base) and wait for the success message. | | "Recorded. They are listed below as not triggered." appears in tab A. |
| 2 | In tab B, without reloading, do the same action for the same person. | | Tab B shows "That person already has a departure." and nothing changes. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) record twice: "That person already has a departure." | User Guide v1.1 §10 | |
| 2 | trigger twice: "This departure has already been triggered." | User Guide v1.1 §10 | Tab A triggers a Not triggered departure; tab B then clicks "Trigger" and "Confirm trigger". |

---

### Search and filters

#### DEP-015 · DEPARTMENT, STATUS and NAME filters narrow the table

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | UAT Feedback (UAT-004) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in, on "Departures" for Wave Money.
2. Wave Money has departures in at least two departments and in the statuses Not triggered, Draft, Live and Closed.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Set the filter of the variant. | STATUS = "Not triggered" | Only rows matching the filter are listed. |
| 2 | Compare with the unfiltered list. | | No matching row is missing and no other row is shown. |

**Data variants (6 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) STATUS "Not triggered" | User Guide v1.1 §10 (FW-051) | Options: "All statuses", "Not triggered", "Draft", "Live", "Closed", "Archived". |
| 2 | STATUS "Draft" | User Guide v1.1 §10 (FW-051) | |
| 3 | STATUS "Live" | User Guide v1.1 §10 (FW-051) | |
| 4 | STATUS "Closed" | User Guide v1.1 §10 (FW-051) | |
| 5 | DEPARTMENT one department | User Guide v1.1 §10 | Options: "All departments", or one department. |
| 6 | NAME part of a name, typed | User Guide v1.1 §10 | Narrows the list as you type. |

---

#### DEP-016 · Filters are kept in the page address and restored from a bookmark

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §10 (FW-051) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in, on "Departures" for Wave Money.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Set "DEPARTMENT", "STATUS" and "NAME". | a department, "Live", part of a name | The table is filtered and the page address contains the three filter values. |
| 2 | Copy the address, open it in a new tab. | | The same three filters are set and the same rows are listed. |
| 3 | Reload the page. | | The filters and rows are unchanged. |

---

#### DEP-017 · No match shows "No departures match these filters." and Clear filters resets

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §10 (FW-051) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in, on "Departures" for Wave Money.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type a name nobody has in "NAME". | zzqx-no-such-person | The table reads "No departures match these filters." with "Clear filters". |
| 2 | Click "Clear filters". | | "All departments", "All statuses" and an empty "NAME" are set, all departures are listed and the filters leave the page address. |

---

#### DEP-018 · STATUS filter "Archived" lists no rows

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — Appendix C #10: the meaning of "Archived" is not confirmed by the development team | User Guide v1.1 §15 |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in, on "Departures" for Wave Money.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Choose "Archived" in "STATUS". | | The option exists in the list. |
| 2 | Look at the table. | | On the test site it reads "No departures match these filters." (the guide records no Archived rows). |

---
