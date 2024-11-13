import { expect, test } from '@playwright/test';

test.describe('Test registration form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await page.locator('.header_signin').click();
    await page.locator('div[class^="modal-footer"] .btn-link').click();
    await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();
  });


  test('Success registration', async ({ page }) => {
    await page.locator('#signupName').fill('name');
    await page.locator('#signupLastName').fill('last');
    await page.locator('#signupEmail').fill('ap+test' + Math.ceil(Math.random() * 1000) + '@test.test');
    await page.locator('#signupPassword').fill('123456Qa');
    await page.locator('#signupRepeatPassword').fill('123456Qa');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    await expect(page.getByText('Registration complete')).toBeVisible();
  });

  test('Name field is invalid', async ({ page }) => {
    await page.locator('#signupName').fill('123');
    await page.locator('#signupLastName').fill('last');
    await page.locator('#signupEmail').fill('ap+test' + Math.ceil(Math.random() * 1000) + '@test.test');
    await page.locator('#signupPassword').fill('123456Qa');
    await page.locator('#signupRepeatPassword').fill('123456Qa');

    await expect(page.locator('//*[@id="signupName"]/' +
      'ancestor::div[@class="form-group"]/div[@class="invalid-feedback"]'))
      .toHaveText('Name is invalid');
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('All fields are empty', async ({ page }) => {
    await page.locator('#signupName').click();
    await page.locator('#signupLastName').click();
    await page.locator('#signupEmail').click();
    await page.locator('#signupPassword').click();
    await page.locator('#signupRepeatPassword').click();
    await page.locator('#signupName').click();

    await expect(page.locator('//*[@id="signupName"]/' +
      'ancestor::div[@class="form-group"]/div[@class="invalid-feedback"]'))
      .toHaveText('Name required');
    await expect(page.locator('//*[@id="signupLastName"]/' +
      'ancestor::div[@class="form-group"]/div[@class="invalid-feedback"]'))
      .toHaveText('Last name required');
    await expect(page.locator('//*[@id="signupEmail"]/' +
      'ancestor::div[@class="form-group"]/div[@class="invalid-feedback"]'))
      .toHaveText('Email required');
    await expect(page.locator('//*[@id="signupPassword"]/' +
      'ancestor::div[@class="form-group"]/div[@class="invalid-feedback"]'))
      .toHaveText('Password required');
    await expect(page.locator('//*[@id="signupRepeatPassword"]/' +
      'ancestor::div[@class="form-group"]/div[@class="invalid-feedback"]'))
      .toHaveText('Re-enter password required');
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('Two errors in Name field', async ({ page }) => {
    await page.locator('#signupName').fill('1');
    await page.locator('#signupLastName').fill('last');
    await page.locator('#signupEmail').fill('ap+test' + Math.ceil(Math.random() * 1000) + '@test.test');
    await page.locator('#signupPassword').fill('123456Qa');
    await page.locator('#signupRepeatPassword').fill('123456Qa');

    await expect(page.locator('//*[@id="signupName"]/' +
      'ancestor::div[@class="form-group"]/div[@class="invalid-feedback"]'))
      .toHaveText('Name is invalidName has to be from 2 to 20 characters long');
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('Passwords do not match', async ({ page }) => {
    await page.locator('#signupName').fill('name');
    await page.locator('#signupLastName').fill('last');
    await page.locator('#signupEmail').fill('ap+test' + Math.ceil(Math.random() * 1000) + '@test.test');
    await page.locator('#signupPassword').fill('123456Qa');
    await page.locator('#signupRepeatPassword').fill('123456Qb');
    await page.locator('#signupName').click();

    await expect(page.locator('//*[@id="signupRepeatPassword"]/' +
      'ancestor::div[@class="form-group"]/div[@class="invalid-feedback"]'))
      .toHaveText('Passwords do not match');
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();

  });

  test('Email without at symbol', async ({ page }) => {
    await page.locator('#signupName').fill('name');
    await page.locator('#signupLastName').fill('last');
    await page.locator('#signupEmail').fill('ap+test' + Math.ceil(Math.random() * 1000) + 'test.test');
    await page.locator('#signupPassword').fill('123456Qa');
    await page.locator('#signupRepeatPassword').fill('123456Qa');

    await expect(page.locator('//*[@id="signupEmail"]/' +
      'ancestor::div[@class="form-group"]/div[@class="invalid-feedback"]'))
      .toHaveText('Email is incorrect');
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

});