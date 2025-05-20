import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';

interface User {
  email: string;
  password: string;
}

export async function loginOrRegister(page: Page, user: User): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  const emailExists = await loginPage.emailExists(user.email);
  if (emailExists) {
    await loginPage.login(user.email, user.password);
  } else {
    await new RegistrationPage(page).register(user.email, user.password);
  }
}