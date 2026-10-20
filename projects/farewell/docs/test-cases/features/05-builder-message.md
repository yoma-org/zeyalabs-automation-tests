# 05 · Builder · Write a Message

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 14 (+10 data-variant rows)  
**Priority:** P1 2 · P2 6 · P3 6 · **★ Critical:** 2 · **Smoke:** 2 · **E2E:** 2 · **Auto:** 14 · **Manual:** 0 · **Review:** 3

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [WRITE-001](#write-001--name-burmese-name-and-last-day-are-shown-read-only-in-your-details) | Name, Burmese name and last day are shown read-only in "YOUR DETAILS" | Your details | P2 | — | Auto-UI | Review |  |
| [WRITE-002](#write-002--edited-title-or-department-is-saved-and-shown-on-the-page-preview) | Edited title or department is saved and shown on the page preview | Your details | P2 | — | Auto-UI | Active | 3 |
| [WRITE-003](#write-003--title-or-department-longer-than-120-characters-is-not-accepted) | Title or department longer than 120 characters is not accepted | Your details | P3 | — | Auto-UI | Review | 2 |
| [WRITE-004](#write-004--empty-title-or-department-is-outlined-in-red-with-required) | Empty title or department is outlined in red with "Required" | Your details | P3 | — | Auto-UI | Active | 2 |
| [WRITE-005](#write-005--chosen-portrait-photo-shows-in-your-portrait-and-the-preview) | Chosen portrait photo shows in "Your portrait" and the preview | Your details | P2 | — | Auto-UI | Active |  |
| [WRITE-006](#-write-006--writing-the-farewell-updates-the-counter-subtitle-and-enables-next) | ★ Writing the farewell updates the counter, subtitle and enables "Next" | Farewell message | P1 | @smoke @e2e | Auto-UI | Active |  |
| [WRITE-007](#write-007--farewell-of-2000-characters-is-saved-and-2001-is-refused) | Farewell of 2000 characters is saved and 2001 is refused | Farewell message | P3 | — | Auto-UI | Active |  |
| [WRITE-008](#write-008--starter-buttons-put-text-into-the-farewell-message) | Starter buttons put text into the farewell message | Farewell message | P3 | — | Auto-UI | Active | 3 |
| [WRITE-009](#write-009--farewell-written-in-burmese-is-saved-and-shown-unchanged) | Farewell written in Burmese is saved and shown unchanged | Farewell message | P2 | — | Auto-UI | Active |  |
| [WRITE-010](#write-010--next-preview--share--stays-greyed-out-while-the-farewell-is-empty) | "Next: Preview & share →" stays greyed out while the farewell is empty | Farewell message | P2 | — | Auto-UI | Active |  |
| [WRITE-011](#-write-011--saving-a-personal-email-shows-saved-your-booklet-will-be-sent-here) | ★ Saving a personal email shows "Saved. Your booklet will be sent here." | Personal email | P1 | @smoke @e2e | Auto-UI | Active |  |
| [WRITE-012](#write-012--address-that-is-not-an-email-is-refused-with-that-doesnt-look-like-an-email-address) | Address that is not an email is refused with "That doesn’t look like an email address…" | Personal email | P3 | — | Auto-UI | Active | 4 |
| [WRITE-013](#write-013--clearing-a-saved-personal-email-asks-for-a-new-one-instead) | Clearing a saved personal email asks for a new one instead | Personal email | P3 | — | Auto-UI | Active |  |
| [WRITE-014](#write-014--work-email-is-refused-as-the-personal-email) | Work email is refused as the personal email | Personal email | P2 | — | Auto-UI | Review | 2 |
<!-- /generated:summary -->

## Test cases

### Your details

#### WRITE-001 · Name, Burmese name and last day are shown read-only in "YOUR DETAILS"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — dev (19 Oct 2026): pages leave the UI 45 days after the last working day (data stays in the DB); the guide and the app footer say 90 days. Which is right — and should the on-screen text change? | User Guide v1.1 §6 (FW-012) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") in Wave Money is signed in, with a name and a Burmese name on the Employee List.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "2 Write a message" in the step bar. | | Step 2 opens with "YOUR DETAILS". |
| 2 | Look at "YOUR NAME", "NAME IN BURMESE" and "LAST DAY AT WAVE MONEY". | | They show the leaver's name, Burmese name and last working day from the Employee List and departure, and cannot be edited. |
| 3 | Read the notes in "YOUR DETAILS". | | "Check these are correct. They appear on your page and in your booklet." and "Messages close 5 days after you publish, not 5 days after this date. Your page leaves the Alumni Wall 90 days after it." |

---

#### WRITE-002 · Edited title or department is saved and shown on the page preview

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §6 (FW-012) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 2 "Write a message".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Replace the value in the field. | "TITLE": "Senior QA Engineer" | The save bar shows "Saving…", then "Saved". |
| 2 | Reload the page. | | The field keeps the new value. |
| 3 | Open "3 Preview & share". | | The preview shows the new value ("Senior QA Engineer · Wave Money"). |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Title | User Guide v1.1 §6 (FW-012) | Senior QA Engineer |
| 2 | Department | User Guide v1.1 §6 (FW-012) | Quality Engineering |
| 3 | exactly 120 characters | User Guide v1.1 §14 | Title of 120 characters |

---

#### WRITE-003 · Title or department longer than 120 characters is not accepted

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — the guide gives the 120-character limit but no message; confirm whether input stops at 120 or a refusal is shown | User Guide v1.1 §14 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 2 "Write a message".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type text longer than the limit into the field. | "TITLE": 121 characters | The field keeps no more than 120 characters, or the change is refused and not saved. |
| 2 | Reload the page. | | The saved value is at most 120 characters. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Title, 121 characters | User Guide v1.1 §14 | |
| 2 | Department, 121 characters | User Guide v1.1 §14 | |

---

#### WRITE-004 · Empty title or department is outlined in red with "Required"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §6 (FW-014) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 2 "Write a message".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Clear the field. | "TITLE" | The field is outlined in red with "Required" underneath. |
| 2 | Type a value again. | "QA Engineer" | The red outline and "Required" go away, and the save bar shows "Saved". |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Title | User Guide v1.1 §6 (FW-014) | |
| 2 | Department | User Guide v1.1 §6 (FW-014) | |

---

#### WRITE-005 · Chosen portrait photo shows in "Your portrait" and the preview

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §6 (FW-012) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") with no portrait is signed in and on builder step 2 "Write a message".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Choose a photo" under "Your portrait" and pick the image. | portrait.jpg | The portrait shows under "Your portrait" and the save bar shows "Saved". |
| 2 | Open "3 Preview & share". | | The preview shows the portrait, and the "Profile photo" row under "ON YOUR PAGE" is marked "✓". |

---

### Farewell message

#### ★ WRITE-006 · Writing the farewell updates the counter, subtitle and enables "Next"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI | Active | User Guide v1.1 §6 (FW-013) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 2 "Write a message".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look at "FAREWELL MESSAGE · REQUIRED" and the save bar. | | The counter reads "0 / 2000", step 2's subtitle reads "Farewell still to write", and "Next: Preview & share →" is greyed out. |
| 2 | Type the farewell. | "Thank you all for five wonderful years." (39 characters) | The counter reads "39 / 2000" and the save bar shows "Saved". |
| 3 | Read step 2's subtitle. | | It reads "Farewell written". |
| 4 | Click "Next: Preview & share →". | | Step 3 "Preview & share" opens. |

---

#### WRITE-007 · Farewell of 2000 characters is saved and 2001 is refused

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §14 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 2 "Write a message".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type a farewell of exactly 2000 characters. | 2000 characters | The counter reads "2000 / 2000" and the save bar shows "Saved". |
| 2 | Type one more character. | 2001 characters | Nothing is saved: the save bar shows "Not saved — your farewell is longer than 2000 characters." (or the box does not take the extra character). |

---

#### WRITE-008 · Starter buttons put text into the farewell message

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §6 (FW-013) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 2 "Write a message", with an empty farewell.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click the starter button. | "What I’ll miss most…" | The farewell box contains the starter text, the counter is above "0 / 2000", and the save bar shows "Saved". |
| 2 | Read step 2's subtitle. | | It reads "Farewell written" and "Next: Preview & share →" can be clicked. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) What I’ll miss most… | User Guide v1.1 §6 (FW-013) | |
| 2 | Thank you for… | User Guide v1.1 §6 (FW-013) | |
| 3 | Use an example | User Guide v1.1 §6 (FW-013) | |

---

#### WRITE-009 · Farewell written in Burmese is saved and shown unchanged

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §6 (FW-013) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 2 "Write a message".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type the farewell in Burmese. | "ကျေးဇူးတင်ပါတယ်။ အားလုံးကို လွမ်းနေမှာပါ။" | The save bar shows "Saved" and the counter counts the characters. |
| 2 | Reload the page. | | The farewell box shows the same Burmese text, unchanged. |
| 3 | Open "3 Preview & share". | | The preview shows the Burmese farewell. |

---

#### WRITE-010 · "Next: Preview & share →" stays greyed out while the farewell is empty

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §6 (FW-013) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 2 "Write a message", with a farewell already written.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look at the save bar. | | It shows "← Back", the status and "Next: Preview & share →", which can be clicked. |
| 2 | Clear the farewell box. | | "Next: Preview & share →" is greyed out, and step 2's subtitle reads "Farewell still to write". |
| 3 | Click "← Back". | | Step 1 "Choose your style" opens. |

---

### Personal email

#### ★ WRITE-011 · Saving a personal email shows "Saved. Your booklet will be sent here."

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI | Active | User Guide v1.1 §6 (FW-013) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") without a personal email is signed in and on builder step 2 "Write a message".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Read "YOUR BOOKLET". | | It reads "Sent after messages close, 5 days after you publish." and "This is where your booklet will be sent after you leave: the company contacts leavers by personal email only. It isn’t shown on your page or to your People team." |
| 2 | Type the address in "Personal email · required". | qa.leaver.personal@gmail.com | The address is shown in the field. |
| 3 | Click "Save email". | | "Saved. Your booklet will be sent here." is shown. |
| 4 | Reload the page. | | The field still holds qa.leaver.personal@gmail.com, and the "Booklet email" row in step 3's checklist is marked "✓". |

---

#### WRITE-012 · Address that is not an email is refused with "That doesn’t look like an email address…"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §6 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 2 "Write a message".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type the value in "Personal email · required". | qa.leaver.gmail.com | The value is shown in the field. |
| 2 | Click "Save email". | | "That doesn’t look like an email address. Check it and save again." is shown, and the address is not saved. |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) no @ | User Guide v1.1 §6 | qa.leaver.gmail.com |
| 2 | no domain | User Guide v1.1 §6 | qa.leaver@ |
| 3 | no local part | User Guide v1.1 §6 | @gmail.com |
| 4 | contains a space | User Guide v1.1 §6 | qa leaver@gmail.com |

---

#### WRITE-013 · Clearing a saved personal email asks for a new one instead

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §6 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 2 "Write a message".
2. A personal email has been saved.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Clear "Personal email · required" and click "Save email". | (empty) | "Your booklet needs a personal email. Enter a new one to replace it." is shown. |
| 2 | Reload the page. | | The previously saved personal email is still there. |

---

#### WRITE-014 · Work email is refused as the personal email

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — Appendix C #5: confirm that "Save email" refuses a work address, and with which message | User Guide v1.1 §6 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") in Wave Money is signed in and on builder step 2 "Write a message".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type the leaver's own work email in "Personal email · required". | <leaver's work email on the Employee List> | The value is shown in the field. |
| 2 | Click "Save email". | | The address is not accepted: "Saved. Your booklet will be sent here." is not shown and a refusal message is shown. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) the leaver's own work email | User Guide v1.1 §6 | |
| 2 | another address at a Yoma Group company domain | User Guide v1.1 §6 | Review; which company domains count as work email is not listed |

---
