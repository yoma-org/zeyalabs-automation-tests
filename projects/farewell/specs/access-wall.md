# Farewell - Access and Alumni Wall: live verification of canonical cases

## Application Overview

Read-only verification on 18 Oct 2026 of ACC-001..014 and WALL-001..016 against https://farewell-wall-git-dev-yoma-bank.vercel.app. Nothing was created, published, triggered or typed into the builder. Only signed in/switched, opened pages, used filters/sort/search, and read /people (GET) as admins. Seeded state: wall shows 7 current leavers (5 Wave Money, 2 Yoma Bank), every card says "Messages closed" (all windows closed), Wave admin sees Live 6 / Closed 2, Yoma Bank Closed 2, Yoma Strategic Closed 1.

VERDICT LEGEND: Match / Mismatch / Cannot verify (read-only) / Answers Review.

STABLE LOCATORS USED
- Account menu trigger: it is a <summary> inside <details>; signed out its title/label is "Choose an account" with a "?" avatar; signed in it is the initials+name (e.g. summary:has-text("Nandar Lin")). Header link: getByRole('link',{name:'Yoma Farewell, home'}) -> /wall; role button: getByRole('link',{name:'Admin'}) -> /people, link "Your farewell page" -> /builder.
- Menu: searchbox getByRole('searchbox',{name:'Search accounts'}) (placeholder "Search by name, email or company"; type=search, no custom x button); account rows: getByRole('button',{name:/Nandar Lin/}) for usable accounts (accessible name = name + subtitle); greyed rows are non-button <span class="switcher__account switcher__account--blocked"> (opacity .55, no aria-disabled), so use locator('li').filter({hasText:name}); current account row has class switcher__account--on and text "✓"; group headings are <p> rendered upper-case by CSS (DOM text is "Platform admins" etc.); empty text "No account matches."; header of open menu shows initials, name, email, role pill text.
- Wall: heading getByRole('heading',{name:'Alumni Wall',level:1}); entity chips getByRole('group',{name:'Filter by entity'}).getByRole('button',{name:'Wave Money'}) (state via aria-pressed); department getByRole('combobox',{name:'Filter by department'}) (values: "Department" = all, then names); sort getByRole('combobox',{name:'Sort'}) (option labels "Closing soonest"/"Most recent"; values "closing" / most-recent value); count text /\d+ current leavers?/; cards are links: locator('a[href^="/p/"]') or getByRole('link',{name:/<leaver name>/}); inside a card: company pill, name, "Dept · Mon YYYY", message excerpt, "Open page →", status text. Footer: role contentinfo.
- Test account facts (18 Oct 2026): usable employees Nandar Lin (Yoma Bank), Min Khant (Wave Money); Ko Ko Naing is NOT usable (greyed, "Last working day reached"). Greyed: Nwe Nwe Htwe, Thet Naing Win (Account disabled); Hla Hla Myint (Removed from the Employee List); Khin Thida, Ko Ko Naing, Su Myat Thu, Aung Kyaw Moe, Kyaw Zin Htet, May Thu Aung, Thandar Oo, Zaw Myo Htun (Last working day reached).

## Test Scenarios

### 1. 01 Access (ACC)

**Seed:** `projects/farewell/tests/seed.spec.ts`

#### 1.1. ACC-001 Each role lands on the wall with its own top-bar button and subtitle - MISMATCH

**File:** `tests/access/roles-top-bar.spec.ts`

**Steps:**
  1. Sign in as each variant and read the top bar and account menu
    - expect: V1 base Employee no page (Min Khant, Nandar Lin): wall heading 'Alumni Wall' OK, but the top bar has NO 'Create my farewell page' button at all (only logo and avatar). Menu role pill 'Employee'; list subtitle 'Employee · Wave Money · no page yet' (Min Khant) matches. MISMATCH on step 2.
    - expect: V2 Leaver draft (Aye Chan Moe): button 'Your farewell page' (/builder) OK; list subtitle 'Leaver · Wave Money · draft' OK; menu header pill reads 'Leaver'.
    - expect: V3 Live leaver (Khin Myat Noe): button 'Your farewell page' OK; list subtitle 'Live leaver · Wave Money · published' OK; menu header pill reads 'Live leaver'.
    - expect: V4 Company admin (Hnin Aye): button 'Admin' (/people) OK; subtitle 'Wave Money admin' OK (pill 'Wave Money admin').
    - expect: V5 Platform admin (Kaung Myat): button 'Admin' OK; subtitle 'Platform admin · all entities' OK (pill 'Platform admin').
    - expect: Note: the 'subtitle under the name' in the open-menu header is the role pill; the 'Role · Company · state' subtitle only appears in the account list rows.

