import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('valid login', async ({ page }) => {
    await page.goto("/");

    const login = new LoginPage(page);
    await login.login('standard_user', 'secret_sauce');

    await expect(page.url()).toContain('inventory.html');
});

test('failed login', async ({ page }) => {
    await page.goto("/");

    const login = new LoginPage(page);
    await login.failedLogin('locked_out_user', 'secret_sauce');

    await expect(page.locator('[data-test="error"]')).toBeVisible();

});
