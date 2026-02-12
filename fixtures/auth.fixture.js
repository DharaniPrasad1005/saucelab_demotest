import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { testData } from '../config/testData.js';

export const test = base.extend({
  authenticatedStandardUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(
      testData.users.standard.username, 
      testData.users.standard.password
    );
    await page.waitForURL('**/inventory.html');
    await use(page);
  },
});

export { expect } from '@playwright/test';