#### 1.2. ACC-002 On a phone the employee button reads 'Create page' and logo words are hidden - MISMATCH

**File:** `tests/access/roles-top-bar.spec.ts`

**Steps:**
  1. Viewport 390x844, sign in as Min Khant (Wave employee, no page), read top bar
    - expect: Step 1 MISMATCH: no 'Create page' button exists (top bar has only home icon link and avatar).
    - expect: Step 2 Match: logo words 'Yoma Farewell' / 'Yoma Group' are hidden (zero width), home icon shown. No horizontal scroll (scrollWidth 390).

#### 1.3. ACC-003 Logo and home icon return to the Alumni Wall - MATCH (variants 1 verified, 2-3 partly)

**File:** `tests/access/logo-home.spec.ts`

**Steps:**
  1. V1 as Khin Myat Noe open /builder (no typing), click link 'Yoma Farewell, home'
    - expect: Lands on /wall with heading 'Alumni Wall' - Match.
    - expect: V2 (admin /people) and V3 (reader on a /p/ page) expose the same link 'Yoma Farewell, home' -> /wall; not clicked end-to-end for V2/V3 (link href verified only).

#### 1.4. ACC-004 'Admin' opens the People console at Departures - MATCH

**File:** `tests/access/admin-console.spec.ts`

**Steps:**
  1. As Hnin Aye (company) and Kaung Myat (platform) click 'Admin'
    - expect: Both land on /people, tab 'Departures' first, heading area 'Departures · Wave Money'. Platform admin additionally sees entity tabs Wave Money, Yoma Bank, Yoma Group, Yoma Land, Yoma Strategic. Tabs: Departures, Employee List, Admins.

#### 1.5. ACC-005 Footer shows the Group line and the 90-day rule on every page - MISMATCH (variant 2)

**File:** `tests/access/footer.spec.ts`

**Steps:**
  1. V1 Alumni Wall (also /login): read footer; V2 open a Live farewell page from a wall card
    - expect: V1 Match: 'Yoma Farewell · Yoma Group — Wave Money, Yoma Bank and other Group entities' and 'Pages leave the wall 90 days after the last working day.' (role contentinfo).
    - expect: V2 MISMATCH: /p/thiri-ko-ko-5eedshow and /p/nyein-chan-aung-5eedtest have no footer / contentinfo and neither footer line appears; page ends with the 'Notes from all of you' list.

#### 1.6. ACC-006 Choosing an account reloads the wall as that person - MISMATCH (data)

**File:** `tests/access/switch-account.spec.ts`

**Steps:**
  1. Open menu, click another person
    - expect: Menu opens with 'SWITCH ACCOUNT' (CSS upper-case of 'Switch account') - Match. Clicking a usable account (e.g. Nandar Lin, Khin Myat Noe) reloads /wall with 'Hi <Name> 👋' and new initials - Match.
    - expect: Precondition/data MISMATCH: 'Ko Ko Naing' is greyed out 'Last working day reached' and cannot be chosen, so step 2-3 cannot run with that name. Use Min Khant or Nandar Lin.

#### 1.7. ACC-007 Account menu shows the person, role pill, groups and a tick - MATCH

**File:** `tests/access/account-menu.spec.ts`

**Steps:**
  1. As Nandar Lin open the menu
    - expect: Header: initials NL, 'Nandar Lin', 'nandar.lin@bank.example.invalid', pill 'Employee'.
    - expect: Groups in order: Platform admins, Wave Money admins, Yoma Bank admins, Yoma Group admins, Leavers, Employees (displayed upper-case via CSS).
    - expect: '✓' appears only on the Nandar Lin row.

#### 1.8. ACC-008 Searching narrows the list by name, email or company - MATCH except the '×' button

**File:** `tests/access/account-search.spec.ts`

**Steps:**
  1. Type 'Naing', '@', 'Yoma Bank' in the searchbox
    - expect: 'Naing' -> only Ko Ko Naing and Thet Naing Win. 'Yoma Bank' -> Yoma Bank admins (Nwe Nwe Htwe, Thiri Win) and Employees (Aung Kyaw Moe, Nandar Lin, Thandar Oo); non-matching groups disappear. '@' matches all 26 accounts, so email is searched (emails are only visible for the signed-in person).
    - expect: Step 2 MISMATCH: there is no '×' button; the field is <input type=search> (browser-native clear only). Clearing = empty the field; the full list returns.

