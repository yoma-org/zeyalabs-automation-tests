# 07 · Visit a Page & Leave a Message

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 14 (+6 data-variant rows)  
**Priority:** P1 2 · P2 5 · P3 7 · **★ Critical:** 1 · **Smoke:** 1 · **E2E:** 2 · **Auto:** 12 · **Manual:** 2 · **Review:** 2 · **Obsolete:** 1

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [MSG-001](#msg-001--visitor-without-sign-in-opens-a-live-farewell-page-from-its-link) | Visitor without sign-in opens a live farewell page from its link | Open a farewell page | P1 | @e2e | Auto-UI | Active |  |
| [MSG-002](#msg-002--farewell-page-shows-the-leavers-details-farewell-sections-and-social-buttons) | Farewell page shows the leaver's details, farewell, sections and social buttons | Open a farewell page | P2 | — | Auto-UI | Active |  |
| [MSG-003](#msg-003--message-button-window-status-and-messages-heading-use-the-themes-words) | Message button, window status and messages heading use the theme's words | Open a farewell page | P3 | — | Auto-UI | Obsolete | 5 |
| [MSG-004](#-msg-004--visitor-leaves-a-message-from-a-prompt-and-sees-it-on-the-page) | ★ Visitor leaves a message from a prompt and sees it on the page | Leave a message | P1 | @smoke @e2e | Auto-UI | Active |  |
| [MSG-005](#msg-005--message-written-without-a-name-shows-anonymous) | Message written without a name shows "Anonymous" | Leave a message | P2 | — | Auto-UI | Active |  |
| [MSG-006](#msg-006--message-with-one-photo-shows-the-photo-on-the-page) | Message with one photo shows the photo on the page | Leave a message | P2 | — | Auto-UI | Active |  |
| [MSG-007](#msg-007--sending-an-empty-message-shows-write-a-message-before-sending) | Sending an empty message shows "Write a message before sending." | Leave a message | P3 | — | Auto-UI | Active | 2 |
| [MSG-008](#msg-008--message-written-in-burmese-is-sent-and-shown-unchanged) | Message written in Burmese is sent and shown unchanged | Leave a message | P2 | — | Auto-UI | Active |  |
| [MSG-009](#msg-009--a-sent-message-has-no-control-to-edit-it) | A sent message has no control to edit it | Leave a message | P3 | — | Auto-UI | Active |  |
| [MSG-010](#msg-010--page-whose-window-has-closed-refuses-new-messages) | Page whose window has closed refuses new messages | Closed or missing pages | P2 | — | Auto-UI | Active |  |
| [MSG-011](#msg-011--link-that-points-to-no-page-shows-this-page-isnt-here-or-this-page-isnt-available) | Link that points to no page shows "This page isn’t here" or "This page isn’t available" | Closed or missing pages | P3 | — | Auto-UI | Review | 2 |
| [MSG-012](#msg-012--share-copies-the-page-link-and-reads-link-copied) | "Share" copies the page link and reads "Link copied" | Share and layout | P3 | — | Auto-UI | Active |  |
| [MSG-013](#msg-013--farewell-page-and-message-form-are-usable-on-a-phone) | Farewell page and message form are usable on a phone | Share and layout | P3 | — | Manual | Active |  |
| [MSG-014](#msg-014--messages-with-photos-are-laid-out-as-agreed-instant-prints-vs-spotlight) | Messages with photos are laid out as agreed (Instant Prints vs Spotlight) | Share and layout | P3 | — | Manual | Review |  |
<!-- /generated:summary -->

## Test cases

### Open a farewell page

#### MSG-001 · Visitor without sign-in opens a live farewell page from its link

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Active | User Guide v1.1 §8 (FW-020) |

**Role:** Visitor

**Preconditions:**

1. A live farewell page exists (published by a freshly triggered leaver) and its link is known.
2. The browser has no signed-in session.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the page link. | <page link> | The farewell page opens in the leaver's theme; the visitor is not sent to the sign-in page. |
| 2 | Click the home icon in the top bar. | | The visitor is sent to the sign-in page (the Alumni Wall needs a Yoma Group account). |

---

#### MSG-002 · Farewell page shows the leaver's details, farewell, sections and social buttons

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §8 (FW-020) |

**Role:** Visitor

**Preconditions:**

1. A live page exists with portrait, farewell, "What’s next", two proud moments, "A moment to remember" with caption, LinkedIn, WhatsApp and Viber filled in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the page link. | | The top bar shows the logo and home icon, ">" with the theme's tagline, the message-window status and "Share". |
| 2 | Read the header of the page. | | The portrait, name, Burmese name, "Title · Company" and the farewell are shown. |
| 3 | Look at the sections. | | The proud moments, what's next and "A MOMENT TO REMEMBER" with its caption are shown (headings follow the theme). |
| 4 | Look at the social buttons. | | "LinkedIn", "WhatsApp · +95 9 …" and "Viber · +95 9 …" are shown. |

---

#### MSG-003 · Message button, window status and messages heading use the theme's words

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Obsolete | User Guide v1.1 §9 (FW-030) |

> Obsolete: duplicate of [THEME-001](08-themes.md), which checks the same wording for all 12 themes.

**Role:** Visitor

**Preconditions:**

1. A live page in the theme exists, published today, with at least one message.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the page link. | Warm Send-Off | The top bar status reads "Notes close in N days". |
| 2 | Look at the message button. | | It reads "Leave a note". |
| 3 | Read the messages heading. | | It reads "Notes from all of you", with "N colleagues so far". |

**Data variants (5 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Warm Send-Off | User Guide v1.1 §9 (FW-030) | "Notes close in N days" / "Leave a note" / "Notes from all of you" |
| 2 | Ocean | User Guide v1.1 §9 (FW-033) | "Tide goes out in N days" / "Send a wave" / "Washed ashore" |
| 3 | Garden | User Guide v1.1 §9 (FW-032) | "Open for planting N more days" / "Plant a message" / "What you planted" |
| 4 | Retro Arcade | User Guide v1.1 §9 (FW-036) | "TIME LEFT N DAYS" / "INSERT MESSAGE ▶" / "— HIGH SCORES —" |
| 5 | Neon Nights | User Guide v1.1 §9 (FW-038) | "Doors close in N days" / "Leave a message" / "Shout-outs" |

---

### Leave a message

#### ★ MSG-004 · Visitor leaves a message from a prompt and sees it on the page

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI | Active | User Guide v1.1 §8 (FW-022) |

**Role:** Visitor

**Preconditions:**

1. A live page exists with its window open; the "N colleagues so far" count is noted.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the page link and click the theme's message button. | e.g. "Leave a message" | The "Leave a message" form opens with "Your name", "Start with a prompt", "Your message" and "Upload a memory". |
| 2 | Type a name in "Your name". | "Aye Aye" | The name is shown in the field. |
| 3 | Click a prompt under "Start with a prompt". | "My favourite memory with [name] is…" | The prompt text is put into "Your message". |
| 4 | Complete the message and click "Send message". | "… the team lunch at Inya Lake." | "Message sent. Thank you!" appears for a few seconds. |
| 5 | Look at the messages. | | The new message is shown with the text, "Aye Aye" and today's date, and "N colleagues so far" has gone up by one. |

---

#### MSG-005 · Message written without a name shows "Anonymous"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §8 |

**Role:** Visitor

**Preconditions:**

1. A live page exists with its window open.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the message form, leave "Your name" blank and click "Write my own". | | "Your message" is empty and ready to type in. |
| 2 | Type the message and click "Send message". | "Good luck with the next chapter!" | "Message sent. Thank you!" appears. |
| 3 | Look at the new message. | | Its writer reads "Anonymous". |

---

#### MSG-006 · Message with one photo shows the photo on the page

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §8 (FW-023) |

**Role:** Visitor

**Preconditions:**

1. A live page exists with its window open.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the message form, type a message and choose a photo under "Upload a memory". | "Miss you already"; memory.jpg | The form shows the chosen photo. |
| 2 | Try to choose a second photo. | memory2.png | The form still holds only one photo (the second replaces the first or is not accepted). |
| 3 | Click "Send message". | | "Message sent. Thank you!" appears and the message is shown with one photo. |

---

#### MSG-007 · Sending an empty message shows "Write a message before sending."

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §8 |

**Role:** Visitor

**Preconditions:**

1. A live page exists with its window open; the "N colleagues so far" count is noted.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the message form, type a name only and click "Send message". | "Aye Aye"; message empty | "Write a message before sending." is shown and nothing is sent. |
| 2 | Look at the messages. | | No new message is shown and the count is unchanged. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) empty message | User Guide v1.1 §8 | |
| 2 | spaces only | User Guide v1.1 §14 | "   " |

---

#### MSG-008 · Message written in Burmese is sent and shown unchanged

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §8 |

**Role:** Visitor

**Preconditions:**

1. A live page exists with its window open.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the message form, type a Burmese name and message, and click "Send message". | "အေးအေး"; "ကျေးဇူးအများကြီးတင်ပါတယ်။" | "Message sent. Thank you!" appears. |
| 2 | Reload the page. | | The message and name are shown in Burmese, unchanged. |

---

#### MSG-009 · A sent message has no control to edit it

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §14 |

**Role:** Visitor

**Preconditions:**

1. The visitor has just sent a message on a live page.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look at the visitor's own message. | | There is no edit or delete control on the message. |
| 2 | Reload the page. | | The message is shown, still with no edit control. |

---

### Closed or missing pages

#### MSG-010 · Page whose window has closed refuses new messages

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §8 (FW-027) |

**Role:** Visitor

**Preconditions:**

1. A departure in status Closed exists (seeded) and its page link is known.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the page link. | | The page reads "The five-day window has closed" and "New messages can’t be left on this page." |
| 2 | Look for the message button. | | No button to leave a message is shown; the top bar shows the theme's closed status (e.g. "Notes are closed"). |
| 3 | Look at the messages. | | Earlier visible messages are still shown with "N colleagues so far". |

---

#### MSG-011 · Link that points to no page shows "This page isn’t here" or "This page isn’t available"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — the guide does not say which bad link gives "This page isn’t available" and which gives "This page isn’t here" | User Guide v1.1 §8 |

**Role:** Visitor

**Preconditions:**

1. The address pattern of a farewell page link is known.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open a page link that does not exist. | <page link base>/no-such-page-000 | "This page isn’t here" is shown, with no farewell content. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) unknown page id | User Guide v1.1 §8 | "This page isn’t here" |
| 2 | real link with a character changed | User Guide v1.1 §8 | "This page isn’t available" |

---

### Share and layout

#### MSG-012 · "Share" copies the page link and reads "Link copied"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §8 (FW-026) |

**Role:** Visitor

**Preconditions:**

1. A live page exists, and the browser has clipboard access granted.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the page link and click "Share" in the top bar. | | The button changes to "Link copied". |
| 2 | Read the clipboard. | | It holds the page link, and opening it shows the same page. |

---

#### MSG-013 · Farewell page and message form are usable on a phone

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Manual — visual layout on a phone screen | Active | User Guide v1.1 §8 (FW-021) |

**Role:** Visitor

**Preconditions:**

1. A live page with sections and messages exists.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the page link on a phone (or 390 px wide). | | The page fits the screen without sideways scrolling; the logo words are hidden; portrait, farewell, sections and messages are readable. |
| 2 | Open the message form and send a message. | "Safe travels!" | The form fits the screen and the message is sent. |

---

#### MSG-014 · Messages with photos are laid out as agreed (Instant Prints vs Spotlight)

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Manual — visual layout matching a design | Review — UAT-007: confirm which layout (Instant Prints or Spotlight) the wall of messages with photos must use | UAT Feedback (UAT-007) |

**Role:** Visitor

**Preconditions:**

1. A live page exists with several messages, some with photos of different shapes.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the page and look at the messages with photos. | | The photos and messages follow the agreed layout (Instant Prints or Spotlight) consistently, with text, writer and date aligned. |

---
