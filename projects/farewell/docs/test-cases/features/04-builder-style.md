# 04 · Builder · Choose Your Style

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 20 (+36 data-variant rows)  
**Priority:** P1 1 · P2 7 · P3 12 · **★ Critical:** 1 · **Smoke:** 1 · **E2E:** 1 · **Auto:** 20 · **Manual:** 0 · **Review:** 3

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [STYLE-001](#style-001--builder-step-1-shows-the-step-bar-subtitles-and-the-draft-intro-text) | Builder step 1 shows the step bar, subtitles and the draft intro text | Step bar and theme | P2 | — | Auto-UI | Active |  |
| [STYLE-002](#-style-002--choosing-a-theme-tile-outlines-it-renames-the-preview-and-saves) | ★ Choosing a theme tile outlines it, renames the preview and saves | Step bar and theme | P1 | @smoke @e2e | Auto-UI | Active |  |
| [STYLE-003](#style-003--each-of-the-12-themes-can-be-selected-and-is-named-in-the-preview-heading) | Each of the 12 themes can be selected and is named in the preview heading | Step bar and theme | P3 | — | Auto-UI | Active | 12 |
| [STYLE-004](#style-004--steps-in-the-step-bar-can-be-opened-in-any-order) | Steps in the step bar can be opened in any order | Step bar and theme | P3 | — | Auto-UI | Active |  |
| [STYLE-005](#style-005--all-four-sections-under-on-your-page-are-switched-on-at-the-start) | All four sections under "ON YOUR PAGE" are switched on at the start | Sections on your page | P2 | — | Auto-UI | Active |  |
| [STYLE-006](#style-006--switching-a-section-off-removes-it-from-the-preview-and-the-section-count) | Switching a section off removes it from the preview and the section count | Sections on your page | P2 | — | Auto-UI | Active | 4 |
| [STYLE-007](#style-007--valid-social-links-are-saved-and-shown-as-buttons-in-the-preview) | Valid social links are saved and shown as buttons in the preview | Social links | P2 | — | Auto-UI | Active | 3 |
| [STYLE-008](#style-008--whatsapp-or-viber-number-that-is-not-a-myanmar-mobile-is-refused) | WhatsApp or Viber number that is not a Myanmar mobile is refused | Social links | P3 | — | Auto-UI | Active | 7 |
| [STYLE-009](#style-009--phone-fields-limit-the-length-of-the-number-after-95) | Phone fields limit the length of the number after "+95" | Social links | P3 | — | Auto-UI | Review |  |
| [STYLE-010](#style-010--linkedin-or-facebook-address-that-is-not-a-full-https-address-is-outlined-in-red) | LinkedIn or Facebook address that is not a full https:// address is outlined in red | Social links | P3 | — | Auto-UI | Active | 5 |
| [STYLE-011](#style-011--refused-social-link-shows-its-not-saved--reason-text-in-the-save-bar) | Refused social link shows its "Not saved — <reason>" text in the save bar | Social links | P3 | — | Auto-UI | Review | 4 |
| [STYLE-012](#style-012--section-text-at-its-limit-is-saved-and-one-character-over-is-refused) | Section text at its limit is saved and one character over is refused | Section content | P3 | — | Auto-UI | Active | 4 |
| [STYLE-013](#style-013--blank-proud-moments-are-left-out-of-the-page) | Blank proud moments are left out of the page | Section content | P3 | — | Auto-UI | Active |  |
| [STYLE-014](#style-014--a-moment-to-remember-shows-the-chosen-photo-and-caption) | A moment to remember shows the chosen photo and caption | Section content | P2 | — | Auto-UI | Active | 3 |
| [STYLE-015](#style-015--a-photo-that-is-not-jpeg-png-or-webp-is-not-accepted) | A photo that is not JPEG, PNG or WebP is not accepted | Section content | P3 | — | Auto-UI | Review | 3 |
| [STYLE-016](#style-016--the-21st-photo-in-one-day-is-refused-with-the-daily-limit-message) | The 21st photo in one day is refused with the daily limit message | Section content | P3 | — | Auto-UI | Active |  |
| [STYLE-017](#style-017--save-bar-goes-from-changes-save-as-you-type-to-saving-to-saved) | Save bar goes from "Changes save as you type." to "Saving…" to "Saved" | Save bar | P2 | — | Auto-UI | Active |  |
| [STYLE-018](#style-018--go-to-field-takes-the-leaver-to-the-highlighted-field) | "Go to field" takes the leaver to the highlighted field | Save bar | P3 | — | Auto-UI | Active |  |
| [STYLE-019](#style-019--a-failed-connection-shows-not-saved--the-connection-failed) | A failed connection shows "Not saved — the connection failed…" | Save bar | P3 | — | Auto-UI | Active |  |
| [STYLE-020](#style-020--theme-section-switches-and-section-content-are-kept-after-a-reload) | Theme, section switches and section content are kept after a reload | Save bar | P2 | — | Auto-UI | Active |  |
<!-- /generated:summary -->

## Test cases

### Step bar and theme

#### STYLE-001 · Builder step 1 shows the step bar, subtitles and the draft intro text

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §5 (FW-010) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and is on the Alumni Wall.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Your farewell page" in the top bar. | | Builder step 1 opens. The top bar shows "Draft · last day <last working day>" instead of the "Your farewell page" button. |
| 2 | Look at the step bar. | | It shows "1 Choose your style", "2 Write a message" and "3 Preview & share". |
| 3 | Read the step subtitles. | | Step 1 reads "<Theme> · 4 sections", step 2 reads "Farewell still to write" and step 3 reads "Not published yet". |
| 4 | Read the heading above the themes. | | "Build your page" with "A theme and a message are all you need. Changes save as you type, and only you can see your page until you publish." |
| 5 | Look at the save bar at the bottom. | | It shows a status line and "Next: Write a message →". |

---

#### ★ STYLE-002 · Choosing a theme tile outlines it, renames the preview and saves

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke @e2e | Auto-UI | Active | User Guide v1.1 §5 (FW-010) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click a theme tile under "CHOOSE YOUR STYLE" that is not the selected one. | Ocean | The "Ocean" tile is outlined and named, and its description "Blues and sandy neutrals — calm, open, a fresh-start feeling." appears beside it. |
| 2 | Read the phone preview heading. | | It reads "PHONE PREVIEW · OCEAN" and the preview shows the page in the Ocean theme. |
| 3 | Read the step 1 subtitle. | | It reads "Ocean · 4 sections". |
| 4 | Look at the save bar. | | It shows "Saved". |
| 5 | Click "Next: Write a message →". | | Builder step 2 "Write a message" opens. |

---

#### STYLE-003 · Each of the 12 themes can be selected and is named in the preview heading

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §9 (FW-030) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look at "CHOOSE YOUR STYLE". | | 12 theme tiles are shown. |
| 2 | Click the theme tile. | Warm Send-Off | The tile is outlined and named, and its description appears beside it ("Soft terracotta and cream, hand-written type — a hug in page form."). |
| 3 | Read the phone preview heading and the step 1 subtitle. | | "PHONE PREVIEW · WARM SEND-OFF" and "Warm Send-Off · 4 sections". The save bar shows "Saved". |

**Data variants (12 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Warm Send-Off | User Guide v1.1 §9 (FW-030) | |
| 2 | Midnight | User Guide v1.1 §9 (FW-031) | |
| 3 | Garden | User Guide v1.1 §9 (FW-032) | |
| 4 | Ocean | User Guide v1.1 §9 (FW-033) | |
| 5 | Golden Hour | User Guide v1.1 §9 (FW-034) | |
| 6 | Clean Slate | User Guide v1.1 §9 (FW-035) | |
| 7 | Retro Arcade | User Guide v1.1 §9 (FW-036) | |
| 8 | Cozy Cabin | User Guide v1.1 §9 (FW-037) | |
| 9 | Neon Nights | User Guide v1.1 §9 (FW-038) | |
| 10 | Pastel Dream | User Guide v1.1 §9 (FW-039) | |
| 11 | Monochrome | User Guide v1.1 §9 (FW-040) | |
| 12 | Wanderlust | User Guide v1.1 §9 (FW-041) | |

---

#### STYLE-004 · Steps in the step bar can be opened in any order

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §5 (FW-010) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "3 Preview & share" in the step bar. | | Step 3 opens, although step 2 has not been completed. |
| 2 | Click "2 Write a message". | | Step 2 opens. |
| 3 | Click "1 Choose your style". | | Step 1 opens with the same theme still selected. |

---

### Sections on your page

#### STYLE-005 · All four sections under "ON YOUR PAGE" are switched on at the start

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §5 (FW-011) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look at the cards under "ON YOUR PAGE". | | Four cards: "Social links", "What’s next", "Proud moments" and "A moment to remember", each with an on/off switch. |
| 2 | Check each switch. | | All four switches are on. |
| 3 | Read the step 1 subtitle. | | It reads "<Theme> · 4 sections". |

---

#### STYLE-006 · Switching a section off removes it from the preview and the section count

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §5 (FW-011) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".
2. All four sections are on, and the section has content so it shows in the phone preview.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Switch off the section under "ON YOUR PAGE". | What’s next | The switch is off and the section no longer shows in the phone preview. |
| 2 | Read the step 1 subtitle. | | It reads "<Theme> · 3 sections". The save bar shows "Saved". |
| 3 | Switch the section on again. | | The section shows in the preview again with its content kept, and the subtitle reads "<Theme> · 4 sections". |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) What’s next | User Guide v1.1 §5 (FW-011) | |
| 2 | Social links | User Guide v1.1 §5 (FW-011) | |
| 3 | Proud moments | User Guide v1.1 §5 (FW-011) | |
| 4 | A moment to remember | User Guide v1.1 §5 (FW-011) | |

---

### Social links

#### STYLE-007 · Valid social links are saved and shown as buttons in the preview

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §5 (FW-011) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".
2. "Social links" is switched on.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Read the "Social links" card. | | It has "LinkedIn", "Facebook", "WhatsApp" and "Viber"; WhatsApp and Viber have a fixed "+95". It reads "Anyone who can see your page can see these numbers." and "All are optional." |
| 2 | Type the address in "LinkedIn". | https://www.linkedin.com/in/qa-leaver | No red outline. The save bar shows "Saving…", then "Saved". |
| 3 | Type the address in "Facebook". | https://www.facebook.com/qa.leaver | No red outline. The save bar shows "Saved". |
| 4 | Type the number in "WhatsApp" after "+95". | 9123456789 | No red outline. The save bar shows "Saved". |
| 5 | Type the number in "Viber" after "+95". | 91234567 | No red outline. The save bar shows "Saved". |
| 6 | Look at the phone preview. | | It shows buttons "LinkedIn", "Facebook", "WhatsApp · +95 9 …" and "Viber · +95 9 …". |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) WhatsApp 9 + 9 digits, Viber 9 + 7 digits | User Guide v1.1 §14 | |
| 2 | both 9 + 8 digits | User Guide v1.1 §14 | WhatsApp 912345678, Viber 998765432 |
| 3 | number typed with spaces as in the guide example | User Guide v1.1 §5 | WhatsApp "9 123 456 789" |

---

#### STYLE-008 · WhatsApp or Viber number that is not a Myanmar mobile is refused

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §5 (FW-017) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".
2. "Social links" is switched on.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type the number in "WhatsApp" after "+95". | 812345678 | The field is outlined in red with "Please enter a valid Myanmar mobile number: 9 followed by 7 to 9 digits, such as 9 123 456 789." |
| 2 | Look at the save bar. | | It shows "Not saved: fix the highlighted field" and "Go to field". |
| 3 | Clear the field. | | The red outline and the message go away, and the save bar shows "Saved". |

**Data variants (7 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) WhatsApp, does not start with 9 | User Guide v1.1 §5 (FW-017) | 812345678 |
| 2 | WhatsApp, too short (9 + 6 digits) | User Guide v1.1 §14 | 9123456 |
| 3 | WhatsApp, too long (9 + 10 digits) | UAT Feedback (UAT-006) | 91234567890 |
| 4 | WhatsApp, letters | User Guide v1.1 §14 | 9abcdefgh |
| 5 | WhatsApp, foreign number with country code | User Guide v1.1 §17 | 66812345678 |
| 6 | Viber, does not start with 9 | User Guide v1.1 §5 (FW-017) | 712345678 |
| 7 | Viber, too short (9 + 6 digits) | User Guide v1.1 §14 | 9123456 |

---

#### STYLE-009 · Phone fields limit the length of the number after "+95"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — UAT-006 asks for a length limit; confirm whether the field stops input after 10 digits or only shows the error | UAT Feedback (UAT-006) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".
2. "Social links" is switched on.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type a long number in "WhatsApp" after "+95". | 912345678901234 | The field holds at most 10 digits (9 followed by 9 digits); longer input is not kept or is refused with the Myanmar mobile number message. |
| 2 | Repeat in "Viber". | 912345678901234 | Same result as for WhatsApp. |

---

#### STYLE-010 · LinkedIn or Facebook address that is not a full https:// address is outlined in red

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §5 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".
2. "Social links" is switched on.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type the address in "LinkedIn". | www.linkedin.com/in/qa-leaver | The field is outlined in red, with no message under it. |
| 2 | Look at the save bar. | | It shows "Not saved: fix the highlighted field" and "Go to field". |
| 3 | Clear the field. | | The red outline goes away and the save bar shows "Saved" (social links are optional). |

**Data variants (5 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) LinkedIn without a scheme | User Guide v1.1 §5 | www.linkedin.com/in/qa-leaver |
| 2 | LinkedIn with http:// | User Guide v1.1 §14 | http://www.linkedin.com/in/qa-leaver |
| 3 | Facebook without a scheme | User Guide v1.1 §5 | facebook.com/qa.leaver |
| 4 | Facebook with http:// | User Guide v1.1 §14 | http://www.facebook.com/qa.leaver |
| 5 | Facebook https:// but not facebook.com | User Guide v1.1 §14 | https://www.example.com/qa.leaver |

---

#### STYLE-011 · Refused social link shows its "Not saved — <reason>" text in the save bar

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — §5 shows a field highlight and "Not saved: fix the highlighted field" for these inputs; confirm when the §14 "Not saved — <reason>" text appears instead | User Guide v1.1 §14 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".
2. "Social links" is switched on.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type the value in the field. | LinkedIn: http://www.linkedin.com/in/qa-leaver | The save bar shows "Not saved — the LinkedIn address needs to start with https://". |
| 2 | Reload the page. | | The refused value was not saved. |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) LinkedIn not https:// | User Guide v1.1 §14 | "Not saved — the LinkedIn address needs to start with https://" |
| 2 | Facebook not a facebook.com link | User Guide v1.1 §14 | https://www.example.com/x → "Not saved — the Facebook address needs to be a facebook.com link starting https://" |
| 3 | WhatsApp not a Myanmar mobile | User Guide v1.1 §14 | 812345678 → "Not saved — the WhatsApp number needs to be a Myanmar mobile number, 9 followed by 7 to 9 digits." |
| 4 | Viber not a Myanmar mobile | User Guide v1.1 §14 | 812345678 → "Not saved — the Viber number needs to be a Myanmar mobile number, 9 followed by 7 to 9 digits." |

---

### Section content

#### STYLE-012 · Section text at its limit is saved and one character over is refused

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §14 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".
2. All four sections are on.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type text of exactly the limit into the field. | "What’s next": 500 characters | The save bar shows "Saved" and the text shows in the phone preview. |
| 2 | Type one more character. | 501 characters | Nothing is saved: the save bar shows "Not saved — what’s next is longer than 500 characters." (or the field does not take the extra character). |
| 3 | Delete the extra character. | 500 characters | The save bar shows "Saved". |

**Data variants (4 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) What’s next, 500 | User Guide v1.1 §14 | "Not saved — what’s next is longer than 500 characters." |
| 2 | Proud moment 1, 200 | User Guide v1.1 §14 | "Not saved — a proud moment is longer than 200 characters." |
| 3 | Proud moment 3, 200 | User Guide v1.1 §14 | "Not saved — a proud moment is longer than 200 characters." |
| 4 | Caption, 140 | User Guide v1.1 §14 | "Not saved — the caption is longer than 140 characters." |

---

#### STYLE-013 · Blank proud moments are left out of the page

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §5 (FW-011) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".
2. "Proud moments" is switched on.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type text in "Proud moment 1" and "Proud moment 3"; leave "Proud moment 2" blank. | "Led the Q3 launch" / "Mentored two new testers" | The save bar shows "Saved". |
| 2 | Look at the proud moments in the phone preview. | | Exactly two proud moments are shown, with the two texts typed; there is no empty entry for "Proud moment 2". |

---

#### STYLE-014 · A moment to remember shows the chosen photo and caption

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §5 (FW-011) |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".
2. "A moment to remember" is switched on.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Choose a photo" and pick the image file. | moment.jpg (JPEG) | The photo is uploaded and shows in the card. The save bar shows "Saved". |
| 2 | Type a caption in "Caption". | "Team offsite, Bagan 2025" | The save bar shows "Saved". |
| 3 | Look at the phone preview. | | "A MOMENT TO REMEMBER" (heading wording may vary by theme) shows the photo with the caption. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) JPEG | User Guide v1.1 §5 | moment.jpg |
| 2 | PNG | User Guide v1.1 §5 | moment.png |
| 3 | WebP | User Guide v1.1 §5 | moment.webp |

---

#### STYLE-015 · A photo that is not JPEG, PNG or WebP is not accepted

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — the guide gives no on-screen message for a wrong photo format; confirm the expected text | User Guide v1.1 §14 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".
2. "A moment to remember" is switched on and has no photo.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Choose a photo" and pick the file. | moment.gif | The file is not accepted: no photo is added to the card or the preview, and an error is shown. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) GIF | User Guide v1.1 §14 | moment.gif |
| 2 | PDF | User Guide v1.1 §14 | document.pdf |
| 3 | text file renamed to .jpg | User Guide v1.1 §14 | fake.jpg |

---

#### STYLE-016 · The 21st photo in one day is refused with the daily limit message

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §5 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".
2. The leaver has already added 20 photos today (for example by choosing a photo under "A moment to remember" 20 times).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Choose a photo" under "A moment to remember" and pick an image. | moment.png | The photo is not added, and the message "You’ve added 20 photos today, the most for one day. Try again tomorrow." is shown. |

---

### Save bar

#### STYLE-017 · Save bar goes from "Changes save as you type." to "Saving…" to "Saved"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §5 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open builder step 1 without changing anything. | | The save bar shows "Changes save as you type." There is no Save button. |
| 2 | Type text in "What’s next". | "Joining a start-up in Yangon" | The save bar shows "Saving…" while the change is saved. |
| 3 | Wait for the save to finish. | | The save bar shows "Saved". |

---

#### STYLE-018 · "Go to field" takes the leaver to the highlighted field

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §5 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".
2. "Social links" is switched on.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type an invalid number in "Viber" after "+95", then scroll to the bottom of the page. | 812345678 | The save bar shows "Not saved: fix the highlighted field" and "Go to field". |
| 2 | Click "Go to field". | | The page scrolls to "Viber", which is outlined in red and has focus. |

---

#### STYLE-019 · A failed connection shows "Not saved — the connection failed…"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §14 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".
2. The test can block the builder's save requests (for example by routing them to fail).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Block the save requests, then type text in "What’s next". | "Offline edit" | The save bar shows "Not saved — the connection failed. It will try again when you next edit." |
| 2 | Unblock the save requests and type one more character. | "Offline edit." | The save bar shows "Saved". After a reload the text "Offline edit." is kept. |

---

#### STYLE-020 · Theme, section switches and section content are kept after a reload

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §5 |

**Role:** Leaver

**Preconditions:**

1. A freshly triggered leaver (departure status "Draft") is signed in and on builder step 1 "Choose your style".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Choose a theme, switch off "Proud moments", type in "What’s next" and fill "LinkedIn", and wait for "Saved". | Garden; "Moving to Singapore"; https://www.linkedin.com/in/qa-leaver | The save bar shows "Saved". |
| 2 | Reload the page. | | The "Garden" tile is selected, the preview heading reads "PHONE PREVIEW · GARDEN", "Proud moments" is off, the subtitle reads "Garden · 3 sections", and "What’s next" and "LinkedIn" hold the typed values. |

---