#### 1.9. ACC-009 A search with no match shows 'No account matches.' - MATCH except '×'

**File:** `tests/access/account-search.spec.ts`

**Steps:**
  1. Type zzqx-no-such-person
    - expect: All groups hidden; text 'No account matches.' shown - Match. Step 2: no '×' control; emptying the field restores the list.

#### 1.10. ACC-010 Accounts that cannot be used are greyed out with their reason - MATCH

**File:** `tests/access/greyed-accounts.spec.ts`

**Steps:**
  1. Find a greyed account and click it
    - expect: 'Account disabled' (Nwe Nwe Htwe, Thet Naing Win), 'Removed from the Employee List' (Hla Hla Myint), 'Last working day reached' (e.g. Ko Ko Naing) all shown at opacity .55 as non-button spans.
    - expect: Clicking Ko Ko Naing: nothing changes, still Kaung Myat on /people.

#### 1.11. ACC-011 Signed out, the menu reads 'Choose an account' with the test-phase note - MATCH

**File:** `tests/access/signed-out.spec.ts`

**Steps:**
  1. Open site with empty storage, open the '?' menu
    - expect: Title 'Choose an account'; text 'Test phase — pick any account on this test site. There is no password while this is on.' exactly as case. Login page body also says 'Choose a test account' / 'Test phase — pick an account from the menu at the top right. There is no password while this is on.'

#### 1.12. ACC-012 Signed-out user opening the wall is sent to sign-in - MATCH

**File:** `tests/access/signed-out.spec.ts`

**Steps:**
  1. Open /wall and / signed out, then choose Nandar Lin
    - expect: Both redirect to /login (title 'Sign in · Yoma Farewell'), no leaver cards. After choosing an employee: /wall with 'Hi Nandar Lin 👋'.

#### 1.13. ACC-013 Production Microsoft SSO - CANNOT VERIFY (manual, production only)

**File:** `tests/access/signed-out.spec.ts`

**Steps:**
  1. Not run
    - expect: Test site has the account switcher and no 'Sign in with Microsoft'. Review status unchanged.

#### 1.14. ACC-014 Email/password sign-in - CANNOT VERIFY (out of scope)

**File:** `tests/access/signed-out.spec.ts`

**Steps:**
  1. Not run (beryl site is not the automation target per PROJECT.md)
    - expect: Answers Review partly: on the dev test site /login has no email/password form, only the account switcher. Case targets farewell-wall-beryl.vercel.app.

### 2. 02 Alumni Wall (WALL)

**Seed:** `projects/farewell/tests/seed.spec.ts`

#### 2.1. WALL-001 Employee sees wall heading, greeting and privacy note - MATCH (user/data and apostrophe notes)

**File:** `tests/wall/wall-content.spec.ts`

**Steps:**
  1. As Nandar Lin open /wall
    - expect: h1 'Alumni Wall'. Greeting 'Hi Nandar Lin 👋 These are colleagues from across Yoma Group who’ve recently moved on to their next chapter. Stop by their page, share a memory or say thank you before it closes.' (curly apostrophe in who’ve; case text has a straight one). Note: 'Only Yoma Group colleagues can see this wall. Each page stays for a while after their last day, and messages from colleagues stay private.' exact.
    - expect: Chips (All entities, Wave Money, Yoma Bank, Yoma Group, Yoma Land, Yoma Strategic), Department dropdown, Sort dropdown, '7 current leavers' and card grid present.
    - expect: Data MISMATCH: precondition user Ko Ko Naing is greyed out and cannot sign in; use Nandar Lin / Min Khant.

#### 2.2. WALL-002 Leaver card content - MATCH (structure)

**File:** `tests/wall/wall-content.spec.ts`

**Steps:**
  1. Read the Nyein Chan Aung card (Wave Money, Testing, Oct 2027)
    - expect: Pill 'Wave Money', name, 'Testing · Oct 2027', message excerpt, footer 'Open page →' left and status right. Cover band colours / portrait not asserted (visual).

#### 2.3. WALL-003 Card status shows days left / 'Messages closed' - ANSWERS REVIEW

**File:** `tests/wall/wall-content.spec.ts`

**Steps:**
  1. Read status on all 7 cards
    - expect: Observed: all 7 cards show 'Messages closed' (windows closed, even Oct 2027 last-day leavers; page text 'The five-day window has closed'). 'N days left to write' is NOT shown anywhere now; open-window variant could not be observed (it needs a freshly seeded/triggered page, state-changing). Closed variant Match.

