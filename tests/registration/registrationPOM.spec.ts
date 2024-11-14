import { expect, test } from '@playwright/test';
import MainPage from '../../src/pages/MainPage';
import RegistrationForm from '../../src/components/RegistrationForm';

test.describe('Test registration form', () => {

  let registrationForm: RegistrationForm;
  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.open();
    const header = mainPage.getHeader();
    const loginForm = await header.clickSignInButton();
    registrationForm = await loginForm.clickRegistrationButton();
    expect(await registrationForm.isRegistrationFormOpened()).toBeTruthy();
  });

  test('Success registration',
    async () => {
      const garagePage = await registrationForm.createNewUser(
        'name',
        'last',
        'ap+test' + Math.ceil(Math.random() * 1000) + '@test.test',
        '123456Qa',
      );
      await expect(garagePage.getHeader).toHaveText('Garage');
      expect(garagePage.isAlertRegistrationCompleteVisible()).toBeTruthy();
    });

  test('Name field is invalid', async () => {
    await registrationForm.fillAllFormFields('123', 'last', 'ap+test' + Math.ceil(Math.random() * 1000) + '@test.test', '123456Qa', '123456Qa');

    expect(await registrationForm.getErrorText(registrationForm.getNameField)).toEqual('Name is invalid');
    await expect(registrationForm.getRegisterButton).toBeDisabled();

  });

  test('All fields are empty',
    async () => {
      await registrationForm.getNameField.click();
      await registrationForm.getLastNameField.click();
      await registrationForm.getEmailField.click();
      await registrationForm.getPasswordField.click();
      await registrationForm.getRepeatPasswordField.click();
      await registrationForm.getNameField.click();

      expect(await registrationForm.getErrorText(registrationForm.getNameField)).toEqual('Name required');
      expect(await registrationForm.getErrorText(registrationForm.getLastNameField)).toEqual('Last name required');
      expect(await registrationForm.getErrorText(registrationForm.getEmailField)).toEqual('Email required');
      expect(await registrationForm.getErrorText(registrationForm.getPasswordField)).toEqual('Password required');
      expect(await registrationForm.getErrorText(registrationForm.getRepeatPasswordField)).toEqual('Re-enter password required');
      await expect(registrationForm.getRegisterButton).toBeDisabled();
    });

  test('Two errors in Name field', async () => {
    await registrationForm.fillAllFormFields('1', 'last', 'ap+test' + Math.ceil(Math.random() * 1000) + '@test.test', '123456Qa', '123456Qa');

    expect(await registrationForm.getErrorText(registrationForm.getNameField))
      .toEqual('Name is invalidName has to be from 2 to 20 characters long');
    await expect(registrationForm.getRegisterButton).toBeDisabled();
  });

  test('Passwords do not match', async () => {
    await registrationForm.fillAllFormFields('name', 'last', 'ap+test' + Math.ceil(Math.random() * 1000) + '@test.test', '123456Qa', '123456Qb');
    await registrationForm.getNameField.click();

    expect(await registrationForm.getErrorText(registrationForm.getRepeatPasswordField)).toEqual('Passwords do not match');
    await expect(registrationForm.getRegisterButton).toBeDisabled();

  });

  test('Email without at symbol', async () => {
    await registrationForm.fillAllFormFields('name', 'last', 'ap+test' + Math.ceil(Math.random() * 1000) + 'test.test', '123456Qa', '123456Qa');

    expect(await registrationForm.getErrorText(registrationForm.getEmailField)).toEqual('Email is incorrect');
    await expect(registrationForm.getRegisterButton).toBeDisabled();

  });
});