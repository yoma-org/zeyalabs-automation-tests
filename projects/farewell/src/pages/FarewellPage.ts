// src/pages/FarewellPage.ts — a leaver's public farewell page (/p/<slug>). Words differ per theme (guide §9).
import { type Locator, type Page } from '@playwright/test';

export class FarewellPage {
  readonly leaverName: Locator;
  readonly homeLink: Locator;
  readonly messages: Locator;
  readonly messageTexts: Locator;
  readonly messageAuthors: Locator;

  constructor(page: Page) {
    this.leaverName = page.getByRole('heading', { level: 1 });
    // This page has its own top bar (no account menu): the logo link has a different name.
    this.homeLink = page.getByRole('link', { name: 'Yoma Farewell — back to home' });
    this.messages = page.locator('article.msg');
    this.messageTexts = this.messages.locator('.msg__text');
    this.messageAuthors = this.messages.locator('.msg__author');
  }
}
