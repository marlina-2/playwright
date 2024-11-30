import { test as baseTest } from '@playwright/test';
import { fakeResponse } from './userProfileFixture';

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    await page.route('**/api/users/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(fakeResponse),
      });
    });

    await use(page);
  },
});
