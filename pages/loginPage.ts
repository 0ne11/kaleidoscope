import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput = this.page.getByRole('textbox', { name: 'Email' });
  readonly passwordInput = this.page.getByRole('textbox', { name: 'Password' });
  readonly submitButton = this.page.getByRole('button', { name: 'Login' });

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('/login'); // Adjust URL if needed
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await expect(this.page.getByText('Welcome')).toBeVisible();
  }

  async emailExists(email: string): Promise<boolean> {
    await this.emailInput.fill(email);
    await this.submitButton.click();
    return this.page.getByText('Email already registered').isVisible();
  }
}