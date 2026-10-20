# 08 · Themes

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 5 (+33 data-variant rows)  
**Priority:** P1 0 · P2 3 · P3 2 · **★ Critical:** 0 · **Smoke:** 0 · **E2E:** 0 · **Auto:** 4 · **Manual:** 1 · **Review:** 2

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [THEME-001](#theme-001--each-theme-shows-its-own-window-text-message-button-and-messages-heading) | Each theme shows its own window text, message button and messages heading | Theme wording | P2 | — | Auto-UI | Active | 12 |
| [THEME-002](#theme-002--on-a-closed-page-each-theme-shows-its-own-closed-window-text) | On a closed page each theme shows its own closed-window text | Theme wording | P3 | — | Auto-UI | Review | 12 |
| [THEME-003](#theme-003--changing-the-theme-on-a-live-page-changes-what-visitors-see-straight-away) | Changing the theme on a live page changes what visitors see straight away | Theme applied to the page | P2 | — | Auto-UI | Active |  |
| [THEME-004](#theme-004--each-themes-page-looks-like-its-design-colours-type-motifs) | Each theme's page looks like its design (colours, type, motifs) | Theme applied to the page | P3 | — | Manual | Active | 12 |
| [THEME-005](#theme-005--the-booklet-pdf-is-made-in-the-leavers-theme) | The booklet PDF is made in the leaver's theme | Theme in the booklet | P2 | — | Auto-UI+API | Review |  |
<!-- /generated:summary -->

## Test cases

### Theme wording

#### THEME-001 · Each theme shows its own window text, message button and messages heading

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §9 (FW-030) |

**Role:** Leaver, Visitor

**Preconditions:**

1. A leaver with a Live page whose five-day message window is open is available (the test publishes its own page).
2. The page has at least one visible message.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As the leaver, open "Your farewell page" and click the theme tile of the variant under "CHOOSE YOUR STYLE". | Theme of the variant | The tile is outlined and named with the theme. |
| 2 | As a visitor, open the page link and read the message-window status in the top bar. | | It shows the variant's open text with the number of days left in place of N. |
| 3 | Read the message button. | | It shows the variant's button label. |
| 4 | Read the heading above the messages. | | It shows the variant's messages heading. |

**Data variants (12 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Warm Send-Off | User Guide v1.1 §9 (FW-030) | "Notes close in N days" · "Leave a note" · "Notes from all of you" |
| 2 | Midnight | User Guide v1.1 §9 (FW-031) | "Final screening in N days" · "Leave a message" · "With thanks to" |
| 3 | Garden | User Guide v1.1 §9 (FW-032) | "Open for planting N more days" · "Plant a message" · "What you planted" |
| 4 | Ocean | User Guide v1.1 §9 (FW-033) | "Tide goes out in N days" · "Send a wave" · "Washed ashore" |
| 5 | Golden Hour | User Guide v1.1 §9 (FW-034) | "Light fades in N days" · "Leave a memory" · "Kept in the light" |
| 6 | Clean Slate | User Guide v1.1 §9 (FW-035) | "Messages close in N days" · "Leave a message" · "From colleagues" |
| 7 | Retro Arcade | User Guide v1.1 §9 (FW-036) | "TIME LEFT N DAYS" · "INSERT MESSAGE ▶" · "— HIGH SCORES —" |
| 8 | Cozy Cabin | User Guide v1.1 §9 (FW-037) | "Fire's lit for N more days" · "Pull up a chair" · "Letters by the fire" |
| 9 | Neon Nights | User Guide v1.1 §9 (FW-038) | "Doors close in N days" · "Leave a message" · "Shout-outs" |
| 10 | Pastel Dream | User Guide v1.1 §9 (FW-039) | "N more dreamy days" · "Float a message" · "little clouds from you" (lower case) |
| 11 | Monochrome | User Guide v1.1 §9 (FW-040) | "Closes in N days" · "Leave a message" · "Messages (N)" (N = message count) |
| 12 | Wanderlust | User Guide v1.1 §9 (FW-041) | "Boarding closes in N days" · "Send a postcard" · "Postcards for the road" |

---

#### THEME-002 · On a closed page each theme shows its own closed-window text

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — needs a Closed departure seeded in each of the 12 themes (a closed page cannot be re-themed once the booklet is made) | User Guide v1.1 §9 (FW-030) |

**Role:** Visitor

**Preconditions:**

1. A departure in status Closed exists for the theme of the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the closed page's link and read the message-window status in the top bar. | Page of the variant | It shows the variant's closed text. |
| 2 | Look for the message button. | | There is no message button; the page reads "The five-day window has closed". |

**Data variants (12 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Warm Send-Off | User Guide v1.1 §9 (FW-030) | "Notes are closed" |
| 2 | Midnight | User Guide v1.1 §9 (FW-031) | "The screening has ended" |
| 3 | Garden | User Guide v1.1 §9 (FW-032) | "The planting season is over" |
| 4 | Ocean | User Guide v1.1 §9 (FW-033) | "The tide has gone out" |
| 5 | Golden Hour | User Guide v1.1 §9 (FW-034) | "The light has gone" |
| 6 | Clean Slate | User Guide v1.1 §9 (FW-035) | "Messages are closed" |
| 7 | Retro Arcade | User Guide v1.1 §9 (FW-036) | "TIME UP" |
| 8 | Cozy Cabin | User Guide v1.1 §9 (FW-037) | "The fire's gone out" |
| 9 | Neon Nights | User Guide v1.1 §9 (FW-038) | "The doors have closed" |
| 10 | Pastel Dream | User Guide v1.1 §9 (FW-039) | "the clouds have drifted off" (lower case) |
| 11 | Monochrome | User Guide v1.1 §9 (FW-040) | "Closed" |
| 12 | Wanderlust | User Guide v1.1 §9 (FW-041) | "Boarding has closed" |

---

### Theme applied to the page

#### THEME-003 · Changing the theme on a live page changes what visitors see straight away

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §9 (FW-033) |

**Role:** Leaver, Visitor

**Preconditions:**

1. A leaver has a Live page in theme "Garden" with the message window open (the test publishes its own page).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As a visitor, open the page link. | | The message button reads "Plant a message". |
| 2 | As the leaver, open "Your farewell page" and click the "Ocean" tile under "CHOOSE YOUR STYLE". | Ocean | "PHONE PREVIEW · OCEAN" shows the page in Ocean and the save bar shows the change is saved. |
| 3 | As the visitor, reload the page. | | The page is in Ocean: status "Tide goes out in N days", button "Send a wave", messages heading "Washed ashore". |
| 4 | Open the Alumni Wall and find the leaver's card. | | The cover band uses the Ocean colours. |

---

#### THEME-004 · Each theme's page looks like its design (colours, type, motifs)

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Manual — visual look matching the design (UAT-008) | Active | User Guide v1.1 §9 (FW-030) |

**Role:** Visitor

**Preconditions:**

1. A Live page is available in the theme of the variant, on desktop (1280 px) and phone.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the page and compare it with the theme's figure. | Theme of the variant | Colours, type, motifs and spacing match the figure and the theme's description. |
| 2 | Open the same page on a phone. | | The look is the same theme, aligned and readable with no horizontal scroll. |

**Data variants (12 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Warm Send-Off | User Guide v1.1 §9 (FW-030) | "Soft terracotta and cream, hand-written type" |
| 2 | Midnight | User Guide v1.1 §9 (FW-031) | "Deep navy and gold accents" |
| 3 | Garden | User Guide v1.1 §9 (FW-032) | "Fresh greens and florals" |
| 4 | Ocean | User Guide v1.1 §9 (FW-033) | "Blues and sandy neutrals" |
| 5 | Golden Hour | User Guide v1.1 §9 (FW-034) | "Warm amber gradients" |
| 6 | Clean Slate | User Guide v1.1 §9 (FW-035) | "Minimal white and black" |
| 7 | Retro Arcade | User Guide v1.1 §9 (FW-036) | "Pixel type and 8-bit colour blocks" |
| 8 | Cozy Cabin | User Guide v1.1 §9 (FW-037) | "Woodgrain textures and autumn tones" |
| 9 | Neon Nights | User Guide v1.1 §9 (FW-038) | "Dark background with electric pink/cyan accents" |
| 10 | Pastel Dream | User Guide v1.1 §9 (FW-039) | "Soft lilac, mint, and blush" |
| 11 | Monochrome | User Guide v1.1 §9 (FW-040) | "Pure black and white with sharp geometry" |
| 12 | Wanderlust | User Guide v1.1 §9 (FW-041) | "Map lines and stamped-passport motifs" |

---

### Theme in the booklet

#### THEME-005 · The booklet PDF is made in the leaver's theme

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI+API | Review — the guide says the booklet is "in their theme" but not whether it carries the theme wording; the colours and look are checked manually under THEME-004 | User Guide v1.1 §16 |

**Role:** Company admin

**Preconditions:**

1. A Live leaver in Wave Money has theme "Ocean" and at least one visible message.
2. A Wave Money company admin is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the departure in "Admin" and click "Download booklet (PDF)". | | "Preparing your booklet…" shows, then a PDF downloads (up to a minute). |
| 2 | Read the PDF text. | | It contains the leaver's name and farewell, the visible message, and the Ocean messages heading "Washed ashore". |

---
