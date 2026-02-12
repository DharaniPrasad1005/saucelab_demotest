export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = '.title';
        this.productSortDropdown = '[data-test="product-sort-container"]';
        this.inventoryList = '.inventory_list';
        this.inventoryItem = '.inventory_item';
        this.inventoryItemName = '.inventory_item_name';
        this.inventoryItemPrice = '.inventory_item_price';
    }

    async getPageTitle() {
        return await this.page.locator(this.pageTitle).textContent();
    }

    async sortProducts(sortOption) {
        await this.page.selectOption(this.productSortDropdown, sortOption);
    }

    async getProductNames() {
        const names = await this.page.locator(this.inventoryItemName).allTextContents();
        return names;
    }

    async getFirstProductName() {
        return await this.page.locator(this.inventoryItemName).first().textContent();
    }

    async getProductPrices() {
        const prices = await this.page.locator(this.inventoryItemPrice).allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }

    async clickProductName(productName) {
        await this.page.locator(this.inventoryItemName).filter({ hasText: productName }).click();
    }

}
