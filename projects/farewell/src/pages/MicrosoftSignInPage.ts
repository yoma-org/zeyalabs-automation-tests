// src/pages/MicrosoftSignInPage.ts — the Microsoft Entra sign-in pages (login.microsoftonline.com) UAT redirects to.
import { type Locator, type Page } from '@playwright/test';

export class MicrosoftSignInPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly nextButton: Locator;
  readonly signInButton: Locator;
  readonly staySignedInHeading: Locator;
  readonly staySignedInNo: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.staySignedInHeading = page.getByText('Stay signed in?');
    this.staySignedInNo = page.getByRole('button', { name: 'No' });
  }

  /**
   * Email → Next → password → Sign in, answers "Stay signed in?" if Microsoft asks,
   * and waits until the browser is back on `appOrigin`. An MFA prompt cannot be answered
   * here: the account must be exempt from MFA, or the wait times out.
   */
  async signIn(email: string, password: string, appOrigin: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.nextButton.click();
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await this.waitUntilBackIn(appOrigin, 60_000);
  }

  /** Fills the email, then leaves password and MFA to the person at the (headed) browser. */
  async signInManually(email: string, appOrigin: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.nextButton.click();
    await this.waitUntilBackIn(appOrigin, 180_000);
  }

  private async waitUntilBackIn(appOrigin: string, timeout: number): Promise<void> {
    const backInApp = (url: URL) => url.origin === appOrigin;
    await Promise.race([
      this.page.waitForURL(backInApp, { timeout }),
      this.staySignedInHeading.waitFor({ timeout }).then(() => this.staySignedInNo.click()).catch(() => {})
    ]);
    await this.page.waitForURL(backInApp, { timeout });
  }
}
