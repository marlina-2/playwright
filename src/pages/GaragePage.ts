import BasePage from './BasePage';
import { Page } from 'playwright';
import { Locator } from '@playwright/test';

class GaragePage extends BasePage {

  private readonly header: Locator;

  constructor(page: Page, url: string = '/panel/garage') {
    super(page, url);
    this.header = page.locator('h1');
  }

  public get getHeader(): Locator {
    return this.header;
  }

  async isAlertRegistrationCompleteVisible(): Promise<boolean> {
    return await this.page.locator('text=Registration complete').isVisible();
  }
}

export default GaragePage;
