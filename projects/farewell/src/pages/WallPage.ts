// src/pages/WallPage.ts — the Alumni Wall (/wall).
import { type Locator, type Page } from '@playwright/test';
import { Routes } from '@constants/Routes';
import { Header } from '@components/Header';
import { WallCard } from '@components/WallCard';

export class WallPage {
  readonly heading: Locator;
  readonly greeting: Locator;
  readonly privacyNote: Locator;
  readonly companyChips: Locator;
  readonly departmentFilter: Locator;
  readonly sort: Locator;
  readonly count: Locator;
  readonly cards: Locator;
  readonly cardMetas: Locator;
  readonly emptyMessage: Locator;
  readonly header: Header;

  constructor(private readonly page: Page) {
    const main = page.getByRole('main');
    this.heading = main.getByRole('heading', { name: 'Alumni Wall', level: 1 });
    this.greeting = main.locator('p').filter({ hasText: /^Hi / });
    this.privacyNote = main.getByText('Only Yoma Group colleagues can see this wall.', { exact: false });
    this.companyChips = main.getByRole('group', { name: 'Filter by entity' });
    this.departmentFilter = main.getByRole('combobox', { name: 'Filter by department' });
    this.sort = main.getByRole('combobox', { name: 'Sort' });
    this.count = main.getByText(/^\d+ current leavers?$/);
    this.cards = main.locator('a[href^="/p/"]');
    this.cardMetas = this.cards.locator('.wcard__meta');
    this.emptyMessage = main.getByText('Nobody matches that filter right now. Some months the Group has no departures at all.');
    this.header = new Header(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(Routes.wall);
  }

  chip(company: string): Locator {
    return this.companyChips.getByRole('button', { name: company, exact: true });
  }

  card(leaverName: string): WallCard {
    return new WallCard(this.cards.filter({ hasText: leaverName }));
  }

  cardAt(index: number): WallCard {
    return new WallCard(this.cards.nth(index));
  }
}
