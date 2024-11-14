import { Locator, Page } from '@playwright/test';
import RegistrationForm from './RegistrationForm';

class LoginForm {
  private readonly page: Page;
  private registrationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registrationButton = page.locator('div[class^="modal-footer"] .btn-link');
  }

  async clickRegistrationButton(): Promise<RegistrationForm> {
    await this.registrationButton.click();
    return new RegistrationForm(this.page);
  }
}

export default LoginForm;