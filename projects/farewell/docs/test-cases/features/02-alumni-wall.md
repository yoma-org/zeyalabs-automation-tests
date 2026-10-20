# 02 · Alumni Wall

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 16 (+9 data-variant rows)  
**Priority:** P1 4 · P2 8 · P3 4 · **★ Critical:** 2 · **Smoke:** 2 · **E2E:** 1 · **Auto:** 14 · **Manual:** 2 · **Review:** 6

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [WALL-001](#-wall-001--a-signed-in-employee-sees-the-wall-heading-personal-greeting-and-privacy-note) | ★ A signed-in employee sees the wall heading, personal greeting and privacy note | Wall content | P1 | @smoke | Auto-UI | Active |  |
| [WALL-002](#wall-002--a-leavers-card-shows-company-portrait-name-department-and-month-and-farewell-start) | A leaver's card shows company, portrait, name, department and month, and farewell start | Wall content | P2 | — | Auto-UI | Active |  |
| [WALL-003](#wall-003--the-card-status-shows-days-left-while-messages-are-open-and-messages-closed-after) | The card status shows days left while messages are open and "Messages closed" after | Wall content | P2 | — | Auto-UI | Review | 2 |
| [WALL-004](#-wall-004--clicking-a-card-or-open-page--opens-the-leavers-page-in-their-theme) | ★ Clicking a card or "Open page →" opens the leaver's page in their theme | Wall content | P1 | @smoke @e2e | Auto-UI | Active | 2 |
| [WALL-005](#wall-005--the-wall-shows-each-leavers-own-farewell-never-colleagues-messages) | The wall shows each leaver's own farewell, never colleagues' messages | Wall content | P1 | — | Auto-UI | Active |  |
| [WALL-006](#wall-006--only-live-and-closed-pages-are-on-the-wall-draft-and-not-triggered-are-not) | Only Live and Closed pages are on the wall; Draft and Not triggered are not | Wall content | P1 | — | Auto-UI | Active | 4 |
| [WALL-007](#wall-007--every-published-leaver-within-90-days-appears-on-the-wall) | Every published leaver within 90 days appears on the wall | Wall content | P2 | — | Auto-UI | Review |  |
| [WALL-008](#wall-008--a-company-chip-shows-only-that-companys-leavers-all-entities-shows-everyone) | A company chip shows only that company's leavers; "All entities" shows everyone | Filters and sort | P2 | — | Auto-UI | Active | 5 |
| [WALL-009](#wall-009--the-department-filter-shows-one-department-and-choosing-department-clears-it) | The "Department" filter shows one department and choosing "Department" clears it | Filters and sort | P2 | — | Auto-UI | Active |  |
| [WALL-010](#wall-010--the-wall-is-sorted-closing-soonest-by-default) | The wall is sorted "Closing soonest" by default | Filters and sort | P2 | — | Auto-UI | Review |  |
| [WALL-011](#wall-011--sorting-most-recent-reorders-the-cards-most-recent-first) | Sorting "Most recent" reorders the cards most recent first | Filters and sort | P2 | — | Auto-UI | Review |  |
| [WALL-012](#wall-012--the-count-reads-n-current-leavers-and-matches-the-cards-shown) | The count reads "N current leavers" and matches the cards shown | Filters and sort | P3 | — | Auto-UI | Review |  |
| [WALL-013](#wall-013--when-no-leaver-matches-the-wall-shows-0-current-leavers-and-the-empty-message) | When no leaver matches, the wall shows "0 current leavers" and the empty message | Filters and sort | P3 | — | Auto-UI | Active |  |
| [WALL-014](#wall-014--filters-are-not-kept-in-the-page-address-and-reset-on-reload) | Filters are not kept in the page address and reset on reload | Filters and sort | P3 | — | Auto-UI | Active |  |
| [WALL-015](#wall-015--on-a-phone-the-wall-stacks-cards-in-one-column-and-the-controls-stay-usable) | On a phone the wall stacks cards in one column and the controls stay usable | Layout and time rules | P3 | — | Manual | Active |  |
| [WALL-016](#wall-016--a-page-leaves-the-wall-90-days-after-the-leavers-last-working-day) | A page leaves the wall 90 days after the leaver's last working day | Layout and time rules | P2 | — | Manual | Review |  |
<!-- /generated:summary -->

## Test cases

### Wall content

#### ★ WALL-001 · A signed-in employee sees the wall heading, personal greeting and privacy note

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke | Auto-UI | Active | User Guide v1.1 §3 (FW-001) |

**Role:** Employee

**Preconditions:**

1. An Employee "Min Khant" without a farewell page is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall. | | The heading reads "Alumni Wall". |
| 2 | Read the greeting. | | It reads "Hi Min Khant 👋 These are colleagues from across Yoma Group who’ve recently moved on to their next chapter. Stop by their page, share a memory or say thank you before it closes." |
| 3 | Read the note under the greeting. | | It reads "Only Yoma Group colleagues can see this wall. Each page stays for a while after their last day, and messages from colleagues stay private." |
| 4 | Look under the note. | | Company chips, a "Department" dropdown, a sort dropdown, a count "N current leavers" and a grid of leaver cards are shown. |

---

#### WALL-002 · A leaver's card shows company, portrait, name, department and month, and farewell start

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §3 (FW-005) |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in.
2. A Live leaver exists in Wave Money with department "Testing", a portrait, a farewell message and a last working day in a known month (for example Oct 2027).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall and find the leaver's card. | Leaver's name | The card has a cover band in the leaver's theme colours and the company pill "Wave Money". |
| 2 | Read the card body. | | It shows a round portrait, the name and "Testing · Oct 2027" (department · month of the last working day). |
| 3 | Read the text under the name. | | It shows the start of the leaver's farewell message. |
| 4 | Read the card footer. | | "Open page →" is on the left and the message-window status is on the right. |

---

#### WALL-003 · The card status shows days left while messages are open and "Messages closed" after

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — "N days left to write" on wall cards not yet confirmed on screen (Appendix C #4) | User Guide v1.1 §3 (FW-005) |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in.
2. A departure in the state of the variant exists and is on the wall.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall and find the card of the variant's leaver. | Leaver of the variant | The status on the right of the card footer is the text of the variant. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Live, window open | User Guide v1.1 §3 | "N days left to write", N = days until the window closes |
| 2 | Closed | User Guide v1.1 §15 | "Messages closed" |

---

#### ★ WALL-004 · Clicking a card or "Open page →" opens the leaver's page in their theme

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI | Active | User Guide v1.1 §3 (FW-005) |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in.
2. A Live leaver with theme "Ocean" is on the wall.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | On the Alumni Wall, click the leaver's card using the target of the variant. | Target of the variant | The leaver's farewell page opens. |
| 2 | Look at the page. | | It shows the leaver's name and the Ocean wording, for example the message button "Send a wave". |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) "Open page →" | User Guide v1.1 §3 | |
| 2 | anywhere on the card | User Guide v1.1 §3 | "The whole card opens the leaver's page." |

---

#### WALL-005 · The wall shows each leaver's own farewell, never colleagues' messages

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §1 |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in.
2. A Live leaver has at least one visible message with a unique text (for example "WALL-005 private note").

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall and find the leaver's card. | | The card shows the start of the leaver's own farewell message. |
| 2 | Search the whole wall for the message text. | WALL-005 private note | The message text and its writer do not appear anywhere on the wall. |

---

#### WALL-006 · Only Live and Closed pages are on the wall; Draft and Not triggered are not

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §15 |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in.
2. A departure in the status of the variant exists.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall with "All entities" and look for the variant's leaver. | Leaver of the variant | The card is shown or not shown as the variant says. |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Draft | User Guide v1.1 §15 | Not on the wall: only the leaver can see the page |
| 2 | Not triggered | User Guide v1.1 §15 | Not on the wall |
| 3 | Live | User Guide v1.1 §15 | On the wall |
| 4 | Closed, within 90 days of the last day | User Guide v1.1 §3 | On the wall, "Messages closed" |

---

#### WALL-007 · Every published leaver within 90 days appears on the wall

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — still seen 18 Oct 2026: the wall shows 7 cards but Departures has 11 Live/Closed; missing Nandar Shwe, Khin Myat Noe, Thiha Kyaw (Wave Money, Live, last day 09 Oct 2027) and Zaw Myo Htun (Yoma Strategic, Closed). Bug or rule? | User Guide v1.1 §3 |

**Role:** Platform admin, Employee

**Preconditions:**

1. The list of Live and Closed departures (within 90 days of the last working day) can be read from "Departures" by a Platform admin (all companies).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As a Platform admin, note every Live and Closed departure in "Departures". | | A list of names is collected. |
| 2 | As an Employee, open the Alumni Wall with "All entities". | | Every name from step 1 has a card; the count "N current leavers" equals the number of names. |
| 3 | Open each card. | | Each page opens; none shows "This page isn't here" or "This page isn't available". |

---

### Filters and sort

#### WALL-008 · A company chip shows only that company's leavers; "All entities" shows everyone

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §3 (FW-002) |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in.
2. Leavers on the wall belong to at least two companies.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click the company chip of the variant. | Company of the variant | Only cards with that company pill are shown, and the count matches the cards. |
| 2 | Click "All entities". | | Leavers of every company are shown again. |

**Data variants (5 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Wave Money | User Guide v1.1 §3 | |
| 2 | Yoma Bank | User Guide v1.1 §3 | |
| 3 | Yoma Group | User Guide v1.1 §3 | |
| 4 | Yoma Land | User Guide v1.1 §3 | May be empty: then the empty state (WALL-013) shows |
| 5 | Yoma Strategic | User Guide v1.1 §3 | May be empty: then the empty state (WALL-013) shows |

---

#### WALL-009 · The "Department" filter shows one department and choosing "Department" clears it

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §3 (FW-002) |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in.
2. Leavers on the wall are in at least two departments, one of them "Testing".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Choose a department in the "Department" dropdown. | Testing | Only cards reading "Testing · Mon YYYY" are shown, and the count matches. |
| 2 | Choose "Department" again. | | The filter is cleared and leavers of every department are shown. |

---

#### WALL-010 · The wall is sorted "Closing soonest" by default

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — app (18 Oct 2026) orders by last working day, latest first (Oct 2027 → Aug 2026), not by soonest closing window. Which is intended? | User Guide v1.1 §3 |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in.
2. At least three Live leavers with different message-window closing days are on the wall.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall and read the sort dropdown. | | It shows "Closing soonest". |
| 2 | Read the "N days left to write" on the cards in order. | | Cards are ordered with the window closing soonest first. |

---

#### WALL-011 · Sorting "Most recent" reorders the cards most recent first

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — app (18 Oct 2026): "Most recent" gives the same order as "Closing soonest" with the current seed. What does "Most recent" order by? | User Guide v1.1 §3 |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in.
2. At least three leavers with different last working days and publish dates are on the wall.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Choose "Most recent" in the sort dropdown. | | The cards are reordered with the most recent leaver first. |
| 2 | Choose "Closing soonest". | | The default order returns. |

---

#### WALL-012 · The count reads "N current leavers" and matches the cards shown

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — app (18 Oct 2026) uses the singular "1 current leaver" for one card; the guide only shows the plural. Confirm both forms are intended. | User Guide v1.1 §3 (FW-001) |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall with "All entities" and read the count. | | It reads "N current leavers", N = the number of cards in the grid. |
| 2 | Click a company chip that has leavers. | Wave Money | The count updates to the number of cards shown. |

---

#### WALL-013 · When no leaver matches, the wall shows "0 current leavers" and the empty message

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §3 (FW-006) |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in.
2. A company chip and department combination with no leaver exists (for example a company chip with no current leavers).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Choose the company chip and "Department" that match nobody. | Company / department with no leaver | The count reads "0 current leavers" and no cards are shown. |
| 2 | Read the message in the grid. | | It reads "Nobody matches that filter right now. Some months the Group has no departures at all." |

---

#### WALL-014 · Filters are not kept in the page address and reset on reload

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §3 (FW-006) |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in on the Alumni Wall.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Note the page address, then click a company chip, choose a "Department" and choose "Most recent". | Wave Money / any department | The address does not change. |
| 2 | Reload the page. | | The wall shows "All entities", "Department" and "Closing soonest" again. |

---

### Layout and time rules

#### WALL-015 · On a phone the wall stacks cards in one column and the controls stay usable

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Manual — visual layout matching the design (FW-009, UAT-008) | Active | User Guide v1.1 §3 (FW-009) |

**Role:** Employee

**Preconditions:**

1. An Employee is signed in on a phone (or a phone-size viewport).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall and compare it with Figure FW-009. | | The layout matches the figure: heading, greeting, chips, "Department", sort and count fit the screen; cards are readable with no horizontal scroll. |
| 2 | Use a company chip, "Department" and the sort. | | Each control can be used and the cards update. |

---

#### WALL-016 · A page leaves the wall 90 days after the leaver's last working day

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Manual — needs a way to move time; automate once a test hook exists | Review — dev (19 Oct 2026): pages leave the UI 45 days after the last working day (data stays in the DB); the guide and the app footer say 90 days. Which is right — and should the on-screen text change? | User Guide v1.1 §3 |

**Role:** Employee

**Preconditions:**

1. A Closed leaver whose last working day was 89 days ago is on the wall.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall on day 89 after the last working day. | | The leaver's card is shown. |
| 2 | Open the Alumni Wall on the day after 90 days have passed. | | The card is gone and the count is one lower. |

---
