import { Locator, Page } from '@playwright/test';
import LoginForm from './LoginForm';

class Header {
  private readonly page: Page;
  private signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator('.header_signin');
  }

  async clickSignInButton(): Promise<LoginForm> {
    await this.signInButton.click();
    return new LoginForm(this.page);
  }
}

export default Header;
