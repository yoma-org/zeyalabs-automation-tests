# Farewell @smoke verification - 27 Oct 2026 (14 cases)

## Application Overview

VERIFICATION REPORT, 27 Oct 2026. Environment: dev test site https://farewell-wall-git-dev-yoma-bank.vercel.app (no UAT, no production). Verification only: no test code, nothing under docs/test-cases/ changed. Verdicts and proposed changes are for the user to review.

## Data created (find it later by the AT prefix)
- 6 employees, Wave Money, department Testing, role_title QA Engineer, emails at-20261027-0-5653<x>@yoma.example.invalid (x = a..f): AT Smoke 5653A (a, base CSV), 5653B (b), 5653C (c, reordered CSV), 5653D (d), 5653E (e, notes CSV), 5653F (f). Only A was used further; B to F stay Active with no departure.
- Departure for AT Smoke 5653A: last working day 28 Oct 2026 (tomorrow), recorded then triggered, then published by the test.
- Published page of AT Smoke 5653A: https://farewell-wall-git-dev-yoma-bank.vercel.app/p/at-smoke-5653a-zcbz130z (theme Ocean, farewell "Thank you all for five wonderful years.", personal email qa.leaver.personal@example.invalid). Window opened 27 Oct, closes 01 Nov 2026; booklet due 02 Nov 2026 (NOT sent; nothing sent by email). Admin messages page: /people/departures/4a10b2d9-1787-4c82-b59b-feec7c3cabb2?entity=5eed0001-0000-4000-8000-000000000001
- 2 visitor messages, both written signed out, writer shown as "Aye Aye" (the form kept the name): "My favourite memory with AT Smoke 5653A is the team lunch at Inya Lake." (visible) and "Good luck with the next chapter!" (HIDDEN by Hnin Aye with reason "Off-topic, hidden by People team"; "Restore" brings it back).
- Admin "AT Admin 5653", at-admin-5653@yoma.example.invalid, Wave Money admin (added earlier; "Remove" undoes it).
- Downloaded booklet (local file): /Users/trangpham/Documents/automation-test/zeyalabs-automation-tests/.playwright-mcp/AT-Smoke-5653A-farewell-booklet.pdf
- No seeded account, seeded page or Chang Chang's page was changed. Chang Chang (/p/chang-chang-rgj49syx, Engineering, last day 30 Oct 2026, passport theme, "Send a postcard") is another tester's published page with an open window; I viewed it and opened/cancelled its message form only (nothing sent).

