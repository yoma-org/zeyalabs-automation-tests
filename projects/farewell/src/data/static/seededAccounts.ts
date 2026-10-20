// src/data/static/seededAccounts.ts — seeded test-site accounts that read-only cases rely on
// (checked 18–19 Oct 2026, see specs/access-wall.md). Never change their state from a test.

// Accounts the account menu shows greyed out, with the reason it shows.
export const blockedAccounts = {
  disabled: { name: 'Nwe Nwe Htwe', reason: 'Account disabled' },
  removed: { name: 'Hla Hla Myint', reason: 'Removed from the Employee List' },
  lastDayReached: { name: 'Ko Ko Naing', reason: 'Last working day reached' }
} as const;

// A Live Wave Money leaver in "Testing" whose last working day is in Oct 2027 (WALL-002).
export const testingLeaver = { name: 'Nyein Chan Aung', company: 'Wave Money', meta: 'Testing · Oct 2027' } as const;

// A Live leaver whose page has visible colleague messages (WALL-005).
export const leaverWithMessages = 'Thiri Ko Ko';

// A company chip with no current leavers on the wall (WALL-013).
export const companyWithoutLeavers = 'Yoma Land';
