// 02 · Alumni Wall — docs/test-cases/features/02-alumni-wall.md
import { test, expect, signedInAs } from '@fixtures';
import { companyWithoutLeavers, leaverWithMessages, testingLeaver } from '@data/static/seededAccounts';
import { caseAnnotations, leaverCountText } from '@helpers/testCase';
import { accountName } from '@utils/Environment';

test.describe('Wall content', () => {
  test.describe(() => {
    test.use(signedInAs('wave-employee'));

    test('WALL-001 a signed-in employee sees the wall heading, personal greeting and privacy note', {
      tag: ['@P1', '@critical', '@smoke'],
      annotation: caseAnnotations('WALL-001', 'FW-001')
    }, async ({ wallPage }) => {
      const me = accountName('wave-employee'); // "Min Khant" in the case

      await wallPage.goto();

      await expect(wallPage.heading).toBeVisible();
      await expect(wallPage.greeting).toHaveText(
        `Hi ${me} 👋 These are colleagues from across Yoma Group who’ve recently moved on to their next chapter. ` +
          'Stop by their page, share a memory or say thank you before it closes.'
      );
      await expect(wallPage.privacyNote).toHaveText(
        'Only Yoma Group colleagues can see this wall. Each page stays for a while after their last day, and messages from colleagues stay private.'
      );
      await expect(wallPage.companyChips).toBeVisible();
      await expect(wallPage.departmentFilter).toBeVisible();
      await expect(wallPage.sort).toBeVisible();
      await expect(wallPage.count).toBeVisible();
      await expect(wallPage.cards.first()).toBeVisible();
    });
  });

  test.describe(() => {
    test.use(signedInAs('employee'));

    test('WALL-002 a leaver\'s card shows company, portrait, name, department and month, and farewell start', {
      tag: ['@P2'],
      annotation: caseAnnotations('WALL-002', 'FW-005')
    }, async ({ wallPage }) => {
      await wallPage.goto();
      const card = wallPage.card(testingLeaver.name);

      await expect(card.band).toBeVisible();
      await expect(card.company).toHaveText(testingLeaver.company);
      await expect(card.portrait).toBeVisible();
      await expect(card.name).toHaveText(testingLeaver.name);
      await expect(card.meta).toHaveText(testingLeaver.meta);
      await expect(card.excerpt).not.toBeEmpty();
      await expect(card.openPage).toBeVisible();
      await expect(card.status).toHaveText(/^(\d+ days? left to write|Messages closed)$/);
    });

    test('WALL-005 the wall shows each leaver\'s own farewell, never colleagues\' messages', {
      tag: ['@P1'],
      annotation: caseAnnotations('WALL-005')
    }, async ({ page, wallPage, farewellPage }) => {
      await wallPage.goto();
      const card = wallPage.card(leaverWithMessages);
      await expect(card.excerpt).not.toBeEmpty();

      // Read one visible colleague message from the leaver's own page.
      await card.root.click();
      const message = (await farewellPage.messageTexts.first().innerText()).trim();
      expect(message).not.toBe('');

      await wallPage.goto();

      await expect(wallPage.cards.first()).toBeVisible();
      await expect(page.getByRole('main')).not.toContainText(message);
    });
  });
});

test.describe('Filters and sort', () => {
  test.use(signedInAs('employee'));

  const companies = [
    { label: 'base', company: 'Wave Money' },
    { label: 'Yoma Bank', company: 'Yoma Bank' },
    { label: 'Yoma Group', company: 'Yoma Group' },
    { label: 'Yoma Land', company: 'Yoma Land' },
    { label: 'Yoma Strategic', company: 'Yoma Strategic' }
  ];

  for (const v of companies) {
    test(`WALL-008 [${v.label}] a company chip shows only that company's leavers; "All entities" shows everyone`, {
      tag: ['@P2'],
      annotation: caseAnnotations('WALL-008', v.label === 'base' ? 'FW-002' : undefined)
    }, async ({ wallPage }) => {
      await wallPage.goto();
      await expect(wallPage.cards.first()).toBeVisible();
      const total = await wallPage.cards.count();

      await wallPage.chip(v.company).click();

      await expect(wallPage.chip(v.company)).toHaveAttribute('aria-pressed', 'true');
      const shown = await wallPage.cards.count();
      for (let i = 0; i < shown; i++) await expect(wallPage.cardAt(i).company).toHaveText(v.company);
      await expect(wallPage.count).toHaveText(leaverCountText(shown));
      if (shown === 0) await expect(wallPage.emptyMessage).toBeVisible();

      await wallPage.chip('All entities').click();

      await expect(wallPage.chip('All entities')).toHaveAttribute('aria-pressed', 'true');
      await expect(wallPage.cards).toHaveCount(total);
      await expect(wallPage.count).toHaveText(leaverCountText(total));
    });
  }

  test('WALL-009 the "Department" filter shows one department and choosing "Department" clears it', {
    tag: ['@P2'],
    annotation: caseAnnotations('WALL-009', 'FW-002')
  }, async ({ wallPage }) => {
    await wallPage.goto();
    await expect(wallPage.cards.first()).toBeVisible();
    const total = await wallPage.cards.count();

    await wallPage.departmentFilter.selectOption({ label: 'Testing' });

    const shown = await wallPage.cards.count();
    expect(shown).toBeGreaterThan(0);
    for (let i = 0; i < shown; i++) await expect(wallPage.cardAt(i).meta).toHaveText(/^Testing · [A-Z][a-z]{2} \d{4}$/);
    await expect(wallPage.count).toHaveText(leaverCountText(shown));

    await wallPage.departmentFilter.selectOption({ label: 'Department' });

    await expect(wallPage.cards).toHaveCount(total);
    const departments = new Set((await wallPage.cardMetas.allInnerTexts()).map(m => m.split(' · ')[0]));
    expect(departments.size).toBeGreaterThan(1);
  });

  test('WALL-013 when no leaver matches, the wall shows "0 current leavers" and the empty message', {
    tag: ['@P3'],
    annotation: caseAnnotations('WALL-013', 'FW-006')
  }, async ({ wallPage }) => {
    await wallPage.goto();

    await wallPage.chip(companyWithoutLeavers).click();
    await expect(wallPage.departmentFilter).toHaveValue('all');

    await expect(wallPage.count).toHaveText('0 current leavers');
    await expect(wallPage.cards).toHaveCount(0);
    await expect(wallPage.emptyMessage).toBeVisible();
  });

  test('WALL-014 filters are not kept in the page address and reset on reload', {
    tag: ['@P3'],
    annotation: caseAnnotations('WALL-014', 'FW-006')
  }, async ({ page, wallPage }) => {
    await wallPage.goto();
    const address = page.url();

    await wallPage.chip('Wave Money').click();
    await wallPage.departmentFilter.selectOption({ label: 'Testing' });
    await wallPage.sort.selectOption({ label: 'Most recent' });

    expect(page.url()).toBe(address);

    await page.reload();

    await expect(wallPage.chip('All entities')).toHaveAttribute('aria-pressed', 'true');
    await expect(wallPage.departmentFilter.locator('option:checked')).toHaveText('Department');
    await expect(wallPage.sort.locator('option:checked')).toHaveText('Closing soonest');
  });
});
