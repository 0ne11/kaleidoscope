import { Page, expect } from '@playwright/test';

export class ApplicationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Page 1: Fill required fields
  async fillPage1(data: { firstName: string; lastName: string; dob: string }): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(data.firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(data.lastName);
    await this.page.getByRole('textbox', { name: 'Date of Birth' }).fill(data.dob);
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  // Page 2: Extracurriculars
  async fillPage2(activities: string[]): Promise<void> {
    // Validate error for <2 activities
    await this.page.getByRole('button', { name: 'Next' }).click();
    await expect(this.page.getByText('At least 2 activities required')).toBeVisible();

    // Add 4 activities
    for (let i = 0; i < 4; i++) {
      await this.page.getByRole('textbox', { name: `Activity ${i + 1}` }).fill(activities[i]);
    }
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  // Page 3: Form and file upload
  async fillPage3(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'School Name' }).fill('Test School');
    await this.page.getByRole('button', { name: 'Upload Transcript' }).setInputFiles('resources/transcript.pdf');
    await expect(this.page.getByText('File uploaded successfully')).toBeVisible();
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  // Page 4: Essay questions
  async fillPage4(): Promise<void> {
    // Validate essay boxes
    const options = ['Cars', 'Animals', 'School', 'Other'];
    for (const option of options) {
      await this.page.getByRole('checkbox', { name: option }).check();
      await expect(this.page.getByRole('textbox', { name: `Essay about ${option}` })).toBeVisible();
      await this.page.getByRole('checkbox', { name: option }).uncheck();
    }

    // Select Animals and School, fill essays
    await this.page.getByRole('checkbox', { name: 'Animals' }).check();
    await this.page.getByRole('textbox', { name: 'Essay about Animals' }).fill('Animals are fascinating...');
    await this.page.getByRole('checkbox', { name: 'School' }).check();
    await this.page.getByRole('textbox', { name: 'Essay about School' }).fill('School is a place of learning...');
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  // Review page
  async review(): Promise<string> {
    const url = this.page.url();
    await expect(this.page.getByText('Page 1: Completed')).toBeVisible();
    await expect(this.page.getByText('Page 2: Completed')).toBeVisible();
    await expect(this.page.getByText('Page 3: Completed')).toBeVisible();
    await expect(this.page.getByText('Page 4: Completed')).toBeVisible();
    return url;
  }

  // Submit
  async submit(): Promise<void> {
    await this.page.getByRole('button', { name: 'Submit Application' }).click();
    await expect(this.page.getByText('Application submitted')).toBeVisible();
  }

  // Validate no editing
  async validateNoEditing(): Promise<void> {
    await expect(this.page.getByRole('button', { name: 'Edit' })).toBeDisabled();
  }
}