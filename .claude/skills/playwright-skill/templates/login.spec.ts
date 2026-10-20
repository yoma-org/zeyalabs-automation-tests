// tests/auth/login.spec.ts
import { test, expect } from '@fixtures';
import { credentials } from '@utils/Environment';

test.describe('Login & Authentication', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test(
    'AUTH-001 login with valid credentials lands on dashboard',
    {
      tag: ['@smoke', '@P1', '@critical'],
      annotation: [
        { type: 'tc', description: 'AUTH-001' },
        { type: 'source', description: 'TC_Login_001' }
      ]
    },
    async ({ loginPage, dashboardPage }) => {
      await loginPage.goto();
      const { email, password } = credentials('admin');
      await loginPage.login(email, password);

      await expect(loginPage.toast).toContainText('Logged in Successfully');
      await expect(dashboardPage.heading).toBeVisible();
    }
  );
});
