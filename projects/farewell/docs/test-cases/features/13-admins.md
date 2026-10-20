# 13 · Admins (Admin)

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 16 (+5 data-variant rows)  
**Priority:** P1 8 · P2 3 · P3 5 · **★ Critical:** 3 · **Smoke:** 1 · **E2E:** 0 · **Auto:** 16 · **Manual:** 0 · **Review:** 4

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [ADM-001](#adm-001--company-admin-sees-the-admins-description-and-admin-table) | Company admin sees the Admins description and admin table | Company admin view | P2 | — | Auto-UI | Active |  |
| [ADM-002](#-adm-002--own-row-is-marked--you-and-has-no-actions) | ★ Own row is marked "· You" and has no actions | Company admin view | P1 | — | Auto-UI | Active | 2 |
| [ADM-003](#adm-003--company-admin-adds-a-company-admin-for-their-own-company) | Company admin adds a company admin for their own company | Company admin view | P1 | @smoke | Auto-UI | Active |  |
| [ADM-004](#adm-004--a-newly-added-admin-shows-no-sign-in-yet-until-their-first-sign-in) | A newly added admin shows "No sign-in yet" until their first sign-in | Company admin view | P3 | — | Auto-UI | Review |  |
| [ADM-005](#adm-005--platform-admin-sees-the-platform-chip-and-every-company-chip) | Platform admin sees the "Platform" chip and every company chip | Platform admin view | P2 | — | Auto-UI | Active |  |
| [ADM-006](#adm-006--a-company-with-no-admins-shows-nobody-administers-this-company-yet) | A company with no admins shows "Nobody administers this company yet." | Platform admin view | P3 | — | Auto-UI | Active |  |
| [ADM-007](#adm-007--company-appears-only-when-the-role-company-admin-is-chosen) | "COMPANY" appears only when the role "Company admin" is chosen | Platform admin view | P3 | — | Auto-UI | Active |  |
| [ADM-008](#-adm-008--platform-admin-adds-a-platform-admin-or-a-company-admin-of-any-company) | ★ Platform admin adds a Platform admin or a company admin of any company | Platform admin view | P1 | — | Auto-UI | Active | 2 |
| [ADM-009](#adm-009--change-role-moves-a-company-admin-to-another-company) | "Change role" moves a company admin to another company | Change role | P1 | — | Auto-UI | Active |  |
| [ADM-010](#adm-010--an-admin-moved-to-another-company-is-signed-out) | An admin moved to another company is signed out | Change role | P1 | — | Auto-UI | Review |  |
| [ADM-011](#adm-011--saving-an-unchanged-role-shows-nothing-changed) | Saving an unchanged role shows "Nothing changed" | Change role | P3 | — | Auto-UI | Active |  |
| [ADM-012](#adm-012--changing-the-role-of-a-removed-admin-is-refused-until-they-are-restored) | Changing the role of a removed admin is refused until they are restored | Change role | P3 | — | Auto-UI+API | Review |  |
| [ADM-013](#-adm-013--removing-an-admin-shows-removed-and-restore-brings-them-back) | ★ Removing an admin shows "Removed" and "Restore" brings them back | Remove and restore | P1 | — | Auto-UI | Active | 2 |
| [ADM-014](#adm-014--a-removed-admin-is-signed-out-at-once-and-cannot-reach-the-console) | A removed admin is signed out at once and cannot reach the console | Remove and restore | P1 | — | Auto-UI | Active |  |
| [ADM-015](#adm-015--platform-admin-removes-another-platform-admin) | Platform admin removes another Platform admin | Remove and restore | P2 | — | Auto-UI | Active |  |
| [ADM-016](#adm-016--a-company-admin-calling-a-platform-admin-action-is-refused) | A company admin calling a Platform-admin action is refused | Remove and restore | P1 | — | Auto-UI+API | Review | 3 |
<!-- /generated:summary -->

## Test cases

### Company admin view

#### ADM-001 · Company admin sees the Admins description and admin table

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §13 (FW-059) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Admin", then the "Admins" tab. | | "Admins" and "Who can administer Wave Money. You can add and remove Company admins here; Platform admins are managed by a Platform admin." are shown. |
| 2 | Look at the table. | | It has the columns "NAME", "WORK EMAIL", "ROLE", "STATUS" and "ACTIONS" and lists only Wave Money admins, no Platform admins. |
| 3 | Look at "Add an admin". | | It shows "NAME", "WORK EMAIL", the role fixed as "Wave Money admin" (no "ROLE" or "COMPANY" choice) and "Add admin". |

---

#### ★ ADM-002 · Own row is marked "· You" and has no actions

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §13 (FW-059) |

**Role:** Company admin, Platform admin

**Preconditions:**

1. An admin of the variant's role is signed in and on "Admin" → "Admins", with the list that holds their own row open.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Find the signed-in admin's own row. | | The name is marked "· You". |
| 2 | Look at its "ACTIONS" cell. | | There is no "Remove" and no "Change role" (you cannot remove yourself or change your own role). |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Company admin, Wave Money list | User Guide v1.1 §13 (FW-059) | |
| 2 | Platform admin, "Platform" chip | User Guide v1.1 §13 (FW-060) | |

---

#### ADM-003 · Company admin adds a company admin for their own company

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke | Auto-UI | Active | User Guide v1.1 §13 (FW-061) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Admins".
2. A unique name and work email are generated by the test.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type "NAME" and "WORK EMAIL" under "Add an admin". | Test Admin <id>, test.admin.<id>@yoma.example.invalid | The role reads "Wave Money admin". |
| 2 | Click "Add admin". | | "<Name> was added as Wave Money admin" appears. |
| 3 | Look at the table. | | The new admin is listed with the work email and role "Wave Money admin". |
| 4 | Open the account menu. | | The new admin is listed under "WAVE MONEY ADMINS" and can be chosen straight away. |

---

#### ADM-004 · A newly added admin shows "No sign-in yet" until their first sign-in

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — §13 says the new admin is listed as "Active", but §15 defines "No sign-in yet" for an added admin who has not signed in; which is shown? | User Guide v1.1 §15 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin has just added a new company admin (ADM-003).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Read the new admin's "STATUS". | | It reads "No sign-in yet". |
| 2 | Switch to the new admin from the account menu, then back to the first admin and reload "Admins". | | The new admin's status reads "Active". |

---

### Platform admin view

#### ADM-005 · Platform admin sees the "Platform" chip and every company chip

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §13 (FW-060) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Admin", then the "Admins" tab. | | Chips for "Platform" and every company (Wave Money, Yoma Bank, Yoma Group, Yoma Land, Yoma Strategic) are shown. |
| 2 | Click "Platform". | | "Platform admins reach every company. They belong to no company, so they are listed here and on no company's list." is shown; every row other than "· You" has "Change role" and "Remove". |
| 3 | Click "Wave Money". | | Only Wave Money's admins are listed; no Platform admin is in the list. |

---

#### ADM-006 · A company with no admins shows "Nobody administers this company yet."

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §13 (FW-060) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in and on "Admin" → "Admins".
2. A company with no admins exists in the seed data (to be picked from the chips, for example Yoma Strategic).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click that company's chip. | | "Nobody administers this company yet." is shown instead of rows. |

---

#### ADM-007 · "COMPANY" appears only when the role "Company admin" is chosen

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §13 (FW-061) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in and on "Admin" → "Admins".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "ROLE" under "Add an admin". | | It offers "Platform admin" and "Company admin". |
| 2 | Choose "Platform admin". | | No "COMPANY" field is shown. |
| 3 | Choose "Company admin". | | "COMPANY" appears. |

---

#### ★ ADM-008 · Platform admin adds a Platform admin or a company admin of any company

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §13 (FW-061) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in and on "Admin" → "Admins".
2. A unique name and work email are generated by the test.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type "NAME" and "WORK EMAIL", choose the variant's "ROLE" (and "COMPANY"). | | The fields accept the values. |
| 2 | Click "Add admin". | | "<Name> was added as <role>" appears with the variant's role. |
| 3 | Click the chip the variant lists. | | The new admin is in that list, and not on any other company's list. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Company admin, Yoma Bank | User Guide v1.1 §13 (FW-061) | Role "Yoma Bank admin"; chip "Yoma Bank". |
| 2 | Platform admin | User Guide v1.1 §13 | Role "Platform admin"; chip "Platform". |

---

### Change role

#### ADM-009 · "Change role" moves a company admin to another company

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §13 (FW-062) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in and on "Admin" → "Admins" → "Wave Money".
2. A Wave Money company admin has just been added by the test.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Change role" in that admin's row. | | "Change <Name>'s role" opens with "Choosing another company moves them there and signs them out. A Platform admin reaches every company." |
| 2 | Choose "Company admin", company "Yoma Bank", and click "Save". | | "<Name> is now Yoma Bank admin." appears. |
| 3 | Look at the "Wave Money" and "Yoma Bank" lists. | | The admin has left Wave Money's list and is on Yoma Bank's with role "Yoma Bank admin". |

---

#### ADM-010 · An admin moved to another company is signed out

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Review — the guide does not say what the moved admin sees (sign-in page, or a reload into the new company)? | User Guide v1.1 §13 |

**Role:** Platform admin, Company admin

**Preconditions:**

1. A Wave Money company admin added by the test is signed in, in a second browser context, on "Admin" → "Departures".
2. A Platform admin is signed in, in the first context.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | As the Platform admin, change the admin's role to "Company admin" of "Yoma Bank" and click "Save". | | "<Name> is now Yoma Bank admin." appears. |
| 2 | In the second context, reload the page. | | The moved admin is signed out and no longer sees Wave Money data. |

---

#### ADM-011 · Saving an unchanged role shows "Nothing changed"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §13 |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in and on "Admin" → "Admins" → "Wave Money".
2. A Wave Money company admin has just been added by the test.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Change role", keep "Company admin" and "Wave Money", and click "Save". | | "Nothing changed — <Name> was already like that." appears and the row is unchanged. |

---

#### ADM-012 · Changing the role of a removed admin is refused until they are restored

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI+API | Review — a removed row shows "Restore" instead of actions; can this message be reached in the UI, or only by calling the backend (API not documented yet)? | User Guide v1.1 §13 |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in.
2. A company admin added by the test has been removed (status "Removed").

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Try to change that admin's role to "Platform admin". | | "<Name> has been removed. Restore them before changing their role." appears. |
| 2 | Look at the row. | | The role is unchanged and the status still reads "Removed". |

---

### Remove and restore

#### ★ ADM-013 · Removing an admin shows "Removed" and "Restore" brings them back

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §13 (FW-071) |

**Role:** Company admin, Platform admin

**Preconditions:**

1. An admin of the variant's role is signed in and on "Admin" → "Admins".
2. A Wave Money company admin has just been added by the test.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Remove" in that admin's row. | | "Remove <Name>, Wave Money admin?" opens with "They are signed out at once and can no longer reach the console. What they did stays on record, and you can restore them later." |
| 2 | Click "Cancel". | | The dialog closes; the status is unchanged. |
| 3 | Click "Remove", then "Confirm remove". | | The status reads "Removed" and the action changes to "Restore". |
| 4 | Click "Restore". | | The status no longer reads "Removed" and "Remove" is offered again. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Wave Money company admin removes | User Guide v1.1 §13 (FW-071) | |
| 2 | Platform admin removes, "Wave Money" chip | User Guide v1.1 §13 | |

---

#### ADM-014 · A removed admin is signed out at once and cannot reach the console

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §13 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin added by the test is signed in, in a second browser context, on "Admin" → "Departures".
2. Another Wave Money company admin is signed in, in the first context.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | In the first context, remove the test admin ("Remove", "Confirm remove"). | | The status reads "Removed". |
| 2 | In the second context, reload the page. | | The removed admin is signed out and the console is not shown. |
| 3 | In the first context, click "Restore"; in the second, choose the admin again from the account menu. | | The admin can open "Admin" again. |

---

#### ADM-015 · Platform admin removes another Platform admin

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §13 |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in and on "Admin" → "Admins" → "Platform".
2. A second Platform admin has just been added by the test.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Remove" in the second Platform admin's row, then "Confirm remove". | | The status reads "Removed" and the action is "Restore". |

---

#### ADM-016 · A company admin calling a Platform-admin action is refused

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI+API | Review — API not documented yet; the UI hides these actions from company admins, so the message can only be provoked by calling the backend. | User Guide v1.1 §13 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in (session reused for API calls).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Call the backend action of the variant with the company admin's session. | | It is refused with "Only a Platform admin can do that." |
| 2 | As a Platform admin, open "Admin" → "Admins". | | Nothing changed. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) add a Platform admin | User Guide v1.1 §13 | |
| 2 | change a Wave Money admin's role | User Guide v1.1 §13 | |
| 3 | add a company admin to Yoma Bank | User Guide v1.1 §14 | Company admins act on their own company only. |

---
