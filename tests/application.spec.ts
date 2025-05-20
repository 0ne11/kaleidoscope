import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { ApplicationPage } from '../pages/ApplicationPage';
import { loginOrRegister } from '../util/loginHelper';
import { generateRandomEmail } from '../util/dataGenerator';

test.describe('Kaleidoscope Application', () => {
  test('should complete application process', async ({ page }) => {
    const user = { email: generateRandomEmail(), password: 'Test@123' };
    const landingPage = new LandingPage(page);
    const applicationPage = new ApplicationPage(page);

    // Register or login
    await loginOrRegister(page, user);
    await expect(page.getByText('Welcome')).toBeVisible();

    // Start application
    await landingPage.navigate();
    await landingPage.startApplication();

    // Page 1: Required fields
    await applicationPage.fillPage1({
      firstName: 'John',
      lastName: 'Doe',
      dob: '01/01/2000',
    });

    // Page 2: Extracurriculars
    await applicationPage.fillPage2([
      'Soccer',
      'Chess Club',
      'Debate Team',
      'Volunteer Work',
    ]);

    // Page 3: Form and upload
    await applicationPage.fillPage3();

    // Page 4: Essays
    await applicationPage.fillPage4();

    // Review and submit
    const reviewUrl = await applicationPage.review();
    await applicationPage.submit();

    // Validate no editing
    await applicationPage.validateNoEditing();

    // Revisit URL
    await page.goto(reviewUrl);
    await expect(page.getByText('Application submitted')).toBeVisible();
  });
});