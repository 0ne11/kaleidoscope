import { Page } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
//   const applyButton = page.getByRole('button', { name: 'Apply Now' });

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('/program/sdet-test-scholarship');
  }

  async startApplication(): Promise<void> {
    const applyBtn = this.page.locator(``);
    await applyBtn.click();
  }
}