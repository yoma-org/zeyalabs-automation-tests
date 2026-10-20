// tests/auth.setup.ts — signs in every role from the test-site account menu and saves its session.
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { WallPage } from '@pages/WallPage';
import { accountName, authFile, roles } from '@utils/Environment';

for (const role of roles) {
  setup(`authenticate ${role}`, async ({ page }) => {
    const name = accountName(role);

    await new LoginPage(page).signInAs(name);
    await expect(new WallPage(page).greeting).toContainText(`Hi ${name}`);

    await page.context().storageState({ path: authFile(role) });
  });
}
