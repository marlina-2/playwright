import { test as base } from '@playwright/test';
import GaragePage from '../../src/pages/GaragePage';

type Fixtures = {
  garagePage: GaragePage;
};

export const test = base.extend<Fixtures>({
  garagePage: async ({ page }, use) => {
    await page.goto('/panel/garage');
    const garagePage = new GaragePage(page);
    await use(garagePage);
  },
});