import { Page } from 'playwright';

class BasePage {
  protected page: Page;
  private readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || '';
  }

  async open(): Promise<void> {
    await this.page.goto(`${this.baseUrl}`);
  }
}

export default BasePage;