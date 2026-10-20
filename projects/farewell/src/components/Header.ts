// src/components/Header.ts — the top bar on the wall, builder and People console.
import { type Locator, type Page } from '@playwright/test';
import { AccountMenu } from '@components/AccountMenu';

export class Header {
  readonly homeLink: Locator;
  readonly adminLink: Locator;
  readonly yourPageLink: Locator;
  readonly accountMenu: AccountMenu;

  constructor(page: Page) {
    const bar = page.getByRole('navigation', { name: 'Main' });
    this.homeLink = bar.getByRole('link', { name: 'Yoma Farewell, home' });
    this.adminLink = bar.getByRole('link', { name: /^Admin/ });
    this.yourPageLink = bar.getByRole('link', { name: 'Your farewell page' });
    this.accountMenu = new AccountMenu(page);
  }
}
