import { Page, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly emailInput = this.page.getByRole('textbox', { name: 'Email' });
  readonly passwordInput = this.page.getByRole('textbox', { name: 'Password' });
  readonly submitButton = this.page.getByRole('button', { name: 'Register' });

  constructor(page: Page) {
    this.page = page;
  }

  async register(email: string, password: string): Promise<void> {
    await this.page.goto('/register'); // Adjust URL if needed
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await expect(this.page.getByText('Registration successful')).toBeVisible();
  }
}