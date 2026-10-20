# 12 · Employee List (Admin)

[← Test case index](../README.md)

<!-- generated:summary (npm run cases:build) — edit the test cases below, not this block -->
**Test cases:** 25 (+20 data-variant rows)  
**Priority:** P1 5 · P2 14 · P3 6 · **★ Critical:** 2 · **Smoke:** 1 · **E2E:** 0 · **Auto:** 23 · **Manual:** 2 · **Review:** 4

## Summary

| ID | Test case | Sub-feature | Pri | Tags | Automation | Status | Variants |
|---|---|---|---|---|---|---|---|
| [EMP-001](#emp-001--employee-list-tab-shows-heading-description-import-panel-and-table) | Employee List tab shows heading, description, import panel and table | Page and template | P2 | — | Auto-UI | Active |  |
| [EMP-002](#emp-002--console-says-employee-list-everywhere-and-never-upload-roster) | Console says "Employee List" everywhere and never "Upload Roster" | Page and template | P3 | — | Auto-UI | Active | 2 |
| [EMP-003](#emp-003--downloaded-template-holds-the-required-and-optional-columns) | Downloaded template holds the required and optional columns | Page and template | P2 | — | Auto-UI+API | Active | 2 |
| [EMP-004](#-emp-004--importing-a-csv-of-new-people-adds-them-after-import) | ★ Importing a CSV of new people adds them after "Import" | Import | P1 | @smoke | Auto-UI+API | Active | 3 |
| [EMP-005](#emp-005--cancel-in-the-import-dialog-changes-nothing) | "Cancel" in the import dialog changes nothing | Import | P2 | — | Auto-UI | Active |  |
| [EMP-006](#emp-006--excel-import-reads-the-employee-list-sheet-or-else-the-first-sheet) | Excel import reads the "Employee list" sheet, or else the first sheet | Import | P2 | — | Auto-UI | Active | 2 |
| [EMP-007](#emp-007--import-updates-a-person-matched-by-work-email-and-leaves-others-as-they-are) | Import updates a person matched by work email and leaves others as they are | Import | P1 | — | Auto-UI+API | Active |  |
| [EMP-008](#emp-008--a-blank-optional-cell-keeps-the-stored-value) | A blank optional cell keeps the stored value | Import | P2 | — | Auto-UI+API | Active | 2 |
| [EMP-009](#emp-009--importing-people-creates-no-departures-and-no-farewell-pages) | Importing people creates no departures and no farewell pages | Import | P2 | — | Auto-UI | Active |  |
| [EMP-010](#emp-010--a-file-with-any-bad-row-is-refused-and-nothing-is-imported) | A file with any bad row is refused and nothing is imported | Import refusals | P2 | — | Auto-UI | Active | 6 |
| [EMP-011](#emp-011--a-file-over-1-mb-or-2000-rows-is-refused) | A file over 1 MB or 2,000 rows is refused | Import refusals | P3 | — | Auto-UI | Active | 3 |
| [EMP-012](#emp-012--a-csv-with-an-unclosed-quote-mark-cannot-be-read) | A CSV with an unclosed quote mark cannot be read | Import refusals | P3 | — | Auto-UI | Active |  |
| [EMP-013](#emp-013--an-older-xls-file-is-refused) | An older .xls file is refused | Import refusals | P3 | — | Auto-UI | Review |  |
| [EMP-014](#emp-014--a-deleted-person-is-not-restored-by-an-import) | A deleted person is not restored by an import | Import refusals | P2 | — | Auto-UI | Active |  |
| [EMP-015](#emp-015--an-inactive-company-cannot-take-an-import) | An inactive company cannot take an import | Import refusals | P2 | — | Auto-UI | Active |  |
| [EMP-016](#emp-016--export-csv-downloads-the-list-in-the-templates-columns) | "Export CSV" downloads the list in the template's columns | Export | P2 | — | Auto-UI+API | Active |  |
| [EMP-017](#emp-017--an-exported-csv-imports-back-without-changing-anyone) | An exported CSV imports back without changing anyone | Export | P2 | — | Auto-UI+API | Review |  |
| [EMP-018](#-emp-018--disabling-a-person-with-a-reason-shows-disabled-and-enable) | ★ Disabling a person with a reason shows "Disabled" and "Enable" | Disable and delete | P1 | — | Auto-UI | Active | 2 |
| [EMP-019](#emp-019--a-disabled-person-is-greyed-out-and-cannot-sign-in) | A disabled person is greyed out and cannot sign in | Disable and delete | P1 | — | Auto-UI | Active |  |
| [EMP-020](#emp-020--deleting-a-person-moves-them-to-deleted-and-restore-brings-them-back) | Deleting a person moves them to "Deleted", and "Restore" brings them back | Disable and delete | P2 | — | Auto-UI | Active |  |
| [EMP-021](#emp-021--a-person-with-a-published-page-cannot-be-deleted-only-disabled) | A person with a published page cannot be deleted, only disabled | Disable and delete | P2 | — | Auto-UI | Review |  |
| [EMP-022](#emp-022--department-status-and-name-filters-narrow-the-employee-table) | DEPARTMENT, STATUS and NAME filters narrow the employee table | Filters | P1 | — | Auto-UI | Active | 7 |
| [EMP-023](#emp-023--filters-that-match-nobody-show-0-of-15-employees-and-the-empty-message) | Filters that match nobody show "0 of 15 employees" and the empty message | Filters | P2 | — | Auto-UI | Active |  |
| [EMP-024](#emp-024--phone-number-in-employee-information-has-validation-and-a-length-limit) | Phone number in employee information has validation and a length limit | Employee information and layout | P3 | — | Manual | Review |  |
| [EMP-025](#emp-025--employee-list-layout-and-alignment-match-the-approved-uat-design) | Employee List layout and alignment match the approved UAT design | Employee information and layout | P3 | — | Manual | Active |  |
<!-- /generated:summary -->

## Test cases

### Page and template

#### EMP-001 · Employee List tab shows heading, description, import panel and table

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §12 (FW-056) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Admin" in the top bar, then the "Employee List" tab. | | The heading "Employee List" and "Everyone employed at Wave Money. Import a CSV or Excel file to add or update people; export the list to edit it and import it back." are shown. |
| 2 | Look at "Import employees". | | It shows "Download template (.xlsx)", "Download template (.csv)", "Required columns" work_email, full_name, role_title, department, "Optional columns" full_name_my and joined_on, "▶ More about the format", and "Import Employee list" with "CSV or Excel (.xlsx), up to 1 MB and 2,000 rows." |
| 3 | Look at "Employees". | | It shows the filters "DEPARTMENT", "STATUS", "NAME", a count such as "15 of 15 employees", "Export CSV", and the columns "EMPLOYEE", "DEPARTMENT", "WORK EMAIL", "STATUS" and "ACTIONS". |

---

#### EMP-002 · Console says "Employee List" everywhere and never "Upload Roster"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | UAT Feedback (UAT-002) |

**Role:** Company admin, Platform admin

**Preconditions:**

1. An admin of the variant's role is signed in.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Admin" in the top bar and look at the console tabs. | | The tabs read "Departures", "Employee List" and "Admins". |
| 2 | Open each tab in turn and search the page text. | Upload Roster | "Upload Roster" (and "Roster") appears nowhere; the import control is labelled "Import Employee list". |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) Company admin | UAT Feedback (UAT-002) | |
| 2 | Platform admin | UAT Feedback (UAT-002) | |

---

#### EMP-003 · Downloaded template holds the required and optional columns

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI+API | Active | UAT Feedback (UAT-001) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click the template button of the variant. | | A file of that type downloads. |
| 2 | Parse the file and read the header row (for .xlsx, the sheet "Employee list" or else the first sheet). | | The header has work_email, full_name, role_title, department, full_name_my and joined_on. |
| 3 | Read the row under the header. | | There is one example row that a tester can replace; any joined_on value is written YYYY-MM-DD. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) "Download template (.csv)" | UAT Feedback (UAT-001) | |
| 2 | "Download template (.xlsx)" | User Guide v1.1 §12 (FW-056) | |

---

### Import

#### ★ EMP-004 · Importing a CSV of new people adds them after "Import"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | @smoke | Auto-UI+API | Active | User Guide v1.1 §12 (FW-057) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. A CSV built from the template holds 2 new people with unique work emails in Wave Money departments (columns as in the variant).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Import Employee list" and choose the file. | 2 new rows | "Checking the file…" shows while the file is checked. |
| 2 | Read the dialog. | | The summary reads "2 rows: 2 new, 0 updates." and the dialog says "Nothing changes until you press Import." |
| 3 | Click "Import". | | "Imported …" appears with 2 created, 0 updated and 0 skipped. |
| 4 | Look at the table and count. | | Both people are listed with their department and work email, status "Active", and the count has gone up by 2. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) template column order | User Guide v1.1 §12 (FW-057) | |
| 2 | columns in another order | User Guide v1.1 §12 | Header names must match exactly; order is free. |
| 3 | extra column "notes" | User Guide v1.1 §12 | Other columns are ignored. |

---

#### EMP-005 · "Cancel" in the import dialog changes nothing

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §12 (FW-057) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. A valid CSV holds 1 new person.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Import Employee list" and choose the file. | 1 new row | The summary reads "1 row: 1 new, 0 updates." |
| 2 | Click "Cancel". | | The dialog closes; no "Imported …" message appears. |
| 3 | Search "NAME" for the new person's work email. | | "No employees match these filters." shows and the total in the count is unchanged. |

---

#### EMP-006 · Excel import reads the "Employee list" sheet, or else the first sheet

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §12 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. An .xlsx file is prepared as in the variant; the sheet to be read holds 1 new person, any other sheet holds a different new person.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Import Employee list" and choose the .xlsx file. | | The summary reads "1 row: 1 new, 0 updates." |
| 2 | Click "Import". | | "Imported …" appears with 1 created. |
| 3 | Search "NAME" for each prepared person. | | Only the person from the expected sheet is listed; the person from the other sheet is not. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) second sheet named "Employee list", first sheet "Notes" | User Guide v1.1 §12 | "Employee list" is read. |
| 2 | no sheet named "Employee list" | User Guide v1.1 §12 | The first sheet is read. |

---

#### EMP-007 · Import updates a person matched by work email and leaves others as they are

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI+API | Active | User Guide v1.1 §12 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. Two people A and B have just been imported by the test.
3. A CSV holds only person A's work email with a new role_title and department.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Import the file. | 1 row, A changed | The summary shows 1 row: 0 new and 1 update. |
| 2 | Click "Import". | | "Imported …" shows 0 created and 1 updated. |
| 3 | Look at person A in the table (or the exported CSV). | | A shows the new department and role title, under the same work email; no second row for A exists. |
| 4 | Look at person B. | | B is unchanged and still "Active" (a person missing from the file is left as they are). |

---

#### EMP-008 · A blank optional cell keeps the stored value

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI+API | Active | User Guide v1.1 §12 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. A person has just been imported by the test with full_name_my and joined_on filled in.
3. A CSV holds the same work email with the variant's cell left blank.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Import the file and click "Import". | | "Imported …" appears. |
| 2 | Click "Export CSV" and find the person's row. | | The blank column still holds the earlier value. |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) full_name_my blank | User Guide v1.1 §12 | |
| 2 | joined_on blank | User Guide v1.1 §12 | |

---

#### EMP-009 · Importing people creates no departures and no farewell pages

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §12 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in.
2. A new person has just been imported by the test.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the "Departures" tab and search "NAME" for the person. | | "No departures match these filters." shows. |
| 2 | Open "Employee" under "Record a last working day". | | The person is offered (they have no departure). |
| 3 | Open the Alumni Wall. | | No card for the person is shown. |

---

### Import refusals

#### EMP-010 · A file with any bad row is refused and nothing is imported

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §12 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. A CSV holds 2 good new rows and the bad row of the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Import Employee list" and choose the file. | | "<file> can't be imported" appears with a table "Row" / "Result" / "Why" that lists the bad row. |
| 2 | Look at the table and count. | | Neither good row was added; the count is unchanged. |

**Data variants (6 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) joined_on not YYYY-MM-DD (01/02/2026) | User Guide v1.1 §12 | |
| 2 | joined_on impossible date (2026-13-40) | User Guide v1.1 §12 | |
| 3 | blank full_name | User Guide v1.1 §12 | Required column. |
| 4 | same work email twice in the file | User Guide v1.1 §12 | Review; the guide does not say whether a repeated email is refused or merged. |
| 5 | required column department missing | User Guide v1.1 §12 | Review; the guide does not say if a missing column is shown as a row table or a file message. |
| 6 | header misspelled (Work Email) | User Guide v1.1 §12 | Header names must match exactly. Review; same question as variant 5. |

---

#### EMP-011 · A file over 1 MB or 2,000 rows is refused

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §12 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. A valid CSV is generated as in the variant.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Import Employee list" and choose the file. | | The file is refused with the variant's message. |
| 2 | Look at the count. | | Nothing was imported. |

**Data variants (3 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) file just over 1 MB | User Guide v1.1 §12 | "This file is larger than 1 MB, so nothing was imported." |
| 2 | 2,001 rows under 1 MB | User Guide v1.1 §12 | Review; the guide gives no message for more than 2,000 rows. |
| 3 | exactly 2,000 rows (boundary, accepted) | User Guide v1.1 §14 | Expected: the summary "2000 rows: …" shows; press "Cancel". |

---

#### EMP-012 · A CSV with an unclosed quote mark cannot be read

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Active | User Guide v1.1 §12 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. A CSV has a stray, unclosed quote mark in a full_name cell.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Import Employee list" and choose the file. | full_name: "Aung Ko | "This file couldn't be read as CSV…" appears and nothing is imported. |

---

#### EMP-013 · An older .xls file is refused

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Auto-UI | Review — the guide says .xls cannot be read but gives no message; is the file blocked by the picker or refused with a message? | User Guide v1.1 §12 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. A valid employee list is saved as Excel 97-2003 (.xls).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Import Employee list" and choose the .xls file. | employees.xls | The file is refused and nothing is imported. |

---

#### EMP-014 · A deleted person is not restored by an import

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §12 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. A person imported by the test has then been deleted (status "Deleted").
3. A CSV holds that person's work email.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Import Employee list" and choose the file. | | "<file> can't be imported" with the row listed and "Why" reading "This person was deleted from the Employee List. An import doesn't restore them." |
| 2 | Set "STATUS" to "Deleted". | | The person is still "Deleted" with "Restore". |

---

#### EMP-015 · An inactive company cannot take an import

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §12 (FW-070) |

**Role:** Platform admin

**Preconditions:**

1. A Platform admin is signed in and on "Admin" → "Employee List".
2. Yoma Land is an inactive company.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click the "Yoma Land" company chip. | | "Yoma Land is inactive, so an employee list can't be imported into it." is shown. |
| 2 | Try to import a valid CSV. | 1 new row | No import is possible; nothing is added to Yoma Land. |

---

### Export

#### EMP-016 · "Export CSV" downloads the list in the template's columns

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI+API | Active | UAT Feedback (UAT-004) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Export CSV". | | A CSV file downloads. |
| 2 | Parse the header row. | | The columns are the same as the template's: work_email, full_name, role_title, department, full_name_my, joined_on. |
| 3 | Compare rows with the table. | | There is one row per listed person, with the same name, department and work email; dates are YYYY-MM-DD. |

---

#### EMP-017 · An exported CSV imports back without changing anyone

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI+API | Review — does an unchanged row count as an update or as skipped in the summary and "Imported …"? Are disabled/deleted people in the export? | User Guide v1.1 §12 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. The list has no deleted people (or the export leaves them out).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Export CSV" and save the file unchanged. | | A CSV downloads. |
| 2 | Import the same file. | | The summary shows 0 new and every row matched by work email. |
| 3 | Click "Import", then export again. | | "Imported …" shows 0 created; the second export equals the first. |

---

### Disable and delete

#### ★ EMP-018 · Disabling a person with a reason shows "Disabled" and "Enable"

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §12 (FW-058) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. An "Active" person without a published page has just been imported by the test.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Disable" in the person's row. | | The dialog reads "Disable <Name>?" and "Disabling signs them out. They can't sign in until they're enabled again." with "REASON FOR DISABLING (OPTIONAL)". |
| 2 | Type a reason and click "Disable". | Left the company early | The status reads "Disabled" with the reason, and the action changes to "Enable". |
| 3 | Click "Enable". | | The status reads "Active" again and the action is "Disable". |

**Data variants (2 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) with a reason | User Guide v1.1 §12 (FW-058) | |
| 2 | no reason | User Guide v1.1 §12 | Reason is optional; status reads "Disabled". |

---

#### EMP-019 · A disabled person is greyed out and cannot sign in

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | User Guide v1.1 §2 (FW-004) |

**Role:** Company admin, Employee

**Preconditions:**

1. A person imported by the test has been disabled by a Wave Money company admin.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open the account menu and search for the person. | | The person is greyed out with "Account disabled". |
| 2 | Click the person. | | The account is not switched; the current account stays signed in. |

---

#### EMP-020 · Deleting a person moves them to "Deleted", and "Restore" brings them back

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §12 (FW-066) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. An "Active" person without a published page has just been imported by the test.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Click "Delete" in the person's row. | | "Delete <Name>?" opens and says "They leave the People-team dashboard and are signed out. Restore undoes it." |
| 2 | Click "Delete". | | The person leaves the default list ("All (not deleted)"). |
| 3 | Open the account menu and search for the person. | | They are greyed out with "Removed from the Employee List". |
| 4 | Set "STATUS" to "Deleted". | | The person is listed as "Deleted" with "Restore". |
| 5 | Click "Restore". | | The person is back in the default list as "Active". |

---

#### EMP-021 · A person with a published page cannot be deleted, only disabled

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Review — the guide does not say whether "Delete" is hidden, disabled or refused with a message for such a person. | User Guide v1.1 §12 |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. A Wave Money person with a live farewell page exists (status shows "Published page").

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Look at the person's row. | | The status shows "Active" with the label "Published page"; "Disable" is offered. |
| 2 | Try to delete the person. | | Deleting is not possible; the person stays listed and their page stays public. |

---

### Filters

#### EMP-022 · DEPARTMENT, STATUS and NAME filters narrow the employee table

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P1 | — | Auto-UI | Active | UAT Feedback (UAT-004) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".
2. The list has people in more than one department, and at least one "Disabled" and one "Deleted" person.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Set the filter of the variant. | | Only rows matching the filter are shown. |
| 2 | Read the count. | | It reads "<shown> of <total> employees", where the total is the whole list. |

**Data variants (7 incl. base) — run as one data-driven test:**

| # | Variant | Source | Note |
|---|---|---|---|
| 1 | (base) DEPARTMENT = one department | UAT Feedback (UAT-004) | |
| 2 | STATUS = "Active" | User Guide v1.1 §12 (FW-065) | |
| 3 | STATUS = "Disabled" | User Guide v1.1 §12 (FW-065) | |
| 4 | STATUS = "Deleted" | User Guide v1.1 §12 (FW-065) | |
| 5 | STATUS = "All (not deleted)" (default) | User Guide v1.1 §12 | Deleted people are hidden. |
| 6 | NAME = part of a full name | UAT Feedback (UAT-004) | |
| 7 | NAME = part of a work email | User Guide v1.1 §12 | |

---

#### EMP-023 · Filters that match nobody show "0 of 15 employees" and the empty message

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P2 | — | Auto-UI | Active | User Guide v1.1 §12 (FW-065) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List" (15 employees in the seeded list).

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Type a name that nobody has in "NAME". | zzz-nobody | The count reads "0 of 15 employees" and "No employees match these filters." is shown. |

---

### Employee information and layout

#### EMP-024 · Phone number in employee information has validation and a length limit

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Manual — no phone field exists in the guide to automate against; automate once the field is defined | Review — where is the employee phone field? The Employee List and import format have no phone column; only the builder's WhatsApp/Viber "+95" fields validate numbers. | UAT Feedback (UAT-006) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in and on "Admin" → "Employee List".

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open a person's employee information and find the phone number field. | | A phone number field is present. |
| 2 | Enter a valid number and save. | 9123456789 | It is saved. |
| 3 | Enter an invalid number and save. | 12ab | It is refused with a field error and not saved. |
| 4 | Enter a number longer than the limit and save. | 9 followed by 15 digits | It cannot be typed beyond the limit, or is refused and not saved. |

---

#### EMP-025 · Employee List layout and alignment match the approved UAT design

| Priority | Tags | Automation | Status | Source |
|---|---|---|---|---|
| P3 | — | Manual — visual alignment and spacing against a design | Active | UAT Feedback (UAT-008) |

**Role:** Company admin

**Preconditions:**

1. A Wave Money company admin is signed in.
2. The approved UAT design / screenshots are at hand.

**Steps:**

| # | Action | Data | Expected result |
|---|---|---|---|
| 1 | Open "Admin" → "Employee List" at 1280 px width. | | Labels, the import panel, filters, count, "Export CSV" and table columns are aligned and spaced as in the design (UAT-002). |
| 2 | Compare the Departments column and filter with the "Departures" and "Admins" tabs. | | Components sit in consistent positions with consistent spacing across the console (UAT-008). |

---
