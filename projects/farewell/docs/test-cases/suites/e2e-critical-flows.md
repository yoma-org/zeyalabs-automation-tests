# E2E Suite — Critical Business Flows ★

[← Test case index](../README.md)

End-to-end scenarios that chain catalogued test cases (linked by ID) into one run with shared data. Hand-written; `npm run cases:build` only counts the `## E2E-nn` headings.

- All flows are **P1 ★**. A failed flow blocks release.
- Flows are independent: each creates its own data.

| Flow | Name | Modules crossed | Automation |
|---|---|---|---|
| [E2E-01](#e2e-01--farewell-from-set-up-to-booklet) | Farewell from set-up to booklet | Employee List → Departures → Builder → Publish → Message → Moderation → Booklet | Auto-UI+API |

## E2E-01 · Farewell from set-up to booklet

**Why critical:** this is the whole product: a leaver gets a page, colleagues write, the People team moderates, the leaver gets a keepsake.

**Setup:** a fresh employee imported for this run (unique work email); a Platform admin or the employee's company admin.

| # | Step | Verify | Cases |
|---|---|---|---|
| 1 | Admin imports the new employee | "Imported …", person in the table | [EMP-004](../features/12-employee-list.md) |
| 2 | Admin records a last working day | Row "Not triggered" | [DEP-005](../features/09-departures.md) |
| 3 | Admin triggers the departure | "Triggered.", status "Draft" | [DEP-011](../features/09-departures.md) |
| 4 | Leaver chooses a theme | Preview shows the theme | [STYLE-002](../features/04-builder-style.md) |
| 5 | Leaver writes the farewell and saves a personal email | "Farewell written", "Saved. Your booklet will be sent here." | [WRITE-006](../features/05-builder-message.md), [WRITE-011](../features/05-builder-message.md) |
| 6 | Leaver publishes | "Your page is live", card on the wall | [PUB-006](../features/06-publish.md), [PUB-007](../features/06-publish.md) |
| 7 | Visitor opens the link without signing in and leaves two messages | "Message sent. Thank you!", count +1 each | [MSG-001](../features/07-leave-message.md), [MSG-004](../features/07-leave-message.md) |
| 8 | Admin hides one message | "The message is hidden.", gone from the page | [MOD-004](../features/10-moderation.md) |
| 9 | Admin downloads the booklet | PDF has the farewell and the visible message, not the hidden one | [BOOK-001](../features/11-booklet.md) |

<!-- Add flows as:

## E2E-nn · <Flow name>

**Why critical:** …

**Setup:** …

| # | Step | Verify | Cases |
|---|---|---|---|
| 1 | … | … | [AUTH-001](../features/01-login.md) |
-->
