// src/fixtures/base.fixture.ts — page objects (construction only; tests navigate themselves).
import { test as base } from '@playwright/test';
import { Header } from '@components/Header';
import { FarewellPage } from '@pages/FarewellPage';
import { LoginPage } from '@pages/LoginPage';
import { PeopleConsolePage } from '@pages/PeopleConsolePage';
import { WallPage } from '@pages/WallPage';

type PageFixtures = {
  header: Header;
  loginPage: LoginPage;
  wallPage: WallPage;
  farewellPage: FarewellPage;
  peopleConsole: PeopleConsolePage;
};

export const test = base.extend<PageFixtures>({
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  wallPage: async ({ page }, use) => {
    await use(new WallPage(page));
  },
  farewellPage: async ({ page }, use) => {
    await use(new FarewellPage(page));
  },
  peopleConsole: async ({ page }, use) => {
    await use(new PeopleConsolePage(page));
  }
});
