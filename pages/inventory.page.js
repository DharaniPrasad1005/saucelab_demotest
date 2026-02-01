const { expect } = require('@playwright/test');

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryItemName = '.inventory_item_name ';
    }

    async getInventoryIndex() {
        const count = await this.page.locator(this.inventoryItemName).count();
        console.log(count);
        const randomIndex = Math.floor(Math.random() * count);
        return randomIndex;
    }
    async goToInventoryItem(inventoryIndex) {
        await this.page.locator(this.inventoryItemName).nth(inventoryIndex).click();
    }

    async getInventoryItemName(inventoryIndex) {
        return await this.page.locator(this.inventoryItemName).nth(inventoryIndex).innerText();
    }

    async assertInventoryItemDetailsVisible() {
        await this.page.locator('.inventory_details_name').isVisible();
        await this.page.locator('.inventory_details_desc').isVisible();
        await this.page.locator('.inventory_details_price').isVisible();
        await this.page.locator('button[id^="add-to-cart"]').isVisible();
    }

    async assertInventoryItemName(itemNameOnInventoryPage) {
        const actualName = await this.page.locator('.inventory_details_name').innerText();
        expect(actualName).toBe(itemNameOnInventoryPage);
    }


}