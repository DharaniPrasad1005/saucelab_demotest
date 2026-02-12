export class ProductDetailPage {
    constructor(page) {
        this.page = page;

        // Page elements
        this.backToProductsButton = '[data-test="back-to-products"]';
        this.productName = '.inventory_details_name';
        this.productDescription = '.inventory_details_desc';
        this.productPrice = '.inventory_details_price';
        this.productImage = '.inventory_details_img';
        this.backToProductsButton = '[data-test="back-to-products"]';

    }

    async getProductName() {
        return await this.page.locator(this.productName).textContent();
    }

    async getProductDescription() {
        return await this.page.locator(this.productDescription).textContent();
    }

    async getProductPrice() {
        return await this.page.locator(this.productPrice).textContent();
    }

    async isProductImageVisible() {
        return await this.page.locator(this.productImage).isVisible();
    }

    async backToProducts() {
        await this.page.click(this.backToProductsButton);
    }

}
