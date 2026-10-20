// src/components/AccountMenu.ts — the test-site account switcher ("?" / avatar at the top right).
// It is a <details> with few roles, so CSS classes are used here and only here.
import { type Locator, type Page } from '@playwright/test';

export class AccountMenu {
  readonly trigger: Locator;
  readonly title: Locator;
  readonly subline: Locator;
  readonly rolePill: Locator;
  readonly switchHeading: Locator;
  readonly searchBox: Locator;
  readonly groupHeadings: Locator;
  readonly emptyMessage: Locator;
  readonly currentAccount: Locator;
  private readonly root: Locator;
  private readonly menu: Locator;

  constructor(private readonly page: Page) {
    this.root = page.locator('header details.switcher');
    this.trigger = this.root.locator('summary');
    this.menu = this.root.locator('.switcher__menu');
    // Signed out: "Choose an account" + the test-phase note. Signed in: name + work email.
    this.title = this.menu.locator('.switcher__head-name');
    this.subline = this.menu.locator('.switcher__email');
    this.rolePill = this.menu.locator('.switcher__chip');
    this.switchHeading = this.menu.locator('.switcher__eyebrow');
    this.searchBox = this.menu.getByRole('searchbox', { name: 'Search accounts' });
    this.groupHeadings = this.menu.locator('.switcher__group');
    this.emptyMessage = this.menu.getByText('No account matches.');
    this.currentAccount = this.menu.locator('[aria-current="true"]');
  }

  async open(): Promise<void> {
    if (!(await this.root.evaluate(d => (d as HTMLDetailsElement).open))) await this.trigger.click();
  }

  /** The list row of an account, usable or greyed out. */
  account(name: string): Locator {
    return this.menu.locator('li').filter({ has: this.page.locator('.switcher__name-row', { hasText: name }) });
  }

  /** Signs in as another account; the app reloads on the Alumni Wall. */
  async switchTo(name: string): Promise<void> {
    await this.open();
    await this.account(name).getByRole('button').click();
    await this.page.waitForURL('**/wall');
  }
}
