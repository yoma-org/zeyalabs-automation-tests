// src/pages/PeopleConsolePage.ts — the admin "People console" (/people), opened with "Admin".
import { type Locator, type Page } from '@playwright/test';
import { Routes } from '@constants/Routes';

export class PeopleConsolePage {
  readonly heading: Locator;
  readonly departuresTab: Locator;
  readonly employeeListTab: Locator;
  readonly adminsTab: Locator;

  constructor(private readonly page: Page) {
    const main = page.getByRole('main');
    this.heading = main.getByRole('heading', { level: 1 });
    this.departuresTab = main.getByRole('link', { name: 'Departures', exact: true });
    this.employeeListTab = main.getByRole('link', { name: 'Employee List', exact: true });
    this.adminsTab = main.getByRole('link', { name: 'Admins', exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto(Routes.people);
  }
}
