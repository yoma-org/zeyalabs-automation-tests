// src/fixtures/index.ts — the only import specs use: import { test, expect, signedInAs } from '@fixtures'
import { authFile, type Role } from '@utils/Environment';

export { test } from './base.fixture';
export { expect } from '@playwright/test';

/** `test.use(signedInAs('employee'))` — start the tests in this scope signed in as that role. */
export function signedInAs(role: Role): { storageState: string } {
  return { storageState: authFile(role) };
}

/** `test.use(signedOut)` — a visitor with no account chosen. */
export const signedOut = { storageState: { cookies: [], origins: [] } };
