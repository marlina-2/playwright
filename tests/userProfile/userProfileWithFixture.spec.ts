import { expect } from '@playwright/test';
import { test } from './apiRequestFixture';
import { fakeResponse } from './userProfileFixture';

test('Changing the response body on the profile page via fixture', async ({ page }) => {
  await page.goto('/panel/profile');
  const expectedUsername = `${fakeResponse.data.name} ${fakeResponse.data.lastName}`;
  const displayedUsername = await page.locator('.panel-page .profile_name').textContent();
  expect(displayedUsername).toBe(expectedUsername);
});
