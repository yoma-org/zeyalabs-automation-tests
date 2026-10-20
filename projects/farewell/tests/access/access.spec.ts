// 01 · Access & Accounts — docs/test-cases/features/01-access.md
import { test, expect, signedInAs, signedOut } from '@fixtures';
import { blockedAccounts } from '@data/static/seededAccounts';
import { caseAnnotations } from '@helpers/testCase';
import { accountName, type Role } from '@utils/Environment';

test.describe('Roles and top bar', () => {
  const homeVariants: { label: string; role: Role }[] = [
    { label: 'base', role: 'live-leaver' },
    { label: 'admin in the People console', role: 'wave-admin' },
    { label: 'a farewell page as a reader', role: 'employee' }
  ];

  for (const v of homeVariants) {
    test.describe(() => {
      test.use(signedInAs(v.role));

      test(`ACC-003 [${v.label}] the logo and home icon return to the Alumni Wall from any page`, {
        tag: ['@P3'],
        annotation: caseAnnotations('ACC-003')
      }, async ({ page, header, wallPage, farewellPage }) => {
        await wallPage.goto();

        if (v.label === 'base') {
          await header.yourPageLink.click();
          await expect(page).toHaveURL(/\/builder/);
          await header.homeLink.click();
        } else if (v.label === 'admin in the People console') {
          await header.adminLink.click();
          await expect(page).toHaveURL(/\/people/);
          await header.homeLink.click();
        } else {
          await wallPage.cardAt(0).root.click();
          await expect(page).toHaveURL(/\/p\//);
          await farewellPage.homeLink.click();
        }

        await expect(wallPage.heading).toBeVisible();
      });
    });
  }

  const adminVariants: { label: string; role: Role; heading: RegExp }[] = [
    { label: 'base', role: 'wave-admin', heading: /^Departures · Wave Money$/ },
    { label: 'Platform admin', role: 'platform-admin', heading: /^Departures · / }
  ];

  for (const v of adminVariants) {
    test.describe(() => {
      test.use(signedInAs(v.role));

      test(`ACC-004 [${v.label}] "Admin" opens the People console at Departures`, {
        tag: ['@P2'],
        annotation: caseAnnotations('ACC-004')
      }, async ({ page, header, wallPage, peopleConsole }) => {
        await wallPage.goto();

        await header.adminLink.click();

        await expect(page).toHaveURL(/\/people/);
        await expect(peopleConsole.heading).toHaveText(v.heading);
        await expect(peopleConsole.departuresTab).toHaveAttribute('aria-current', 'page');
      });
    });
  }
});

test.describe('Test-site account switcher', () => {
  test.use(signedInAs('employee'));

  test('ACC-006 choosing an account from the menu reloads the wall as that person', {
    tag: ['@P1', '@critical', '@smoke'],
    annotation: caseAnnotations('ACC-006', 'FW-004')
  }, async ({ page, header, wallPage }) => {
    const other = accountName('wave-employee'); // "Min Khant" in the case
    await wallPage.goto();

    await header.accountMenu.open();
    await expect(header.accountMenu.switchHeading).toHaveText('SWITCH ACCOUNT', { useInnerText: true });

    await header.accountMenu.switchTo(other);

    await expect(page).toHaveURL(/\/wall$/);
    await expect(wallPage.greeting).toContainText(`Hi ${other} 👋`);
    await expect(header.accountMenu.trigger).toContainText(initials(other));
  });

  test('ACC-007 the account menu shows the signed-in person, role pill, groups and a tick on the current account', {
    tag: ['@P2'],
    annotation: caseAnnotations('ACC-007', 'FW-004')
  }, async ({ header, wallPage }) => {
    const me = accountName('employee');
    const menu = header.accountMenu;
    await wallPage.goto();

    await menu.open();
    await expect(menu.trigger).toContainText(initials(me));
    await expect(menu.title).toHaveText(me);
    await expect(menu.subline).toHaveText(/^\S+@\S+$/);
    await expect(menu.rolePill).toHaveText('Employee');

    await expect(menu.groupHeadings).toHaveText(
      ['PLATFORM ADMINS', 'WAVE MONEY ADMINS', 'YOMA BANK ADMINS', 'YOMA GROUP ADMINS', 'LEAVERS', 'EMPLOYEES'],
      { useInnerText: true }
    );

    await expect(menu.currentAccount).toHaveCount(1);
    await expect(menu.currentAccount).toContainText(me);
    await expect(menu.currentAccount).toContainText('✓');
  });

  const blocked = [
    { label: 'base', ...blockedAccounts.disabled },
    { label: 'deleted from the Employee List', ...blockedAccounts.removed },
    { label: 'last working day passed', ...blockedAccounts.lastDayReached }
  ];

  for (const v of blocked) {
    test(`ACC-010 [${v.label}] accounts that cannot be used are greyed out with their reason`, {
      tag: ['@P1'],
      annotation: caseAnnotations('ACC-010', v.label === 'base' ? 'FW-004' : undefined)
    }, async ({ page, header, wallPage }) => {
      const me = accountName('employee');
      await wallPage.goto();

      await header.accountMenu.open();
      const row = header.accountMenu.account(v.name);
      await expect(row).toContainText(v.reason);
      await expect(row.getByRole('button')).toHaveCount(0); // greyed out: not a choosable button

      await row.getByText(v.name).click();

      await expect(page).toHaveURL(/\/wall$/);
      await expect(wallPage.greeting).toContainText(`Hi ${me}`);
      await expect(header.accountMenu.trigger).toContainText(me);
    });
  }
});

test.describe('Sign-in and protection', () => {
  test.use(signedOut);

  test('ACC-011 signed out, the account menu reads "Choose an account" with the test-phase note', {
    tag: ['@P3'],
    annotation: caseAnnotations('ACC-011', 'FW-008')
  }, async ({ loginPage, header }) => {
    await loginPage.goto();

    await header.accountMenu.open();

    await expect(header.accountMenu.title).toHaveText('Choose an account');
    await expect(header.accountMenu.subline).toHaveText(
      'Test phase — pick any account on this test site. There is no password while this is on.'
    );
  });

  test('ACC-012 a signed-out user opening the Alumni Wall is sent to the sign-in page', {
    tag: ['@P1'],
    annotation: caseAnnotations('ACC-012', 'FW-008')
  }, async ({ page, loginPage, header, wallPage }) => {
    const employee = accountName('employee');

    await wallPage.goto();

    await expect(page).toHaveURL(/\/login/);
    await expect(loginPage.heading).toBeVisible();
    await expect(wallPage.cards).toHaveCount(0);

    await header.accountMenu.switchTo(employee);

    await expect(wallPage.heading).toBeVisible();
    await expect(wallPage.greeting).toContainText(`Hi ${employee} 👋`);
  });
});

function initials(name: string): string {
  const words = name.split(' ');
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
