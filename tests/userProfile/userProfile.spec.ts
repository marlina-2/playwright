import { test } from '../garage/userGarageFixture';
import { expect } from '@playwright/test';

test('Changing the response body on the profile page', async ({ page }) => {
  const fakeResponse = {
    status: 'ok',
    data: {
      userId: 155107,
      photoFilename: 'default-user.png',
      name: 'QQQ',
      lastName: 'WWW',
    },
  };

  await page.route('**/api/users/profile', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(fakeResponse),
    });
  });

  await page.goto('/panel/profile');
  const displayedUsername = await page.locator('.panel-page .profile_name').textContent();
  expect(displayedUsername).toBe(`${fakeResponse.data.name} ${fakeResponse.data.lastName}`);

});
