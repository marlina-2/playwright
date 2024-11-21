import { Locator, Page } from '@playwright/test';
import RegistrationForm from './RegistrationForm';
import GaragePage from '../pages/GaragePage';

class LoginForm {
  private readonly page: Page;
  private registrationButton: Locator;
  private emailField: Locator;
  private passwordField: Locator;
  private logInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registrationButton = page.locator('div[class^="modal-footer"] .btn-link');
    this.emailField = page.locator('#signinEmail');
    this.passwordField = page.locator('#signinPassword');
    this.logInButton = page.locator('button[class=\'btn btn-primary\']');
  }

  async clickRegistrationButton(): Promise<RegistrationForm> {
    await this.registrationButton.click();
    return new RegistrationForm(this.page);
  }

  async logIn(email: string, password: string): Promise<GaragePage> {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.logInButton.click();
    return new GaragePage(this.page);
  }
}

export default LoginForm;