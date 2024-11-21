import { chromium, expect, FullConfig } from '@playwright/test';
import MainPage from './src/pages/MainPage';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const mainPage = new MainPage(page);
  await mainPage.open();
  const header = mainPage.getHeader();
  const loginForm = await header.clickSignInButton();
  const garagePage = await loginForm.logIn(process.env.USER_EMAIL, process.env.USER_PASSWORD);
  await page;
  await expect(garagePage.getHeader).toHaveText('Garage');
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;