#### 2.4. WALL-004 Click card or 'Open page →' opens leaver page in their theme - PARTIAL (cannot verify Ocean wording)

**File:** `tests/wall/wall-content.spec.ts`

**Steps:**
  1. Click whole card Thiri Ko Ko; open Nyein Chan Aung page
    - expect: Card is one link to /p/<slug>; page title 'Thiri Ko Ko’s farewell page' opens with the name - Match. 'Open page →' sits inside the same link.
    - expect: Cannot verify: no Ocean-themed leaver on the wall; Nyein Chan Aung page uses a cinema-style wording ('A WAVE MONEY PICTURE', 'The screening has ended'); Thiri uses 'for Thiri, with love'. 'Send a wave' button does not appear because all windows are closed (shows 'Notes are closed' / 'The five-day window has closed').

#### 2.5. WALL-005 Wall shows each leaver's own farewell, not colleagues' messages - MATCH (partial)

**File:** `tests/wall/wall-content.spec.ts`

**Steps:**
  1. Read cards; compare with message texts on a leaver page
    - expect: Cards show only the leaver's own text. A colleague note from Thiri's page ('The office will be quieter and worse. Good luck.') does not appear on the wall. 'WALL-005 private note' data does not exist on the site.

#### 2.6. WALL-006 Only Live and Closed pages are on the wall - MISMATCH

**File:** `tests/wall/wall-content.spec.ts`

**Steps:**
  1. Compare wall (All entities) with Departures
    - expect: Draft (Aye Chan Moe, Htet Htet Aung, Yee Mon Kyaw, Khin Thida, Ko Ko Naing, Thet Naing Win) and Not triggered (Min Khant, Nandar Lin) are not on the wall - Match.
    - expect: Closed within 90 days: Kyaw Zin Htet, May Thu Aung, Aung Kyaw Moe, Thandar Oo shown with 'Messages closed' - Match. But Closed Zaw Myo Htun (Yoma Strategic, last day 09 Aug 2026) is NOT on the wall - Mismatch.
    - expect: Live: Nyein Chan Aung, Thiri Ko Ko and Su Myat Thu shown, but Live Nandar Shwe, Khin Myat Noe and Thiha Kyaw (last day 09 Oct 2027) are NOT shown - Mismatch.

#### 2.7. WALL-007 Every published leaver within 90 days appears on the wall - MISMATCH (answers Review: not fixed)

**File:** `tests/wall/wall-content.spec.ts`

