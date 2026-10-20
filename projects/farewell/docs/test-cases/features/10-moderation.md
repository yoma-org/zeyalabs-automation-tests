# 10 · Messages & Photos Moderation (Admin)

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 12 (+4 data-variant rows)  
**Priority:** P1 1 · P2 5 · P3 6 · **★ Critical:** 1 · **Smoke:** 1 · **E2E:** 1 · **Auto:** 12 · **Manual:** 0 · **Review:** 1

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [MOD-001](#mod-001--messages-page-shows-the-leaver-header-counts-booklet-photos-and-messages) | Messages page shows the leaver header, counts, booklet, photos and messages | Departure messages page | P2 | — | Auto-UI | Active |  |
| [MOD-002](#mod-002--draft-departure-messages-page-shows-the-draft-notice) | Draft departure messages page shows the draft notice | Departure messages page | P3 | — | Auto-UI | Active |  |
| [MOD-003](#mod-003--leavers-farewell-and-other-page-sections-cannot-be-moderated) | Leaver's farewell and other page sections cannot be moderated | Departure messages page | P2 | — | Auto-UI | Active |  |
| [MOD-004](#-mod-004--hide-a-message-with-a-reason-removes-it-from-the-public-page) | ★ Hide a message with a reason removes it from the public page | Hide and restore messages | P1 | @smoke @e2e | Auto-UI | Active |  |
| [MOD-005](#mod-005--cancel-in-the-hide-dialog-leaves-the-message-visible) | Cancel in the hide dialog leaves the message visible | Hide and restore messages | P3 | — | Auto-UI | Active |  |
| [MOD-006](#mod-006--show-hidden-message-reveals-the-text-of-a-hidden-message) | Show hidden message reveals the text of a hidden message | Hide and restore messages | P3 | — | Auto-UI | Active |  |
| [MOD-007](#mod-007--restore-a-hidden-message-with-a-reason-without-a-confirmation-step) | Restore a hidden message with a reason, without a confirmation step | Hide and restore messages | P2 | — | Auto-UI | Review |  |
| [MOD-008](#mod-008--hide-restore-or-remove-without-a-reason-is-not-done) | Hide, restore or remove without a reason is not done | Hide and restore messages | P3 | — | Auto-UI | Active | 3 |
| [MOD-009](#mod-009--moderation-reason-is-limited-to-500-characters) | Moderation reason is limited to 500 characters | Hide and restore messages | P3 | — | Auto-UI | Active | 2 |
| [MOD-010](#mod-010--remove-the-leavers-photo-with-a-reason-after-confirming) | Remove the leaver's photo with a reason after confirming | Leaver photos | P2 | — | Auto-UI | Active | 2 |
| [MOD-011](#mod-011--cancel-in-the-remove-photo-dialog-keeps-the-photo) | Cancel in the remove-photo dialog keeps the photo | Leaver photos | P3 | — | Auto-UI | Active |  |
| [MOD-012](#mod-012--a-removed-photo-cannot-be-restored-but-the-leaver-can-add-another) | A removed photo cannot be restored, but the leaver can add another | Leaver photos | P2 | — | Auto-UI | Active |  |
<!-- /generated:summary -->

## Test cases

### Departure messages page

#### MOD-001 · Messages page shows the leaver header, counts, booklet, photos and messages

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §11 (FW-053) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in.
2. A Closed Wave Money departure with at least one visible and one hidden message exists.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | On "Departures", click "Messages" in the leaver's row. | | The page shows "WAVE MONEY ADMIN · MESSAGES" and the leaver's name. |
| 2 | Read the line under the name. | | It reads "<title> · <department> · Closed · last day <date>", e.g. "CX Manager · Customer Experience · Closed · last day 13 Sep 2026". |
| 3 | Look at the booklet area. | | "Download booklet (PDF)" with "Downloads the leaver's page as one PDF, as it looks today. It can take up to a minute." and a "Booklet email" status line are shown. |
| 4 | Read the counts. | | They read "N visible · N hidden" and match the number of messages with each badge. |
| 5 | Look at "The leaver's photos". | | "Portrait" and "Favourite photo" are shown, each with "Reason (required)" and "Remove". |
| 6 | Look at a visible message under "Messages". | | It shows the writer, the date, the badge "Visible", the text and photo (if any), "Reason (required)" and "Hide". |

---

#### MOD-002 · Draft departure messages page shows the draft notice

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §11 (FW-053) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in, on "Departures" for Wave Money.
2. A freshly triggered departure (status "Draft") exists in Wave Money.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "View draft" in the leaver's row. | | The departure's messages page opens. |
| 2 | Read the notice. | | It reads "This page is a draft: only the leaver can see it, and nobody can leave a message until it is published." and no messages are listed. |

---

#### MOD-003 · Leaver's farewell and other page sections cannot be moderated

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §11 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in.
2. A Live Wave Money departure with a farewell message exists.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the departure's messages page with "Messages". | | Only "The leaver's photos" and "Messages" have "Reason (required)" with "Hide", "Restore" or "Remove". |
| 2 | Look for a control for the leaver's farewell, title, department or other sections. | | There is no hide, remove or edit control for them. |

---

### Hide and restore messages

#### ★ MOD-004 · Hide a message with a reason removes it from the public page

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI | Active | User Guide v1.1 §11 (FW-054) |

**Role:** Company admin, Visitor

**Preconditions:**

1. A freshly published Wave Money page with at least two visible messages exists (created by the test).
2. A Wave Money company admin is signed in, on that departure's messages page.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Note the counts, then type a reason in "Reason (required)" of a visible message. | Off-topic, hidden by People team | The reason is shown in the field. |
| 2 | Click "Hide". | | The dialog "Hide this message from the leaver's page?" opens with "Confirm hide" and "Cancel". |
| 3 | Click "Confirm hide". | | "The message is hidden." appears. |
| 4 | Look at the message. | | The badge reads "Hidden", with "▶ Show hidden message" and "Hidden by <admin name> (Wave Money admin) on <today>" and the reason. |
| 5 | Read the counts. | | "visible" is one lower and "hidden" one higher. |
| 6 | Open the leaver's public page link as a visitor. | | The hidden message is not shown; the other messages are. |

---

#### MOD-005 · Cancel in the hide dialog leaves the message visible

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §11 (FW-054) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in, on the messages page of a Live departure with a visible message.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type a reason and click "Hide" on a visible message. | Test reason | "Hide this message from the leaver's page?" opens. |
| 2 | Click "Cancel". | | The dialog closes, the badge still reads "Visible" and the counts are unchanged. |

---

#### MOD-006 · Show hidden message reveals the text of a hidden message

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §11 (FW-053) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in, on the messages page of a departure with a hidden message.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "▶ Show hidden message" on the hidden message. | | The message text (and photo, if any) is shown to the admin. |
| 2 | Read the line under it. | | It reads "Hidden by <name> (<role>) on <date>", e.g. "Hidden by Hnin Aye (Wave Money admin) on 13 Sep 2026", with the reason. |

---

#### MOD-007 · Restore a hidden message with a reason, without a confirmation step

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — Appendix C #7: confirm that "Restore" having no confirmation step is intended | User Guide v1.1 §11 |

**Role:** Company admin, Visitor

**Preconditions:**

1. A freshly published Wave Money page with a message the test has just hidden exists.
2. A Wave Money company admin is signed in, on that departure's messages page.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type a reason in "Reason (required)" of the hidden message. | Hidden by mistake | The reason is shown in the field. |
| 2 | Click "Restore". | | No dialog opens; "The message is restored." appears. |
| 3 | Look at the message and the counts. | | The badge reads "Visible"; "visible" is one higher and "hidden" one lower. |
| 4 | Open the leaver's public page as a visitor. | | The message is shown again. |

---

#### MOD-008 · Hide, restore or remove without a reason is not done

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §14 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in, on the messages page of a freshly published departure with a visible message, a hidden message and a portrait.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Leave "Reason (required)" empty for the item of the variant. | Hide on a visible message | The field is empty. |
| 2 | Click the action button. | | The button is disabled or the field is marked as required; no dialog or success message appears and the badge is unchanged. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) "Hide" on a visible message | User Guide v1.1 §14 | The guide does not give the exact refusal text. |
| 2 | "Restore" on a hidden message | User Guide v1.1 §11 | |
| 3 | "Remove" under "Portrait" | User Guide v1.1 §11 | |

---

#### MOD-009 · Moderation reason is limited to 500 characters

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §14 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in, on the messages page of a freshly published departure with a visible message.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type the variant reason in "Reason (required)" of a visible message. | 500 characters | The field holds all 500 characters. |
| 2 | Click "Hide", then "Confirm hide". | | "The message is hidden." appears and the full reason is shown under the message. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) 500 characters, accepted | User Guide v1.1 §14 | |
| 2 | 501 characters, refused | User Guide v1.1 §11 | Expected: the field stops at 500 characters, or the hide is refused and the message stays "Visible". |

---

### Leaver photos

#### MOD-010 · Remove the leaver's photo with a reason after confirming

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §11 (FW-064) |

**Role:** Company admin, Visitor

**Preconditions:**

1. A freshly published Wave Money page with a portrait and a favourite photo exists (created by the test).
2. A Wave Money company admin is signed in, on that departure's messages page.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type a reason in "Reason (required)" under the photo of the variant. | Portrait | The reason is shown in the field. |
| 2 | Click "Remove". | | The confirmation reads "Remove this photo from the leaver's page? It can't be restored, but the leaver can add another." with "Confirm remove" and "Cancel". |
| 3 | Click "Confirm remove". | | "The photo is removed." appears with a line naming who removed it and when. |
| 4 | Open the leaver's public page as a visitor. | | That photo is no longer shown. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) "Portrait" | User Guide v1.1 §11 (FW-064) | |
| 2 | "Favourite photo" | User Guide v1.1 §11 (FW-064) | |

---

#### MOD-011 · Cancel in the remove-photo dialog keeps the photo

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §11 (FW-064) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in, on the messages page of a Live departure whose leaver has a portrait.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type a reason under "Portrait" and click "Remove". | Test reason | The remove confirmation opens. |
| 2 | Click "Cancel". | | The dialog closes, no "The photo is removed." appears and the portrait is still shown. |

---

#### MOD-012 · A removed photo cannot be restored, but the leaver can add another

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §11 (FW-064) |

**Role:** Company admin, Leaver

**Preconditions:**

1. A freshly published Wave Money page whose portrait the test has just removed (MOD-010).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As the admin, look at "Portrait" on the messages page. | | There is no "Restore" for the removed photo. |
| 2 | Switch to the leaver, open the builder and add a new portrait. | a JPEG image | The new portrait is saved. |
| 3 | Open the public page. | | The new portrait is shown. |

---
