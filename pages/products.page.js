export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = '.title';
        this.productSortDropdown = '[data-test="product-sort-container"]';
        this.inventoryList = '.inventory_list';
        this.inventoryItem = '.inventory_item';
        this.inventoryItemName = '.inventory_item_name';
        this.inventoryItemPrice = '.inventory_item_price';

        this.cartBadgeCount = '.shopping_cart_badge';
        this.addRemoveButtononProductPage = 'button.btn_inventory';
        this.goToCartButton = '.shopping_cart_link';
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

    async getProductCount() {
        return await this.page.locator(this.inventoryItem).count();
    }

    async getRandomProduct() {
        let selectedProduct;
        const count = await this.getProductCount();
        if (count > 0) {
            const randomIndex = Math.floor(Math.random() * count);
            const productNames = await this.getProductNames();
            selectedProduct = productNames[randomIndex];
        } else {
            throw new Error('No products found on the page');
        }
        return selectedProduct;
    }


    async addRandomProductToCart(productName) {
        await this.page.locator(this.inventoryItem).filter({ hasText: productName }).locator(this.addRemoveButtononProductPage).click();
    }

    async removeRandomProductFromCart(productName) {
        await this.page.locator(this.inventoryItem).filter({ hasText: productName }).locator(this.addRemoveButtononProductPage).click();
    }

    async getcartBadgeCount() {
        if (await this.page.locator(this.cartBadgeCount).isVisible()) {
            return await this.page.locator(this.cartBadgeCount).textContent();
        } else {
            return '0';
        }
    }

    async goToCart() {
        await this.page.click(this.goToCartButton);
    }

    async goToProductDetails(productName) {
        await this.page.locator(this.inventoryItem).filter({ hasText: productName }).locator(this.inventoryItemName).click();
    }



}

