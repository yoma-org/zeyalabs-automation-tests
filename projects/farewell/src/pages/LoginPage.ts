// src/pages/LoginPage.ts — /login: the account menu on the dev test site, Microsoft SSO on UAT.
import { type Locator, type Page } from '@playwright/test';
import { Routes } from '@constants/Routes';
import { Header } from '@components/Header';
import { MicrosoftSignInPage } from '@pages/MicrosoftSignInPage';
import { env } from '@utils/Environment';

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

  /** Dev test site: picks the account from the account menu (no password). */
  async signInAs(accountName: string): Promise<void> {
    await this.goto();
    await this.header.accountMenu.switchTo(accountName);
  }

  /**
   * UAT: /login redirects to Microsoft; signs in there and comes back to the app.
   * Without a password, the person at the headed browser types it and answers MFA.
   */
  async signInWithMicrosoft(email: string, password?: string): Promise<void> {
    await this.goto();
    const microsoft = new MicrosoftSignInPage(this.page);
    const appOrigin = new URL(env.baseUrl).origin;
    if (password) await microsoft.signIn(email, password, appOrigin);
    else await microsoft.signInManually(email, appOrigin);
  }
}
