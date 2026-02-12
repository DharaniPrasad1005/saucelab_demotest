import { test, expect } from '../fixtures/auth.fixture.js';
import { ProductsPage } from '../pages/products.page.js';
import { testData } from '../config/testData.js';
import { ProductDetailPage } from '../pages/productDetail.page.js';

test.describe('Product Catalog Tests', () => {
    let productsPage;
    let productDetailPage;

    test('TC_PROD_001 - Sort products by Name (A-Z)', async ({ authenticatedStandardUser: page }) => {
        productsPage = new ProductsPage(page);
        await productsPage.sortProducts(testData.sortOptions.nameAZ);

        const productNames = await productsPage.getProductNames();
        const sortedNames = [...productNames].sort();
        expect(productNames).toEqual(sortedNames);

        const firstName = await productsPage.getFirstProductName();
        expect(firstName).toBe('Sauce Labs Backpack');
    });

    test('TC_PROD_002 - Sort products by Name (Z-A)', async ({ authenticatedStandardUser: page }) => {
        productsPage = new ProductsPage(page);

        await productsPage.sortProducts(testData.sortOptions.nameZA);

        const productNames = await productsPage.getProductNames();
        const sortedNames = [...productNames].sort().reverse();
        expect(productNames).toEqual(sortedNames);

        const firstName = await productsPage.getFirstProductName();
        expect(firstName).toBe('Test.allTheThings() T-Shirt (Red)');
    });

    test('TC_PROD_003 - Sort products by Price (Low to High)', async ({ authenticatedStandardUser: page }) => {
        productsPage = new ProductsPage(page);

        await productsPage.sortProducts(testData.sortOptions.priceLowHigh);

        const productPrices = await productsPage.getProductPrices();
        const sortedPrices = [...productPrices].sort((a, b) => a - b);
        expect(productPrices).toEqual(sortedPrices);

        const firstName = await productsPage.getFirstProductName();
        expect(firstName).toBe('Sauce Labs Onesie'); // $7.99
    });

    test('TC_PROD_004 - Sort products by Price (High to Low)', async ({ authenticatedStandardUser: page }) => {
        productsPage = new ProductsPage(page);

        await productsPage.sortProducts(testData.sortOptions.priceHighLow);

        const productPrices = await productsPage.getProductPrices();
        const sortedPrices = [...productPrices].sort((a, b) => b - a);
        expect(productPrices).toEqual(sortedPrices);

        const firstName = await productsPage.getFirstProductName();
        expect(firstName).toBe('Sauce Labs Fleece Jacket');
    });

    test('TC_PROD_005 - View product details', async ({ authenticatedStandardUser: page }) => {
        productsPage = new ProductsPage(page);
        productDetailPage = new ProductDetailPage(page);

        console.log(testData.products.backpack);
        await productsPage.clickProductName(testData.products.backpack);

        await expect(page).toHaveURL(/.*inventory-item.html/);

        const productName = await productDetailPage.getProductName();
        expect(productName).toBe(testData.products.backpack);

        const productDescription = await productDetailPage.getProductDescription();
        expect(productDescription.length).toBeGreaterThan(0);

        const productPrice = await productDetailPage.getProductPrice();
        expect(productPrice).toContain('$');

        const isImageVisible = await productDetailPage.isProductImageVisible();
        expect(isImageVisible).toBeTruthy();
    });

    test('TC_PROD_006 - Navigate back from product detail', async ({ authenticatedStandardUser: page }) => {
        productsPage = new ProductsPage(page);
        productDetailPage = new ProductDetailPage(page);

        await productsPage.clickProductName(testData.products.bikeLight);
        await expect(page).toHaveURL(/.*inventory-item.html/);

        await productDetailPage.backToProducts();

        await expect(page).toHaveURL(/.*inventory.html/);
    });
});