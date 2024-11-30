import { test } from './userGarageFixture';
import { expect } from '@playwright/test';

test.describe('Garage Page Tests', () => {
  test('Add new car', async ({ garagePage }) => {
    await expect(garagePage.getHeader).toHaveText('Garage');
    await (await garagePage.clickAddCarButton()).addCar('Audi', 'TT', '123');
    expect(garagePage.isAlertCarAddedVisible()).toBeTruthy();
  });
});