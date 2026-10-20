// src/pages/LoginPage.ts — the test-phase sign-in page (no password: choose an account).
import { type Locator, type Page } from '@playwright/test';
import { Routes } from '@constants/Routes';
import { Header } from '@components/Header';

export class LoginPage {
  readonly heading: Locator;
  readonly header: Header;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Choose a test account', level: 1 });
    this.header = new Header(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(Routes.login);
  }

  async signInAs(accountName: string): Promise<void> {
    await this.goto();
    await this.header.accountMenu.switchTo(accountName);
  }
}