## Answers to the five suspicions
1. CONFIRMED. Employee without a page (Min Khant): top bar has only the logo link "Yoma Farewell, home" and the avatar; no "Create my farewell page" (and no "Create page" on phone, per 18 Oct spec).
2. CONFIRMED. Step 3 can be reached before a farewell exists by clicking the step-bar item "3 Preview & share" (seen on seeded draft Aye Chan Moe, nothing typed). Then "Publish & get link" is disabled with "Write your farewell message to publish." and the rows "Farewell message" and "Booklet email" show "!". On my own leaver after saving the email, step 3 showed "Booklet email" with "✓" (the checklist then read: ✓ Theme, – Profile photo, ✓ Farewell message, ✓ Booklet email, – Social links, – What’s next, – Proud moments, – A moment to remember). Once the farewell is written, "Next: Preview & share →" works too, so the case can simply follow WRITE-006.
3. CONFIRMED. No Ocean leaver and every seeded window closed (the only open window was Chang Chang's, not Ocean). WALL-004 and MSG-004 worked only with our own published Ocean page.
4. ANSWERED. The booklet is a link, not a button: link "Download booklet (PDF)" with href /people/departures/<id>/booklet.pdf and download attribute (hint: "Downloads the leaver’s page as one PDF, as it looks today. It can take up to a minute."). It downloaded in about 16 seconds (click to download event; slow-ish, so use a timeout of 60 s as the case says). The file is AT-Smoke-5653A-farewell-booklet.pdf, produced by "Skia/PDF m153" (Chrome print), 1 page, document title "AT Smoke 5653A’s farewell page". The "Preparing your booklet…" text was not caught (the click does not return until the download starts in the automation, and the link's aria-busy was not sampled). TEXT EXTRACTION NOT DONE: the PDF text is Flate-compressed with embedded font subsets, so it cannot be read by grep; the Read tool needs poppler (pdftoppm not installed); my attempt to load pdf.js from a CDN was blocked by the permission system and I did not work around it. So whether the PDF contains the name, farewell and the visible message and whether the hidden message is absent is UNVERIFIED. Suggestion: install poppler (brew install poppler) or give the test a PDF text parser (pdf-parse / pdfjs-dist in Node) and re-check BOOK-001 steps 3-4 on the existing page (the message "Good luck with the next chapter!" is hidden and must be absent; "Inya Lake" must be present). The hide is reversible, so re-check before restoring anything.
5. ANSWERED. Platform admin (Kaung Myat) on Admin sees the same page "Departures · Wave Money" with label PLATFORM ADMIN and entity tabs Wave Money, Yoma Bank, Yoma Group, Yoma Land, Yoma Strategic. The DEP-005 record flow itself was run only as Wave admin Hnin Aye.

## Other findings worth a decision
- Import result wording differs from EMP-004 step 3: the app says "Imported 2 rows: 2 added, 0 updated, 0 skipped." (case: "Imported …" with 2 created, 0 updated, 0 skipped).
- Message window: the wall card and admin say "5 days left to write" / "2 messages · 5 days left", but the public page says "Tide goes out in 4 days" on the day of publishing (published 27 Oct, closes 01 Nov). Looks like an off-by-one or different counting between screens; relevant to PUB-007/MSG cases.
- Wall count rose from 8 to 9 current leavers with our page; the new card reads "AT Smoke 5653A / Testing · Oct 2026 / Thank you all for five wonderful years. / Open page → / 5 days left to write".
- After a trigger, the draft shows in the account menu at once as "AT Smoke 5653A  Leaver · Wave Money · draft".
- After publishing, the app goes to the public page /p/<slug> with an overlay ("Your page is live", the link, "Copy link", "Back to the builder"), not a dialog inside the builder; "Back to the builder" goes to /builder showing the live state.
- Hide confirmation is inline in the message row (not a modal dialog) with the question written with a curly apostrophe.
- The visitor message form keeps the previously typed name for the next message on the same browser.
- Tooling: the Playwright MCP backend stopped twice ("MCP backend is not initialized" / "Test has already stopped") after run_code calls that opened and closed an extra browser context or timed out; re-running planner_setup_page recovered it (and re-ran the auth setup). Never use waitForLoadState('networkidle') here (cost 30 minutes once).

## Stable locators (role / name) used
- Account menu: header summary (trigger; title "Choose an account" signed out, "<initials> <name>" signed in); getByRole('searchbox',{name:'Search accounts'}); rows getByRole('button',{name:/<name>/}) (accessible name = name + subtitle; greyed rows are non-buttons); group headings "Platform admins", "Wave Money admins", "Yoma Bank admins", "Yoma Group admins", "Leavers", "Employees".
- Top bar: locator('header a'): link "Yoma Farewell, home" (/wall), link "Your farewell page" (/builder), link "Admin" (/people).
- Wall: heading "Alumni Wall" level 1; group "Filter by entity" buttons; combobox "Filter by department"; combobox "Sort"; cards locator('a[href^="/p/"]').filter({hasText:name}); inside: "Open page →", status "5 days left to write" / "Messages closed".
- Admin console: nav links "Departures" (/people), "Employee List" (/people/employees), "Admins" (/people/staff); Employee List: button "Import Employee list" (opens the native file chooser; use waitForEvent('filechooser') or setInputFiles), dialog with "Cancel" and "Import" (getByRole('button',{name:'Import',exact:true}) inside locator('[role=dialog], dialog')), status region getByRole('status') ("N of N employees"), links "Download template (.csv)" / "(.xlsx)", "Export CSV", combobox "Department", combobox "Status", searchbox "Name".
- Departures: tiles Not triggered / Draft / Live now / Closed / Messages visible / Messages hidden; Record form: getByLabel('Employee') select (use locator select[name=employeeId] / selectOption({label:'AT Smoke 5653A · Testing'})), getByRole('textbox',{name:'Last working day'}) (input type=date, min = tomorrow, fill 'YYYY-MM-DD'; note getByLabel('Last working day') is ambiguous with the region), getByRole('button',{name:'Record',exact:true}); table row locator('tbody tr').filter({hasText:name}) with buttons "Trigger", then "Confirm trigger" / "Cancel" (inline), links "Messages", "View page", "View draft", button "Change date".
- Admins: getByRole('textbox',{name:'Name'}), getByRole('textbox',{name:/Work email/i}), role shown as fixed text span.staff__role-fixed ("Wave Money admin"), button "Add admin", row button "Remove".
- Builder: step bar buttons "1 Choose your style", "2 Write a message", "3 Preview & share" (getByRole('button',{name:/Write a message/})); theme tile getByRole('button',{name:'Ocean',exact:true}) (aria-pressed="true" when chosen, title = the description); button "Next: Write a message →"; farewell locator('textarea') (placeholder "Say goodbye in your own words, in any language. မြန်မာလို ရေးလည်းရပါတယ်။"); counter text /\d+ \/ 2000/; getByRole('textbox',{name:/Personal email/}); button "Save email"; button "Next: Preview & share →"; "Publish & get link" -> dialog "Publish your page?" with "Cancel" / "Publish now"; "Back to the builder".
- Public page /p/<slug> (Ocean): button/link "Send a wave"; form labels "Your name", "Your message", "Upload a memory"; getByRole('textbox',{name:'Your name'}), getByRole('textbox',{name:'Your message'}); prompt buttons by name /My favourite memory with <Name> is/, "Write my own"; "Cancel"; "Send message"; confirmation text "Message sent. Thank you!"; counter text "N colleagues so far" ("1 colleague so far" singular).
- Moderation (admin messages page): per message a textbox "Reason (required)" and button "Hide" (exact), then "Confirm hide" / "Cancel"; after: badge "Hidden", "Show hidden message", "Hidden by Hnin Aye (Wave Money admin) on 27 Oct 2026", button "Restore"; counts text /\d+ visible · \d+ hidden/; link "Download booklet (PDF)"; button "Send booklet now" (DO NOT click; disabled until the window closes).

## Final summary table
| Case | Verdict | Proposed change |
|---|---|---|
| ACC-006 | Match | none |
| WALL-001 | Match | none (count is now 9; assert /\d+ current leavers?/) |
| PERM-001 | Partially matches (V1 mismatch, V2-5 match) | V1: replace "Create my farewell page" with "no button" or log as defect/GAP; step 2 "subtitle" = the account's row in the list (pill in the open-menu header differs) |
| ADM-003 | Match | none |
| EMP-004 | Match for all 3 variants (base, reordered, notes) with wording difference at step 3 | step 3: "Imported 2 rows: 2 added, 0 updated, 0 skipped."; "Checking the file…" not caught (transient); dialog title is "Import <file name>?"; department must be an existing one (Testing) or untested |
| DEP-005 | Partially matches | step 3 date: use tomorrow (min of the date input is tomorrow; today+30 also allowed) - decide; step 4 text, row, status and tile 1 -> 2 all match; Platform admin not run |
| STYLE-002 | Match | none (note "Saved" appears in the save bar only after the click) |
| WRITE-006 | Match | none |
| WRITE-011 | Match with data/step note | data email -> qa.leaver.personal@example.invalid; step 4: row "Booklet email" shows "✓" after reload (verified via Next: Preview & share → once farewell written; step bar also reaches it earlier) |
| PUB-006 | Partially matches | step 2: after "Publish now" the app opens the public page with the overlay "Your page is live ..." (not in the builder) ; step 3 then goes via "Back to the builder"; step 3 top bar "Live · last day 28 Oct 2026" and subtitle "Live" match |
| MSG-004 | Match with wording note | step 1 button depends on theme (Ocean: "Send a wave"); prompt text has no trailing "…" separation (field gets "My favourite memory with AT Smoke 5653A is " then the tester completes it); step 5 line is "Aye Aye / 27 Oct 2026" and the counter "2 colleagues so far"; page link works signed out |
| WALL-004 | Match (both variants) | none; precondition needs own published Ocean page (seed has none) |
| MOD-004 | Match with wording note | step 2: confirm is inline, text "Hide this message from the leaver’s page?" (curly apostrophe; case has straight); step 3 "The message is hidden."; step 4 matches; counts 2/0 -> 1/1; visitor sees only the other message |
| BOOK-001 | Partially matches (download works; PDF text not verified) | steps 1-2: control is a link, not a button; ~16 s; "Preparing your booklet…" not observed; steps 3-4 still to be checked with a PDF text tool |

## Test Scenarios

### 1. Smoke verification per case

**Seed:** `projects/farewell/tests/seed.spec.ts`

#### 1.1. ACC-006 Choosing an account reloads the wall as that person - MATCH

**File:** `tests/access/switch-account.spec.ts`

**Steps:**
  1. As Nandar Lin open the account menu; click 'Min Khant Employee · Wave Money · no page yet'.
    - expect: Menu shows paragraph 'Switch account' (CSS upper-case); wall reloads; greeting 'Hi Min Khant 👋 These are colleagues from across Yoma Group who’ve recently moved on to their next chapter. Stop by their page, share a memory or say thank you before it closes.'; avatar 'MK Min Khant'. Match. Proposed change: none.

#### 1.2. WALL-001 Employee sees wall heading, greeting and privacy note (Min Khant) - MATCH

**File:** `tests/wall/wall-content.spec.ts`

**Steps:**
  1. As Min Khant open /wall.
    - expect: h1 'Alumni Wall'; greeting as above (curly apostrophe, same as the case); note 'Only Yoma Group colleagues can see this wall. Each page stays for a while after their last day, and messages from colleagues stay private.'; chips, Department and Sort dropdowns, count ('8 current leavers' at that time, 9 after our page) and cards. Match. Proposed change: none.

#### 1.3. PERM-001 Top bar shows Admin only to admins (5 variants) - PARTIALLY MATCHES

**File:** `tests/permissions/top-bar-admin.spec.ts`

**Steps:**
  1. V1 Employee without page (Min Khant).
    - expect: MISMATCH: header links only 'Yoma Farewell, home'; no 'Create my farewell page'. Row subtitle 'Employee · Wave Money · no page yet' and no 'Admin' match. Proposed change: V1 button 'none' or defect/GAP.
  2. V2 Leaver draft (Aye Chan Moe, view only); V3 published (Khin Myat Noe); V4 Hnin Aye; V5 Kaung Myat.
    - expect: V2: link 'Your farewell page' (/builder), row 'Leaver · Wave Money · draft', pill 'Leaver'. V3: 'Your farewell page', 'Live leaver · Wave Money · published', pill 'Live leaver'. V4: link 'Admin' (/people), 'Wave Money admin'. V5: 'Admin', 'Platform admin · all entities', pill 'Platform admin'. All match.

#### 1.4. ADM-003 Company admin adds a company admin - MATCH

**File:** `tests/admins/add-admin.spec.ts`

**Steps:**
  1. Hnin Aye: Admin > Admins; type 'AT Admin 5653' and 'at-admin-5653@yoma.example.invalid'; role is fixed text 'Wave Money admin'; click 'Add admin'.
    - expect: 'AT Admin 5653 was added as Wave Money admin' then 'Ready to use: choose them from the account menu to act as them. No password is needed on this test site.'; table row with email, 'Wave Money admin', Active, 'Remove'; account menu lists 'AT Admin 5653 Wave Money admin' under 'Wave Money admins', enabled. Match.

#### 1.5. EMP-004 Importing a CSV adds new people (3 variants) - MATCH (wording differences)

**File:** `tests/employees/import.spec.ts`

**Steps:**
  1. Hnin Aye: Employee List (16 of 16 employees); 'Import Employee list'; choose emp-base.csv (AT Smoke 5653A, B).
    - expect: Dialog 'Import emp-base.csv?' / '2 rows: 2 new, 0 updates.' / 'Nothing changes until you press Import.' with Cancel and Import: match. 'Checking the file…' too brief to catch (unverified). Click Import: 'Imported 2 rows: 2 added, 0 updated, 0 skipped.' (case: 2 created) and '18 of 18 employees'; both rows show department Testing, work email, status Active. Match except 'added' vs 'created'.
  2. Variant 2 emp-reordered.csv (department,full_name,work_email,role_title: 5653C, D).
    - expect: Same dialog '2 rows: 2 new, 0 updates.'; 'Imported 2 rows: 2 added, 0 updated, 0 skipped.'; '20 of 20 employees'. Match (order is free).
  3. Variant 3 emp-notes.csv (extra 'notes' column: 5653E, F).
    - expect: '2 rows: 2 new, 0 updates.'; imported 2 added; '22 of 22 employees'; extra column ignored. Match.
  4. Format page facts.
    - expect: Required columns work_email, full_name, role_title, department; optional full_name_my, joined_on; 'Rows are matched by work email; if any row has a problem, nothing is imported.'; 'CSV or Excel (.xlsx), up to 1 MB and 2,000 rows.' Case precondition should name role_title as required.

#### 1.6. DEP-005 Record a last working day adds the person as Not triggered - PARTIALLY MATCHES

**File:** `tests/departures/record.spec.ts`

**Steps:**
  1. Hnin Aye: Admin; note Not triggered tile.
    - expect: 'Departures · Wave Money', tile Not triggered 1. Match. (Platform admin sees the same heading plus entity tabs: suspicion 5.)
  2. Employee: 'AT Smoke 5653A · Testing' (the select lists all 6 imported people); Last working day: 2026-10-28 (input min is 2026-10-28 = tomorrow); click Record.
    - expect: 'Recorded. They are listed below as not triggered.'; row 'AT Smoke 5653A / QA Engineer / Testing / 28 Oct 2026 / Not triggered' with 'Change date' and 'Trigger'; tile Not triggered 1 -> 2; table '17 of 17 departures'. Match. Proposed change: step 3 data 'today + 30 days' vs PROJECT.md 'tomorrow' (the app accepts both; choose one). Role Platform admin not run.
  3. Trigger (needed for the flow): click 'Trigger'.
    - expect: Inline question 'Trigger this departure? AT Smoke 5653A can start building their page. In the test phase, sign in as them from the account menu.' with 'Confirm trigger' / 'Cancel'. After confirm: 'Triggered. No link in the test phase: sign in as them from the account menu.' and status Draft with 'View draft'.

#### 1.7. STYLE-002 Choosing a theme tile outlines it, renames the preview and saves - MATCH

**File:** `tests/builder/style.spec.ts`

**Steps:**
  1. Sign in as AT Smoke 5653A (menu row 'Leaver · Wave Money · draft'); /builder; click tile 'Ocean'.
    - expect: Tile has class theme-swatch--on and aria-pressed=true; description 'Blues and sandy neutrals — calm, open, a fresh-start feeling.' shown above the tiles; preview heading 'PHONE PREVIEW · OCEAN'; step 1 subtitle 'Ocean · 4 sections'; save bar 'Saved'; button 'Next: Write a message →' opens step 2 (URL /builder?step=write). Match. Initial subtitle was 'Warm Send-Off · 4 sections'.

#### 1.8. WRITE-006 Writing the farewell updates counter, subtitle and enables Next - MATCH

**File:** `tests/builder/message.spec.ts`

**Steps:**
  1. Step 2 before typing, then fill the textarea with 'Thank you all for five wonderful years.'
    - expect: Before: counter '0 / 2000', step 2 subtitle 'Farewell still to write', 'Next: Preview & share →' disabled, hint 'Write your farewell to continue.' After: '39 / 2000', save bar 'Saved', subtitle 'Farewell written', Next enabled and opens step 3 'Preview & share'. Match.

#### 1.9. WRITE-011 Saving a personal email shows Saved. Your booklet will be sent here. - MATCH (data and step note)

**File:** `tests/builder/personal-email.spec.ts`

**Steps:**
  1. Read YOUR BOOKLET; type qa.leaver.personal@example.invalid in 'Personal email · required'; click 'Save email'; reload.
    - expect: Text 'Sent after messages close, 5 days after you publish.' and 'This is where your booklet will be sent after you leave: the company contacts leavers by personal email only. It isn’t shown on your page or to your People team.' match. After Save: 'Saved. Your booklet will be sent here.' After reload the field holds qa.leaver.personal@example.invalid. Step 3 row 'Booklet email' shows '✓'. Match. Proposed change: data email -> example.invalid; step 4 should say step 3 is reached via 'Next: Preview & share →' (enabled once a farewell is written) or the step bar.

#### 1.10. PUB-006 Publishing a complete draft makes the page live with a shareable link - PARTIALLY MATCHES

**File:** `tests/publish/publish.spec.ts`

**Steps:**
  1. Step 3: click 'Publish & get link'.
    - expect: Dialog 'Publish your page?' with 'The link can’t be changed or taken down, your 5-day window for messages starts today, and nobody is notified — you share the link.' and 'Cancel' / 'Publish now'. Match.
  2. Click 'Publish now'.
    - expect: App navigates to the public page /p/at-smoke-5653a-zcbz130z with the overlay 'Your page is live', 'Nobody is notified — share the link with your colleagues.', the link, 'Copy link', 'Back to the builder'. Content matches; context differs (public page, not builder).
  3. Click 'Back to the builder'.
    - expect: /builder; top bar 'Live · last day 28 Oct 2026'; step 3 subtitle 'Live'; steps 1-2 ticked; text 'Your page is live. Changes save as you type and show on …'. The 'YOUR PAGE IS LIVE' block is upper-cased by CSS (DOM 'Your page is live'). Step 4: page opens in Ocean with the leaver's farewell and 'Send a wave'. Match.

#### 1.11. MSG-004 Visitor leaves a message from a prompt and sees it on the page - MATCH (wording notes)

**File:** `tests/messages/leave-message.spec.ts`

**Steps:**
  1. Signed out (cookies cleared) open the page link; click 'Send a wave'.
    - expect: Link works signed out (HTTP 200, no login). Form labels 'Your name', 'Your message', 'Upload a memory'; prompts 'The thing I’ll miss most about AT Smoke 5653A is…', 'My favourite memory with AT Smoke 5653A is…', 'AT Smoke 5653A taught me…', 'One thing most people don’t know about AT Smoke 5653A is…', 'I wish AT Smoke 5653A…', 'Write my own'. Heading text 'Start with a prompt' not found as a <label>. Button name is theme-specific (Ocean: 'Send a wave').
  2. Name 'Aye Aye'; click the favourite-memory prompt; append ' the team lunch at Inya Lake.'; 'Send message'.
    - expect: Field after prompt: 'My favourite memory with AT Smoke 5653A is ' (no ellipsis); final 'My favourite memory with AT Smoke 5653A is the team lunch at Inya Lake.'; 'Message sent. Thank you!' appears; list shows the text, 'Aye Aye', '27 Oct 2026'; counter '0 colleagues so far' -> '1 colleague so far'. Match.
  3. Second message: 'Write my own' (field empty), 'Good luck with the next chapter!', name left blank.
    - expect: Sent; counter '2 colleagues so far'; writer shows 'Aye Aye' because the form kept the earlier name (so 'Anonymous' of MSG-005 not observed).

#### 1.12. WALL-004 Clicking a card or Open page opens the leaver's page in their theme (2 variants) - MATCH

**File:** `tests/wall/card-opens-page.spec.ts`

**Steps:**
  1. Nandar Lin on /wall; card 'AT Smoke 5653A / Testing · Oct 2026 / Thank you all for five wonderful years. / Open page → / 5 days left to write'. V1 click 'Open page →'; go back; V2 click the 'Testing · Oct 2026' text on the card.
    - expect: Both open /p/at-smoke-5653a-zcbz130z, title 'AT Smoke 5653A’s farewell page', name 'AT Smoke 5653A', Ocean wording ('at / next tide', 'Tide goes out in 4 days', 'Send a wave', 'Washed ashore'). Match. Needs the test's own Ocean page.

#### 1.13. MOD-004 Hide a message with a reason removes it from the public page - MATCH (wording notes)

**File:** `tests/moderation/hide-message.spec.ts`

**Steps:**
  1. Hnin Aye: Departures row AT Smoke 5653A ('2 messages · 5 days left') > 'Messages'. Counts '2 visible · 0 hidden'. Type 'Off-topic, hidden by People team' in 'Reason (required)' of 'Good luck with the next chapter!'; click 'Hide'.
    - expect: Inline question 'Hide this message from the leaver’s page?' with 'Confirm hide' / 'Cancel' (not a modal; case has a straight apostrophe).
  2. Click 'Confirm hide'.
    - expect: 'The message is hidden.'; badge 'Hidden', 'Show hidden message', 'Hidden by Hnin Aye (Wave Money admin) on 27 Oct 2026', the reason, button 'Restore'; counts '1 visible · 1 hidden'. Match.
  3. Signed out, reopen the public page.
    - expect: '1 colleague so far'; only 'My favourite memory with AT Smoke 5653A is the team lunch at Inya Lake.' / 'Aye Aye' / '27 Oct 2026'; the hidden text is absent. Match.

#### 1.14. BOOK-001 Download booklet gives a PDF with visible messages only - PARTIALLY MATCHES

**File:** `tests/booklet/download.spec.ts`

**Steps:**
  1. Hnin Aye on the messages page: click 'Download booklet (PDF)' (a link, href .../booklet.pdf, download attribute).
    - expect: Hint 'Downloads the leaver’s page as one PDF, as it looks today. It can take up to a minute.' 'Preparing your booklet…' not observed. Download arrived after about 16 s as AT-Smoke-5653A-farewell-booklet.pdf (1 page, Skia/PDF, title 'AT Smoke 5653A’s farewell page'). 'Send booklet now' is disabled ('Available when the message window closes on 01 Nov 2026'); not used.
  2. Parse the PDF text; look for the leaver, farewell, visible and hidden message.
    - expect: NOT VERIFIED: text is compressed in font subsets; no PDF text tool available (pdftoppm missing; pdf.js CDN load was blocked by the permission system). Re-check with a PDF text parser. Expected: name, farewell and the 'Inya Lake' message with 'Aye Aye' present; 'Good luck with the next chapter!' absent.
