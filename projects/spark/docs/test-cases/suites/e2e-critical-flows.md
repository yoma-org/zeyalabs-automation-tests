# E2E Suite — Critical Business Flows ★

[← Test case index](../README.md)

End-to-end scenarios that chain catalogued test cases (linked by ID) into one run with shared data. Hand-written; `npm run cases:build` only counts the `## E2E-nn` headings.

- All flows are **P1 ★**. A failed flow blocks release.
- Flows are independent: each creates its own data.

| Flow | Name | Modules crossed | Automation |
|---|---|---|---|
| E2E-01 | Peer recognition reaches the company | Peer · Board · Notifications | Auto-UI |
| E2E-02 | Clean award is paid through payroll | Budget · Award · Board · Notifications · Payroll | Auto-UI+API |
| E2E-03 | Flagged award is held, then released by HR | Award · Fraud · Flag review · Payroll | Auto-UI+API |
| E2E-04 | Flagged award is voided, then restored | Fraud · Flag review · Budget · Notifications | Auto-UI |
| E2E-05 | Blocked award never reaches budget or board | Award · Fraud | Auto-UI |
| E2E-06 | Correction in an exported payroll month | Payroll · Void · Payroll | Auto-UI+API |

## E2E-01 · Peer recognition reaches the company

**Why critical:** Peer recognition is the main use of SPARK; if a sent spark is not visible and notified, the product fails its purpose.

**Setup:** Employees S, R and V in one entity, all signed in at least once; S has peer allowance left this month.

| # | Step | Verify | Cases |
|---|---|---|---|
| 1 | S sends a peer recognition to R | "Spark sent!"; card on "Latest recognitions"; listed in S's My Sparks | [PEER-001](../features/02-peer-recognition.md) |
| 2 | V opens Home | The card is visible to V within 60 seconds | [BOARD-001](../features/03-board-leaderboard.md) |
| 3 | R opens the notification log | Peer-recognition email listed as Sent within 2 minutes | [NOTIF-001](../features/09-notifications.md) |

## E2E-02 · Clean award is paid through payroll

**Why critical:** This is the money path: a wrong debit, a leaked amount or a missing payroll row is a financial or privacy incident.

**Setup:** New leader L in entity A with 3 direct reports (R1–R3) and no budget this quarter; HR Admin; employee V; all recipients have an Employee ID; no award On hold in the open month.

| # | Step | Verify | Cases |
|---|---|---|---|
| 1 | HR allocates 105,000 MMK to L | Budget 105,000; history entry with reason | [BUDG-003](../features/07-budget.md) |
| 2 | L sends R1 a 10,000 MMK award with a message longer than 40 characters | "Spark sent!" with payroll month; 95,000 left; "Waiting for payroll" | [AWARD-001](../features/04-financial-award.md) |
| 3 | V opens the board | Card shows "includes a financial award", no amount | [BOARD-005](../features/03-board-leaderboard.md) |
| 4 | R1 opens the notification log | Email "including a financial award", no amount | [NOTIF-002](../features/09-notifications.md) |
| 5 | HR generates the payroll CSV for the month | R1 row with 1 award, 10,000 MMK; month Exported | [PAY-004](../features/08-payroll.md) |
| 6 | R1 opens My Sparks | "Paid in the {month} salary slip" | [BOARD-009](../features/03-board-leaderboard.md) |

## E2E-03 · Flagged award is held, then released by HR

**Why critical:** A held award blocks the whole month's payroll export; HR must be able to clear it before the cutoff.

**Setup:** Leader L in entity A with 105,000 MMK and no awards; Generic message rule on (default); HR Admin who is not L or R1.

| # | Step | Verify | Cases |
|---|---|---|---|
| 1 | L sends R1 10,000 MMK with "Thanks for your help on the project" | "Spark sent!"; On hold; flag in the fraud queue; 95,000 left | [FRAUD-011](../features/05-fraud-rules.md) |
| 2 | HR opens the payroll export for the month | "Generate CSV" disabled | [PAY-005](../features/08-payroll.md) |
| 3 | HR dismisses the flag | Award "Waiting for payroll"; included in the preview | [FLAG-004](../features/06-flag-review.md) |
| 4 | HR generates the payroll CSV | R1 row with 10,000 MMK; month Exported | [PAY-004](../features/08-payroll.md) |

## E2E-04 · Flagged award is voided, then restored

**Why critical:** Void and restore move money back and forth in the budget and change what is paid; errors here cause over- or under-payment.

**Setup:** Leader L in entity A with 105,000 MMK and no awards; HR Admin who is not L or R1; payroll month Open.

| # | Step | Verify | Cases |
|---|---|---|---|
| 1 | L sends R1 10,000 MMK with a generic message | Flagged, On hold; 95,000 left | [FRAUD-011](../features/05-fraud-rules.md) |
| 2 | HR voids the award from the flag | Voided; 105,000 left; card and counts gone; not in preview | [FLAG-007](../features/06-flag-review.md) |
| 3 | R1 and L open their notification logs | Withdrawal emails, no amount | [NOTIF-003](../features/09-notifications.md) |
| 4 | HR restores the award | Flag Open again; award On hold; 95,000 left | [FLAG-013](../features/06-flag-review.md) |

## E2E-05 · Blocked award never reaches budget or board

**Why critical:** Blocking rules are the main fraud control; a blocked award that still debits or posts breaks budget and trust.

**Setup:** Leader L in entity A with 105,000 MMK (25% = 26,250) and no awards; HR Admin.

| # | Step | Verify | Cases |
|---|---|---|---|
| 1 | L sends R1 26,251 MMK | Refused with a reason; no "Spark sent!" | [FRAUD-006](../features/05-fraud-rules.md) |
| 2 | L opens My Team; HR opens the "Blocked" tab | Budget 105,000; no card; Blocked record with rule and reason; not a flag | [FRAUD-009](../features/05-fraud-rules.md) |

## E2E-06 · Correction in an exported payroll month

**Why critical:** After export only a controlled unlock → change → re-export keeps one effective payroll file per entity and month.

**Setup:** Entity A month {month} with clean awards to R1 (10,000 + 5,000) and R2 (8,000); HR Admin; leader L with budget left.

| # | Step | Verify | Cases |
|---|---|---|---|
| 1 | HR exports {month} | File listed; month Exported | [PAY-004](../features/08-payroll.md) |
| 2 | HR unlocks {month} with a reason | Month Reopened; new awards go to {month + 1} | [PAY-012](../features/08-payroll.md) |
| 3 | HR voids R2's award with a reason | Voided; L's budget credited | [FLAG-011](../features/06-flag-review.md) |
| 4 | HR locks and re-exports {month} | Both files listed; new file has only R1 with 15,000 MMK | [PAY-013](../features/08-payroll.md) |
