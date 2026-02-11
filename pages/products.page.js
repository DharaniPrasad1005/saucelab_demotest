export class ProductsPage {
    constructor(page) {
        this.page = page;
        
        // Page elements
        this.pageTitle = '.title';
        this.productSortDropdown = '[data-test="product_sort_container"]';
        this.inventoryList = '.inventory_list';
        this.inventoryItem = '.inventory_item';
        this.inventoryItemName = '.inventory_item_name';
        this.inventoryItemPrice = '.inventory_item_price';
        this.inventoryItemImage = '.inventory_item_img';
        this.shoppingCartLink = '.shopping_cart_link';
        this.shoppingCartBadge = '.shopping_cart_badge';
        this.menuButton = '#react-burger-menu-btn';
        this.logoutLink = '#logout_sidebar_link';
        
        // Product-specific add to cart buttons
        this.addToCartBackpack = '[data-test="add-to-cart-sauce-labs-backpack"]';
        this.addToCartBikeLight = '[data-test="add-to-cart-sauce-labs-bike-light"]';
        this.addToCartBoltTShirt = '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]';
        this.addToCartFleeceJacket = '[data-test="add-to-cart-sauce-labs-fleece-jacket"]';
        this.addToCartOnesie = '[data-test="add-to-cart-sauce-labs-onesie"]';
        this.addToCartTShirtRed = '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]';
        
        // Remove buttons
        this.removeBackpack = '[data-test="remove-sauce-labs-backpack"]';
        this.removeBikeLight = '[data-test="remove-sauce-labs-bike-light"]';
        this.removeBoltTShirt = '[data-test="remove-sauce-labs-bolt-t-shirt"]';
        this.removeFleeceJacket = '[data-test="remove-sauce-labs-fleece-jacket"]';
        this.removeOnesie = '[data-test="remove-sauce-labs-onesie"]';
        this.removeTShirtRed = '[data-test="remove-test.allthethings()-t-shirt-(red)"]';
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

    async getProductPrices() {
        const prices = await this.page.locator(this.inventoryItemPrice).allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }

    async addProductToCart(productButton) {
        await this.page.click(productButton);
    }

    async removeProductFromCart(productButton) {
        await this.page.click(productButton);
    }

    async getCartBadgeCount() {
        const badge = this.page.locator(this.shoppingCartBadge);
        if (await badge.isVisible()) {
            return await badge.textContent();
        }
        return '0';
    }

    async clickProductName(productName) {
        await this.page.locator(this.inventoryItemName).filter({ hasText: productName }).click();
    }

    async goToCart() {
        await this.page.click(this.shoppingCartLink);
    }

    async logout() {
        await this.page.click(this.menuButton);
        await this.page.click(this.logoutLink);
    }

    async isCartBadgeVisible() {
        return await this.page.locator(this.shoppingCartBadge).isVisible();
    }

    async getFirstProductName() {
        return await this.page.locator(this.inventoryItemName).first().textContent();
    }

    async getProductCount() {
        return await this.page.locator(this.inventoryItem).count();
    }
}
