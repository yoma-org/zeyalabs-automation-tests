# Source Issues, Open Questions & Coverage Gaps

[← Test case index](README.md)

Open questions about the test cases. Each item needs an owner before the affected cases are automated.

## Decisions needed

| # | Topic | Detail | Affects |
|---|---|---|---|
| 1 | Award caps swapped | PRD v0.1: single award max 50%, per-recipient max 25%. Built app: single 25%, per-recipient 50%. Confirm and update the PRD. | AWARD-005, FRAUD-006, FRAUD-007 |
| 2 | Leaderboard policy | PRD: Top Givers public, Top Receivers HR-only. Built app ranks receivers publicly ("Top receivers"). Confirm with HR. | BOARD-010 |
| 3 | Escalation recipient | PRD: HR Head. Built app: every HR Admin. | FLAG-006 |
| 4 | Reason for Escalate / Void | Manuals say required; screen shows "Note · optional". | FLAG-008 |
| 5 | Finance Admin lock / unlock | PRD: view + export only. Built app also locks / unlocks months. | PAY-014 |
| 6 | HR Admin without a budget | My Team may show for an HR Admin with no budget; what can they do? | AWARD-011 |
| 7 | Self allocation in flag mode | §9.2 says HR can't change their own budget; §7.4 allows the rule to flag. Does flag mode let it through? | FRAUD-019, FRAUD-020 |
| 8 | Rapid spend boundary | Rule "> 60%" vs example "≥ 63,000": is exactly 60% flagged? | FRAUD-012 |
| 9 | Refusal messages | Exact text for each blocking rule, budget-adjust refusal, last-HR-Admin guard, permission denials. | FRAUD-001…009, BUDG-008, ADMIN-007, access cases |
| 10 | Sign-in / SSO | Sign-in screen and SSO provider not documented (PRD Q2); deactivated-user behaviour not described. | AUTH-001, AUTH-003 |
| 11 | Burmese text | How Burmese characters count toward 20–300; search with Burmese. | PEER-007 |
| 12 | Payroll CSV | Exact header names/order; extra Finance fields (PRD Q9); Employee ID source (PRD Q6). | PAY-007, PAY-010 |
| 13 | Count mismatch | Admin overview vs fraud queue counts differ in test data. | RPT-001 |
| 14 | Standard budget | 35,000 MMK per direct report vs PRD ≈ USD 7.50; total envelope undecided (PRD Q1). | BUDG-001 |

<!-- generated:review (npm run cases:build) -->
## Cases in Review status (0 rows)

Kept in the suites, but the expected result must be confirmed before an automated assertion is trusted.

| ID | Row | Test case | Why |
|---|---|---|---|
<!-- /generated:review -->
