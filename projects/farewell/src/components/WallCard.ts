// src/components/WallCard.ts — one leaver card on the Alumni Wall.
import { type Locator } from '@playwright/test';

export class WallCard {
  readonly band: Locator;
  readonly company: Locator;
  readonly portrait: Locator;
  readonly name: Locator;
  readonly meta: Locator;
  readonly excerpt: Locator;
  readonly openPage: Locator;
  readonly status: Locator;

  constructor(readonly root: Locator) {
    this.band = root.locator('.wcard__band');
    this.company = root.locator('.wcard__entity');
    this.portrait = root.locator('img.avatar'); // alt="" (decorative), so it has no img role
    this.name = root.locator('.wcard__name');
    this.meta = root.locator('.wcard__meta');
    this.excerpt = root.locator('.wcard__excerpt');
    this.openPage = root.getByText('Open page →');
    this.status = root.locator('.wcard__days');
  }
}
