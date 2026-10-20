# 06 · Preview, Publish & Share

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 16 (+3 data-variant rows)  
**Priority:** P1 2 · P2 9 · P3 5 · **★ Critical:** 1 · **Smoke:** 1 · **E2E:** 2 · **Auto:** 15 · **Manual:** 1 · **Review:** 2

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [PUB-001](#pub-001--step-3-shows-the-private-preview-note-and-the-what-happens-next-timeline) | Step 3 shows the private-preview note and the "WHAT HAPPENS NEXT" timeline | Preview and checklist | P2 | — | Auto-UI | Review |  |
| [PUB-002](#pub-002--preview-opens-the-page-full-size-and-back-to-editing-returns-to-step-3) | "Preview" opens the page full size and "Back to editing" returns to step 3 | Preview and checklist | P3 | — | Auto-UI | Active |  |
| [PUB-003](#pub-003--on-your-page-checklist-marks-rows--done--optional-empty-and--required-missing) | "ON YOUR PAGE" checklist marks rows ✓ done, – optional empty and ! required missing | Preview and checklist | P2 | — | Auto-UI | Active |  |
| [PUB-004](#pub-004--publish--get-link-is-greyed-out-with-the-reason-while-a-required-item-is-missing) | "Publish & get link" is greyed out with the reason while a required item is missing | Preview and checklist | P2 | — | Auto-UI | Active | 4 |
| [PUB-005](#pub-005--publish-dialog-explains-the-permanent-link-and-cancel-keeps-the-page-a-draft) | Publish dialog explains the permanent link and "Cancel" keeps the page a draft | Publishing | P2 | — | Auto-UI | Active |  |
| [PUB-006](#-pub-006--publishing-a-complete-draft-makes-the-page-live-with-a-shareable-link) | ★ Publishing a complete draft makes the page live with a shareable link | Publishing | P1 | @smoke @e2e | Auto-UI | Active |  |
| [PUB-007](#pub-007--published-page-appears-on-the-alumni-wall-with-5-days-left-to-write) | Published page appears on the Alumni Wall with "5 days left to write" | Publishing | P1 | @e2e | Auto-UI | Review |  |
| [PUB-008](#pub-008--copy-link-copies-the-page-address) | "Copy link" copies the page address | Publishing | P2 | — | Auto-UI | Active |  |
| [PUB-009](#pub-009--unsaved-invalid-change-blocks-publishing-with-nothing-was-published) | Unsaved invalid change blocks publishing with "nothing was published" | Publishing | P3 | — | Auto-UI | Active |  |
| [PUB-010](#pub-010--a-failed-connection-while-publishing-leaves-the-page-a-draft) | A failed connection while publishing leaves the page a draft | Publishing | P3 | — | Auto-UI | Active |  |
| [PUB-011](#pub-011--live-builder-shows-messages-close-date-five-days-after-publishing) | Live builder shows "Messages close <date>" five days after publishing | After publishing | P2 | — | Auto-UI | Active |  |
| [PUB-012](#pub-012--edits-to-a-live-page-show-on-the-page-straight-away) | Edits to a live page show on the page straight away | After publishing | P2 | — | Auto-UI | Active |  |
| [PUB-013](#pub-013--clearing-the-farewell-on-a-live-page-is-refused) | Clearing the farewell on a live page is refused | After publishing | P3 | — | Auto-UI | Active |  |
| [PUB-014](#pub-014--page-is-locked-once-the-booklet-has-been-made) | Page is locked once the booklet has been made | After publishing | P2 | — | Auto-UI | Active |  |
| [PUB-015](#pub-015--personal-email-cannot-be-changed-after-the-booklet-is-made) | Personal email cannot be changed after the booklet is made | After publishing | P3 | — | Auto-UI | Active |  |
| [PUB-016](#pub-016--message-window-closes-five-days-after-publishing-not-on-the-last-day) | Message window closes five days after publishing, not on the last day | After publishing | P2 | — | Manual | Active |  |
<!-- /generated:summary -->

## Test cases

### Preview and checklist

#### PUB-001 · Step 3 shows the private-preview note and the "WHAT HAPPENS NEXT" timeline

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — dev (19 Oct 2026): pages leave the UI 45 days after the last working day (data stays in the DB); the guide and the app footer say 90 days. Which is right — and should the on-screen text change? | User Guide v1.1 §7 (FW-015) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") with a known last working day is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "3 Preview & share" in the step bar. | | Step 3 opens with "Only you can see this. You’ll get a link to share after you publish." and a preview of the page. |
| 2 | Read "WHAT HAPPENS NEXT". | | Four rows: "Draft — Only you can see it", "Open for messages — 5 days from when you publish", "Last days — The final day of your 5-day window" and "On the Alumni Wall — Until <date>, 90 days after your last day". |
| 3 | Check the "On the Alumni Wall" date. | last working day + 90 days | The date is 90 days after the leaver's last working day. |

---

#### PUB-002 · "Preview" opens the page full size and "Back to editing" returns to step 3

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §7 (FW-018) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") with a farewell written is signed in and on builder step 3 "Preview & share".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Preview". | | The page opens full size in the chosen theme, with the farewell, and "Back to editing" and "Publish & get link" at the end. |
| 2 | Click "Back to editing". | | Builder step 3 "Preview & share" is shown again; the page is still a draft ("Not published yet"). |

---

#### PUB-003 · "ON YOUR PAGE" checklist marks rows ✓ done, – optional empty and ! required missing

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §7 (FW-015) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in, with no farewell, no personal email, no portrait and empty sections.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "3 Preview & share" and read "ON YOUR PAGE". | | Rows "Theme", "Profile photo", "Farewell message", "Booklet email", "Social links", "What’s next", "Proud moments" and "A moment to remember", each with "Edit". |
| 2 | Check the marks. | | "Theme" shows "✓"; "Farewell message" and "Booklet email" show "!"; "Profile photo" and the empty sections show "–". |
| 3 | Click "Edit" on the "Farewell message" row. | | Builder step 2 opens at "FAREWELL MESSAGE · REQUIRED". |
| 4 | Write the farewell, save a personal email and fill "What’s next", then return to step 3. | "Thank you all"; qa.leaver.personal@gmail.com; "Joining a start-up" | "Farewell message", "Booklet email" and "What’s next" now show "✓". |

---

#### PUB-004 · "Publish & get link" is greyed out with the reason while a required item is missing

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §7 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in.
2. Everything required is complete (farewell, title, department, saved personal email) except the item in the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "3 Preview & share". | No farewell message | "Publish & get link" is greyed out and cannot be clicked. |
| 2 | Read the reason under the button. | | It reads "Write your farewell message to publish." |
| 3 | Complete the missing item and return to step 3. | | "Publish & get link" can be clicked. |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) no farewell message | User Guide v1.1 §7 | "Write your farewell message to publish." |
| 2 | no personal email saved | User Guide v1.1 §7 | "Add your personal email first: it’s where your booklet will be sent." |
| 3 | title empty | User Guide v1.1 §7 | Review; the guide gives no reason text for a missing title |
| 4 | department empty | User Guide v1.1 §7 | Review; the guide gives no reason text for a missing department |

---

### Publishing

#### PUB-005 · Publish dialog explains the permanent link and "Cancel" keeps the page a draft

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §7 (FW-016) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") with farewell, title, department and a saved personal email is signed in and on builder step 3 "Preview & share".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Publish & get link". | | The dialog "Publish your page?" opens and reads "The link can’t be changed or taken down, your 5-day window for messages starts today, and nobody is notified — you share the link." with "Publish now" and "Cancel". |
| 2 | Click "Cancel". | | The dialog closes. The top bar still shows "Draft · last day <date>" and step 3's subtitle reads "Not published yet". |
| 3 | Open the Alumni Wall. | | No card for this leaver is on the wall. |

---

#### ★ PUB-006 · Publishing a complete draft makes the page live with a shareable link

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI | Active | User Guide v1.1 §7 (FW-019) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") with farewell, title, department and a saved personal email is signed in and on builder step 3 "Preview & share".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Publish & get link". | | The dialog "Publish your page?" opens. |
| 2 | Click "Publish now". | | "Your page is live", "Nobody is notified — share the link with your colleagues.", "Copy link" and "Back to the builder" are shown. |
| 3 | Click "Back to the builder". | | The top bar shows "Live · last day <date>", step 3's subtitle reads "Live", and "YOUR PAGE IS LIVE" appears with the page address and "Copy link". |
| 4 | Open the page address in a new tab. | | The farewell page opens in the chosen theme with the leaver's farewell. |

---

#### PUB-007 · Published page appears on the Alumni Wall with "5 days left to write"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @e2e | Auto-UI | Review — Appendix C #4: "N days left to write" on wall cards not yet confirmed on an open page | User Guide v1.1 §7 |

**Role:** Leaver, Employee

**Preconditions:**

1. A leaver has just published their page (as in PUB-006).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the Alumni Wall. | | A card for the leaver is shown, with the company pill, portrait, name, "Department · Mon YYYY" and the start of the farewell. |
| 2 | Read the status on the right of the card. | | It reads "5 days left to write". |
| 3 | Click "Open page →" on the card. | | The leaver's farewell page opens. |

---

#### PUB-008 · "Copy link" copies the page address

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §7 (FW-019) |

**Role:** Leaver

**Preconditions:**

1. A leaver with a live page is signed in and on builder step 3, with clipboard access granted to the browser.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Copy link" under "YOUR PAGE IS LIVE". | | The clipboard holds the page address shown under "YOUR PAGE IS LIVE". |
| 2 | Open the copied address. | | The leaver's farewell page opens. |

---

#### PUB-009 · Unsaved invalid change blocks publishing with "nothing was published"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §7 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") with farewell, title, department and a saved personal email is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | In step 1, type an invalid number in "WhatsApp" after "+95". | 812345678 | The save bar shows "Not saved: fix the highlighted field". |
| 2 | Open step 3, click "Publish & get link", then "Publish now". | | "Your latest changes aren’t saved, so nothing was published." is shown, and the page stays a draft ("Not published yet"). |

---

#### PUB-010 · A failed connection while publishing leaves the page a draft

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §7 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") with everything required is signed in and on builder step 3.
2. The test can make the publish request fail (for example by routing it to abort).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Make the publish request fail, click "Publish & get link", then "Publish now". | | "The connection failed. Nothing was published." is shown. |
| 2 | Restore the connection and reload. | | The top bar still shows "Draft · last day <date>". |

---

### After publishing

#### PUB-011 · Live builder shows "Messages close <date>" five days after publishing

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §7 (FW-019) |

**Role:** Leaver

**Preconditions:**

1. A leaver published their page today and is on builder step 3.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Read the text under "YOUR PAGE IS LIVE". | today + 5 days | It reads "Messages close <date>", with the date five days after today (not five days after the last working day). |

---

#### PUB-012 · Edits to a live page show on the page straight away

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §7 |

**Role:** Leaver, Visitor

**Preconditions:**

1. A leaver with a live page is signed in and on builder step 1.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Read the heading text in the builder. | | "Your page is live. Changes save as you type and show on your page straight away." |
| 2 | Change "What’s next" and wait for "Saved". | "Now at a new role in Mandalay" | The save bar shows "Saved". |
| 3 | Open the page link in a new browser context as a visitor. | | The page shows "Now at a new role in Mandalay" without publishing again. |

---

#### PUB-013 · Clearing the farewell on a live page is refused

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §14 |

**Role:** Leaver

**Preconditions:**

1. A leaver with a live page is signed in and on builder step 2.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Clear "FAREWELL MESSAGE · REQUIRED". | (empty) | The save bar shows "Not saved — a live page needs a farewell message." |
| 2 | Reload the page. | | The previous farewell is still there, and the live page still shows it. |

---

#### PUB-014 · Page is locked once the booklet has been made

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §7 |

**Role:** Leaver

**Preconditions:**

1. A departure in status Closed exists whose booklet has been made (seeded), and its leaver is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Your farewell page" and go to step 3. | | "Your booklet was made on <date>. Your page can no longer be changed." and "Messages closed <date> · N colleagues so far" are shown. |
| 2 | Try to change "What’s next" in step 1. | "Late edit" | The change is refused: the save bar shows "Not saved — your booklet has been made, so your page can no longer be changed." (or the field cannot be edited). |
| 3 | Reload the page. | | "What’s next" shows its earlier value. |

---

#### PUB-015 · Personal email cannot be changed after the booklet is made

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §6 |

**Role:** Leaver

**Preconditions:**

1. A departure in status Closed exists whose booklet has been made (seeded), and its leaver is signed in and on builder step 2.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type a new address in "Personal email · required" and click "Save email". | qa.new.address@gmail.com | "Your booklet has been made, so this address can no longer be changed." is shown and the address is not changed. |

---

#### PUB-016 · Message window closes five days after publishing, not on the last day

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Manual — needs a way to move time; automate once a test hook exists | Active | User Guide v1.1 §7 |

**Role:** Leaver, Visitor

**Preconditions:**

1. A leaver published their page on a known day D.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | On day D + 4, open the page as a visitor. | | The message button is shown and a message can be sent. |
| 2 | After the window closes (after day D + 5), open the page. | | "The five-day window has closed" and "New messages can’t be left on this page." are shown; the wall card reads "Messages closed". |
| 3 | Open the leaver's builder step 3. | | It reads "Messages closed <date> · N colleagues so far". |

---
