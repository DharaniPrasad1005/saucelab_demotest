export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItemLocator = '.cart_item';
        this.cartItemName = '.inventory_item_name';
        this.cartItemPrice = '.inventory_item_price';
        this.removeItemButton = 'button.cart_button';
    }

    async getCartItemCount() {
        return await this.page.locator(this.cartItemName).count();
    }

    async getCartItemNames() {
        return await this.page.locator(this.cartItemName).allTextContents();
    }

    async removeItemByName(productName) {
        const cartItemtoRemoveLocator = await this.page.locator(this.cartItemLocator).filter({ hasText: productName });
        await cartItemtoRemoveLocator.locator('button:has-text("Remove")').click();
    }

    async continueShopping() {
        await this.page.click('[data-test="continue-shopping"]');
    }

}