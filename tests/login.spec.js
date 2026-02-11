import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { ProductsPage } from '../pages/products.page.js';
import { testData } from '../config/testData.js';

test.describe('Login Functionality Tests', () => {
    let loginPage;
    let productsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        await page.goto('/');
    });

    test('TC_LOGIN_001 - Valid login with standard user', async ({ page }) => {
        await loginPage.login(
            testData.users.standard.username,
            testData.users.standard.password
        );

        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page.locator(productsPage.pageTitle)).toHaveText('Products');
    });

    test('TC_LOGIN_002 - Login with invalid credentials', async ({ page }) => {

        await loginPage.login(
            testData.invalidCredentials.username,
            testData.invalidCredentials.password
        );

        const errorMessage = await loginPage.getErrorMessage();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('do not match');
    });

    test('TC_LOGIN_003 - Login with locked out user', async ({ page }) => {
 
        await loginPage.login(
            testData.users.locked.username,
            testData.users.locked.password
        );

        const errorMessage = await loginPage.getErrorMessage();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('locked out');
    });

    test('TC_LOGIN_004 - Login with empty credentials', async ({ page }) => {

        await loginPage.login('', '');

        const errorMessage = await loginPage.getErrorMessage();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username is required');
    });

});