**Steps:**
  1. Platform admin: count Live + Closed in Departures (GET only); employee: count wall; open each page
    - expect: Departures Live+Closed: Wave Money 8 (6 Live, 2 Closed), Yoma Bank 2 Closed, Yoma Strategic 1 Closed, Yoma Group/Land 0 = 11. Wall shows 7 (Wave 5, Bank 2, Strategic 0). Missing: Nandar Shwe, Khin Myat Noe, Thiha Kyaw (Wave, Live) and Zaw Myo Htun (Strategic, Closed).
    - expect: Pages: all 8 Wave pages return 200 with title '<Name>’s farewell page' (no 404 now, unlike Appendix C #13); the issue is wall omission, not broken links.

#### 2.8. WALL-008 Company chip shows only that company; All entities shows everyone - MATCH (data note)

**File:** `tests/wall/wall-filters.spec.ts`

**Steps:**
  1. Click each chip then All entities
    - expect: Wave Money 5 cards/5; Yoma Bank 2/2; Yoma Group 0 (empty state); Yoma Land 0; Yoma Strategic 0 (empty state, although a Closed Strategic departure exists - see WALL-007); All entities 7. Chips toggle via aria-pressed.

#### 2.9. WALL-009 Department filter and 'Department' clears it - MATCH

**File:** `tests/wall/wall-filters.spec.ts`

**Steps:**
  1. Select Testing, then Department
    - expect: Testing -> 1 card 'Testing · Oct 2027' (Nyein Chan Aung), count '1 current leaver' (singular). Choosing 'Department' restores 7. Dropdown lists only departments present on the wall: Customer Experience, Design, Digital Products, Product, Retail Banking, Testing.

#### 2.10. WALL-010 Default sort 'Closing soonest' - ANSWERS REVIEW

**File:** `tests/wall/wall-filters.spec.ts`

**Steps:**
  1. Read sort and card order
    - expect: Sort shows 'Closing soonest' (value 'closing') by default. Order: Nyein Chan Aung (Oct 2027), Thiri Ko Ko (Oct 2027), Su Myat Thu (Oct 2026), Kyaw Zin Htet (Sep 2026), Aung Kyaw Moe (Sep 2026), May Thu Aung (Aug 2026), Thandar Oo (Aug 2026). No 'N days left' to compare (all closed). Observed order is the same as 'Most recent', i.e. latest last working day first, which does not look like a window-closing-soonest-first rule; the order of Closed pages vs open pages cannot be told apart with the current data.

#### 2.11. WALL-011 Sorting 'Most recent' - ANSWERS REVIEW

**File:** `tests/wall/wall-filters.spec.ts`

**Steps:**
  1. Choose Most recent, then Closing soonest
    - expect: Most recent order: Nyein Chan Aung, Thiri Ko Ko, Su Myat Thu, Kyaw Zin Htet, Aung Kyaw Moe, May Thu Aung, Thandar Oo = last working day descending (month level). Identical to the default order with the current seed, so the two sorts are not distinguishable. Returning to Closing soonest shows the same list.

#### 2.12. WALL-012 Count reads 'N current leavers' and matches cards - MATCH (singular note)

**File:** `tests/wall/wall-filters.spec.ts`

**Steps:**
  1. Read count for All entities and Wave Money
    - expect: '7 current leavers' = 7 cards; Wave Money '5 current leavers' = 5 cards. With exactly one card the text is '1 current leaver' (singular), differing from the 'N current leavers' pattern.

#### 2.13. WALL-013 No match shows '0 current leavers' and empty message - MATCH

**File:** `tests/wall/wall-filters.spec.ts`

**Steps:**
  1. Click Yoma Land (and Yoma Group / Yoma Strategic)
    - expect: '0 current leavers' and 'Nobody matches that filter right now. Some months the Group has no departures at all.' exact. Department combination with no match not tried.

#### 2.14. WALL-014 Filters not kept in the address and reset on reload - MATCH

**File:** `tests/wall/wall-filters.spec.ts`

**Steps:**
  1. Click Wave Money, choose Most recent, check URL, reload
    - expect: URL stays https://.../wall (no query string). After reload: All entities pressed, Department 'all', Sort 'closing' (Closing soonest), 7 current leavers.

#### 2.15. WALL-015 Phone layout - CANNOT VERIFY (manual, visual)

**File:** `tests/wall/wall-layout.spec.ts`

**Steps:**
  1. 390x844 viewport check only
    - expect: No horizontal scroll (scrollWidth 390). Figure FW-009 comparison not possible. Manual case.

#### 2.16. WALL-016 Page leaves the wall after 90 days - CANNOT VERIFY (manual, needs time hook)

**File:** `tests/wall/wall-layout.spec.ts`

**Steps:**
  1. Not run
    - expect: Observation only: Zaw Myo Htun (last day 09 Aug 2026, day 70) is absent from the wall while Thandar Oo (01 Aug 2026, day 78) is present - see WALL-007.

### 3. GAP list (new, not canonical)

**Seed:** `projects/farewell/tests/seed.spec.ts`

#### 3.1. GAP-1 Employee has no 'Create my farewell page' / 'Create page' button in the top bar

**File:** `tests/access/gap-employee-create-button.spec.ts`

**Steps:**
  1. Check where an employee without a page starts creating one (not found in the top bar on desktop or phone)
    - expect: Needs product decision; ACC-001 V1 and ACC-002 expectations are currently unmet.

#### 3.2. GAP-2 Farewell page (/p/...) has no footer

**File:** `tests/access/gap-page-footer.spec.ts`

**Steps:**
  1. Open a Live/Closed page and look for the Group footer
    - expect: Footer is absent; ACC-005 V2 says it should be there (or the case should be changed).

#### 3.3. GAP-3 Account menu has no '×' clear button and role pill differs from subtitle

**File:** `tests/access/gap-menu-details.spec.ts`

**Steps:**
  1. Compare ACC-008/009 '×' step and the pill text ('Live leaver', 'Leaver') with the case
    - expect: Cases mention '×' and one subtitle; app has native search clear and separate pill/subtitle.

#### 3.4. GAP-4 Seed data: no open message window and no Ocean-theme leaver on the wall

**File:** `tests/wall/gap-seed-open-window.spec.ts`

**Steps:**
  1. Look for a card with 'N days left to write' or Ocean wording
    - expect: None exist; WALL-003 V1, WALL-004 step 2 and WALL-010 cannot be verified until a window is open (re-seed note on the Nyein Chan Aung page: window reopens for 5 days after DB re-seed).
