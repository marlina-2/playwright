import BasePage from './BasePage';
import Header from '../components/Header';
import { Page } from '@playwright/test';


export default class MainPage extends BasePage {
  private readonly header: Header;

  constructor(page: Page, url: string = '/') {
    super(page, url);
    this.header = new Header(page);
  }

  getHeader(): Header {
    return this.header;
  }
}