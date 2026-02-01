import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

test('Inventory page loads correctly', async ({ page }) => {
    await page.goto("/");

    const login = new LoginPage(page);
    await login.login('standard_user', 'secret_sauce');

    await expect(page.url()).toContain('inventory.html');

    const inventory = new InventoryPage(page);

    const inventoryIndex = await inventory.getInventoryIndex();
    console.log(inventoryIndex);
    const itemNameOnInventoryPage = await inventory.getInventoryItemName(inventoryIndex);
    await inventory.goToInventoryItem(inventoryIndex);
    console.log(itemNameOnInventoryPage);

    await inventory.assertInventoryItemDetailsVisible();
    await inventory.assertInventoryItemName(itemNameOnInventoryPage);

});