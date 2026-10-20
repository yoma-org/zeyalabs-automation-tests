# 11 · Booklet & Email

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 14 (+2 data-variant rows)  
**Priority:** P1 3 · P2 6 · P3 5 · **★ Critical:** 1 · **Smoke:** 1 · **E2E:** 2 · **Auto:** 7 · **Manual:** 7 · **Review:** 4

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [BOOK-001](#-book-001--download-booklet-gives-a-pdf-of-the-page-with-visible-messages-only) | ★ Download booklet gives a PDF of the page with visible messages only | Download the booklet | P1 | @smoke @e2e | Auto-UI+API | Active |  |
| [BOOK-002](#book-002--downloading-again-while-the-booklet-is-being-prepared-is-refused) | Downloading again while the booklet is being prepared is refused | Download the booklet | P3 | — | Auto-UI | Active |  |
| [BOOK-003](#book-003--send-booklet-now-sends-at-once-and-shows-the-sent-status) | Send booklet now sends at once and shows the Sent status | Send the booklet | P1 | @e2e | Auto-UI | Review |  |
| [BOOK-004](#book-004--send-again-after-confirming-adds-re-sent-by-name-to-the-status) | Send again after confirming adds "re-sent by <name>" to the status | Send the booklet | P2 | — | Auto-UI | Active |  |
| [BOOK-005](#book-005--cancel-in-the-send-again-dialog-sends-nothing) | Cancel in the Send again dialog sends nothing | Send the booklet | P3 | — | Auto-UI | Active |  |
| [BOOK-006](#book-006--booklet-email-status-line-matches-the-departure-state) | Booklet email status line matches the departure state | Booklet status | P3 | — | Auto-UI | Active | 3 |
| [BOOK-007](#book-007--failed-and-outcome-unknown-booklet-statuses-show-their-reason) | Failed and Outcome unknown booklet statuses show their reason | Booklet status | P3 | — | Manual | Active |  |
| [BOOK-008](#book-008--booklet-is-sent-automatically-24-hours-after-the-window-closes) | Booklet is sent automatically 24 hours after the window closes | Automatic send and email | P1 | — | Manual | Active |  |
| [BOOK-009](#book-009--booklet-send-time-and-recipients-guide-vs-prd-v2) | Booklet send time and recipients: guide vs PRD v2 | Automatic send and email | P2 | — | Manual | Review |  |
| [BOOK-010](#book-010--booklet-email-has-the-expected-subject-content-language-and-signature) | Booklet email has the expected subject, content, language and signature | Automatic send and email | P2 | — | Manual | Review |  |
| [BOOK-011](#book-011--download-link-in-the-email-works-without-signing-in) | Download link in the email works without signing in | Automatic send and email | P2 | — | Manual | Active |  |
| [BOOK-012](#book-012--expired-or-replaced-download-link-shows-this-link-isnt-valid-any-more) | Expired or replaced download link shows "This link isn't valid any more." | Automatic send and email | P3 | — | Manual | Active |  |
| [BOOK-013](#book-013--hiding-a-message-after-the-booklet-was-made-does-not-change-the-booklet) | Hiding a message after the booklet was made does not change the booklet | Booklet content and lock | P2 | — | Manual | Review |  |
| [BOOK-014](#book-014--page-cannot-be-changed-once-the-booklet-has-been-made) | Page cannot be changed once the booklet has been made | Booklet content and lock | P2 | — | Auto-UI | Active |  |
<!-- /generated:summary -->

## Test cases

### Download the booklet

#### ★ BOOK-001 · Download booklet gives a PDF of the page with visible messages only

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI+API | Active | User Guide v1.1 §11 (FW-055) |

**Role:** Company admin

**Preconditions:**

1. A freshly published Wave Money page with a farewell message and two messages exists (created by the test).
2. One of the two messages has been hidden by the test (MOD-004).
3. A Wave Money company admin is signed in, on that departure's messages page.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Download booklet (PDF)". | | "Preparing your booklet…" shows. |
| 2 | Wait for the download (up to a minute). | | A PDF file downloads. |
| 3 | Parse the PDF text. | | It contains the leaver's name and their farewell message. |
| 4 | Look for the two messages in the PDF text. | | The visible message's text and writer are in it; the hidden message's text is not. |

---

#### BOOK-002 · Downloading again while the booklet is being prepared is refused

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §11 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin has the messages page of a Live departure open in two browser tabs.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Download booklet (PDF)" in tab A. | | "Preparing your booklet…" shows. |
| 2 | While tab A is still preparing, click "Download booklet (PDF)" in tab B. | | Tab B shows "This booklet is already being prepared. Try again in a minute."; tab A still downloads the PDF. |

---

### Send the booklet

#### BOOK-003 · Send booklet now sends at once and shows the Sent status

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Review — Appendix C #7: confirm that "Send booklet now" having no confirmation step is intended | User Guide v1.1 §11 (FW-055) |

**Role:** Company admin

**Preconditions:**

1. A Closed Wave Money departure whose leaver saved a personal email and whose "Booklet email" status reads "Not sent · due <date, time>" exists (seeded; one per run).
2. A Wave Money company admin is signed in, on that departure's messages page.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Read the status line under "Booklet email". | | It reads "Not sent · due <date, time>" and "Send booklet now" is shown. |
| 2 | Click "Send booklet now". | | No dialog opens; "The booklet was sent." appears. |
| 3 | Read the status line again. | | It reads "Sent <date, time> · attached", or "Sent <date, time> · as a download link" followed by "not downloaded yet" when the PDF is too large to attach. "Send again" is shown. |

---

#### BOOK-004 · Send again after confirming adds "re-sent by <name>" to the status

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §11 (FW-063) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money departure whose booklet status reads "Sent …" exists.
2. A Wave Money company admin is signed in, on that departure's messages page.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Send again". | | The dialog "Send the booklet again?" opens with "Send again" and "Cancel". |
| 2 | Click "Send again" in the dialog. | | "The booklet was sent." appears. |
| 3 | Read the status line. | | It reads "Sent <date, time> · attached" (or "· as a download link") followed by "· re-sent by <admin name> on <date, time>". |

---

#### BOOK-005 · Cancel in the Send again dialog sends nothing

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §11 (FW-063) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in, on the messages page of a departure whose booklet status reads "Sent …".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Note the status line and click "Send again". | | "Send the booklet again?" opens. |
| 2 | Click "Cancel". | | The dialog closes, "The booklet was sent." does not appear and the status line is unchanged. |

---

### Booklet status

#### BOOK-006 · Booklet email status line matches the departure state

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §15 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in.
2. A Wave Money departure in the state of the variant exists.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the departure's messages page. | Live, window open | The "Booklet email" section is shown. |
| 2 | Read the status line. | | It reads "Not sent yet" / "Available when the message window closes on <date>", with <date> five days after publishing. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Live, window open: "Not sent yet / Available when the message window closes on <date>" | User Guide v1.1 §15 | |
| 2 | Closed, not sent: "Not sent · due <date, time>" | User Guide v1.1 §15 | <date, time> is 24 hours after the window closed. |
| 3 | No personal email: "No personal email · the booklet can't be sent until the leaver adds one" | User Guide v1.1 §11 | The row on "Departures" also shows "· No personal email"; "Send booklet now" cannot send. |

---

#### BOOK-007 · Failed and Outcome unknown booklet statuses show their reason

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Manual — cannot be provoked on the test site (needs a failing mail server or an interrupted send) | Active | User Guide v1.1 §15 |

**Role:** Company admin

**Preconditions:**

1. A departure whose booklet send failed, or was interrupted, exists (only by chance or a test hook).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Read the "Booklet email" status of a failed send. | | It reads "Failed" with the reason and when it will be tried again (up to five attempts). |
| 2 | Read the status of an interrupted send. | | It reads "Outcome unknown"; check with the leaver before clicking "Send again". |

---

### Automatic send and email

#### BOOK-008 · Booklet is sent automatically 24 hours after the window closes

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Manual — needs a way to move time; automate once a test hook exists | Active | User Guide v1.1 §16 |

**Role:** Company admin, Leaver

**Preconditions:**

1. A Live departure whose leaver saved a personal email, five days after publishing.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | After the window closes, read the "Booklet email" status. | | It reads "Not sent · due <date, time>", 24 hours after the close. |
| 2 | After the due time, read it again. | | It reads "Sent <date, time> · attached" (or "· as a download link"), without any admin action. |
| 3 | Check the leaver's personal inbox (test inbox). | | Exactly one booklet email arrived automatically. |

---

#### BOOK-009 · Booklet send time and recipients: guide vs PRD v2

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Manual — needs a way to move time and a test inbox | Review — PRD v2 says midnight on Day 5 to the personal AND work email; the guide says 24 h after close to the personal email only | User Guide v1.1 §16 |

**Role:** Leaver

**Preconditions:**

1. A departure whose booklet has just been sent automatically, with the leaver's personal and work email both on test inboxes.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Compare the send time with the window close. | | Per the guide, it was sent 24 hours after the five-day window closed. |
| 2 | Check both inboxes. | | Per the guide, only the personal email received it, never the work email. |

---

#### BOOK-010 · Booklet email has the expected subject, content, language and signature

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Manual — needs the test inbox; Burmese part needs a Burmese speaker | Review — Appendix C #8 and #12: the email in a real inbox, and the Burmese text, are not verified | User Guide v1.1 §16 |

**Role:** Company admin, Leaver

**Preconditions:**

1. A booklet has just been sent with "Send booklet now" (BOOK-003) to a test inbox.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the email in the leaver's personal (test) inbox. | | The subject reads "Your farewell booklet · " followed by the Burmese text; it went to the personal email, not the work email. |
| 2 | Read the body. | | English, then Burmese: "Hello <name>,", "Your farewell booklet is attached: your page and N messages from your colleagues, as a PDF to keep." and "Thank you for everything, and all the best for what comes next." |
| 3 | Read the signature and attachment. | | "Yoma Farewell" and "This message was sent automatically. Replies are not read."; the PDF is attached (or, if too large, "It is too large to attach, so please download it here. The link works until <date>:" with a link). |

---

#### BOOK-011 · Download link in the email works without signing in

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Manual — needs the test inbox and a booklet too large to attach | Active | User Guide v1.1 §16 |

**Role:** Visitor

**Preconditions:**

1. A booklet email "· as a download link" has been sent to the test inbox.
2. The browser is not signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click the link in the email. | | A page reads "Your farewell booklet" and "Your booklet is downloading. If it doesn't start, use the button." with no sign-in. |
| 2 | Click "Download booklet (PDF)" if the download doesn't start. | | The PDF downloads; the admin status then shows "downloaded once". |

---

#### BOOK-012 · Expired or replaced download link shows "This link isn't valid any more."

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Manual — needs a way to move time; automate once a test hook exists | Active | User Guide v1.1 §16 |

**Role:** Visitor

**Preconditions:**

1. A booklet download link that is more than 30 days old, or replaced by a newer email.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the link. | | The page reads "This link isn't valid any more. It may have expired, or a newer email replaced it." and nothing downloads. |

---

### Booklet content and lock

#### BOOK-013 · Hiding a message after the booklet was made does not change the booklet

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Manual — needs the sent booklet from the test inbox | Review — "Download booklet (PDF)" downloads the page "as it looks today": does a download after close reflect the made booklet or the current page? | User Guide v1.1 §11 |

**Role:** Company admin

**Preconditions:**

1. A departure whose booklet has been made and sent (BOOK-003), with at least one visible message.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Hide one visible message with a reason. | Hidden after booklet | "The message is hidden." appears. |
| 2 | Open the booklet sent by email (attachment or link). | | The booklet still contains the message hidden in step 1. |

---

#### BOOK-014 · Page cannot be changed once the booklet has been made

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §14 |

**Role:** Leaver

**Preconditions:**

1. A Closed departure whose booklet has been made exists (seeded); its leaver is signed in on the builder.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Change the farewell message. | Added text | The save bar reads "Not saved — your booklet has been made, so your page can no longer be changed." |
| 2 | Reload the builder and the public page. | | The farewell message is unchanged. |

---
