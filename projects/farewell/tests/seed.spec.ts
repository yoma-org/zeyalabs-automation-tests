// tests/seed.spec.ts — starting point for the playwright-test-* agents: signed in as an employee on the wall.
import { test, expect, signedInAs } from '@fixtures';

test.use(signedInAs('employee'));

test.describe('Test group', () => {
  test('seed', async ({ wallPage }) => {
    await wallPage.goto();
    await expect(wallPage.heading).toBeVisible();
    // generate code here.
  });
});
