// tests/auth.setup.ts — signs in every role available on this environment and saves its session.
// UAT: Microsoft SSO (<ROLE>_EMAIL / <ROLE>_PASSWORD). Dev test site: account menu (<ROLE>_ACCOUNT).
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { WallPage } from '@pages/WallPage';
import { authFile, roles, signIn } from '@utils/Environment';

for (const role of roles) {
  setup(`authenticate ${role}`, async ({ page }) => {
    const how = signIn(role);
    setup.skip(how.kind === 'none', `No credentials for ${role} on this environment`);
    const loginPage = new LoginPage(page);

    if (how.kind === 'sso') {
      if (!how.password) setup.setTimeout(240_000); // time to type the password and approve MFA
      await loginPage.signInWithMicrosoft(how.email, how.password);
      // /auth/refused means Microsoft signed in but the app did not accept the account.
      await expect(page).not.toHaveURL(/\/(login|auth\/)/);
    } else if (how.kind === 'account-menu') {
      await loginPage.signInAs(how.accountName);
      await expect(new WallPage(page).greeting).toContainText(`Hi ${how.accountName}`);
    }

    await page.context().storageState({ path: authFile(role) });
  });
}
