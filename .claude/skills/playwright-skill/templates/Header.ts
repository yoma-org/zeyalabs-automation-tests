import { type Locator, type Page } from '@playwright/test';

export class Header {
  readonly profileMenu: Locator;
  readonly logoutButton: Locator;

  constructor(private readonly page: Page) {
    this.profileMenu = page.getByRole('button', { name: 'Profile' });
    this.logoutButton = page.getByRole('menuitem', { name: 'Log out' });
  }

  async logout(): Promise<void> {
    await this.profileMenu.click();
    await this.logoutButton.click();
  }
}
