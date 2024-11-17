import { Locator, Page } from '@playwright/test';
import GaragePage from '../pages/GaragePage';

class RegistrationForm {
  private readonly page: Page;
  private readonly nameField: Locator;
  private title: Locator;
  private readonly lastNameField: Locator;
  private readonly emailField: Locator;
  private readonly passwordField: Locator;
  private readonly repeatPasswordField: Locator;
  private readonly registerButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { name: 'Registration' });
    this.nameField = page.locator('#signupName');
    this.lastNameField = page.locator('#signupLastName');
    this.emailField = page.locator('#signupEmail');
    this.passwordField = page.locator('#signupPassword');
    this.repeatPasswordField = page.locator('#signupRepeatPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async isRegistrationFormOpened(): Promise<boolean> {
    return await this.title.isVisible();
  }

  public get getNameField(): Locator {
    return this.nameField;
  }

  public get getLastNameField(): Locator {
    return this.lastNameField;
  }

  public get getEmailField(): Locator {
    return this.emailField;
  }

  public get getPasswordField(): Locator {
    return this.passwordField;
  }

  public get getRepeatPasswordField(): Locator {
    return this.repeatPasswordField;
  }

  public get getRegisterButton(): Locator {
    return this.registerButton;
  }

  async getErrorText(field: Locator): Promise<string> {
    const errorLocator = field.locator('xpath=ancestor::div[@class="form-group"]/div[@class="invalid-feedback"]');
    return await errorLocator.textContent() ?? '';
  }

  async createNewUser(name: string, lastName: string, email: string, password: string) {
    await this.nameField.fill(name);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.repeatPasswordField.fill(password);
    await this.registerButton.click();
    return new GaragePage(this.page);
  }

  async fillAllFormFields(name: string, lastName: string, email: string, password: string, repeatPassword: string): Promise<this> {
    await this.nameField.fill(name);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.repeatPasswordField.fill(repeatPassword);
    return this;
  }
}

export default RegistrationForm;

