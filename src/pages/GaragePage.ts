import BasePage from './BasePage';
import { Page } from 'playwright';
import { Locator } from '@playwright/test';
import AddCarForm from '../components/AddCarForm';

class GaragePage extends BasePage {

  private readonly header: Locator;
  private addCarButton: Locator;

  constructor(page: Page, url: string = '/panel/garage') {
    super(page, url);
    this.header = page.locator('h1');
    this.addCarButton = page.locator('button[class$=\'btn-primary\']');
  }

  async isGaragePageOpened(): Promise<boolean> {
    return this.page.url().includes('/panel/garage');
  }

  public get getHeader(): Locator {
    return this.header;
  }

  async isAlertRegistrationCompleteVisible(): Promise<boolean> {
    return await this.page.locator('text=Registration complete').isVisible();
  }

  async isAlertCarAddedVisible(): Promise<boolean> {
    return await this.page.locator('text=Car Added').isVisible();
  }

  async clickAddCarButton(): Promise<AddCarForm> {
    await this.addCarButton.click();
    return new AddCarForm(this.page);
  }
}

export default GaragePage;
