import { Locator, Page } from '@playwright/test';
import GaragePage from '../pages/GaragePage';

class AddCarForm {
  private readonly page: Page;
  private brandField: Locator;
  private modelField: Locator;
  private mileageField: Locator;
  private addButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brandField = page.locator('#addCarBrand');
    this.modelField = page.locator('#addCarModel');
    this.mileageField = page.locator('#addCarMileage');
    this.addButton = page.locator('div[class$=\'justify-content-end\'] button[class*=\'btn-primary\']');
  }

  async addCar(brand: string, model: string, mileage: string): Promise<GaragePage> {
    await this.brandField.selectOption(brand);
    await this.modelField.selectOption(model);
    await this.mileageField.fill(mileage);
    await this.addButton.click();
    return new GaragePage(this.page);
  }
}

export default AddCarForm;