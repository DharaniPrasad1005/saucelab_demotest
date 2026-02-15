import { test, expect } from '../fixtures/auth.fixture.js';
import { ProductsPage } from '../pages/products.page.js';
import { CartPage } from '../pages/cart.page.js';

test.describe('Shopping Cart Tests', () => {
    let productsPage;
    let cartPage;

    test('TC_CART_001 - Add product to cart', async ({ authenticatedStandardUser: page }) => {
        productsPage = new ProductsPage(page);

        const selectedProduct = await productsPage.getRandomProduct();

        await productsPage.addRandomProductToCart(selectedProduct);

        expect(await productsPage.getcartBadgeCount()).toBe('1');
    });

    test('TC_CART_002 - Remove product from cart', async ({ authenticatedStandardUser: page }) => {
        productsPage = new ProductsPage(page);

        const selectedProduct = await productsPage.getRandomProduct();
        await productsPage.addRandomProductToCart(selectedProduct);
        expect(await productsPage.getcartBadgeCount()).toBe('1');

        await productsPage.removeRandomProductFromCart(selectedProduct);

        expect(await productsPage.getcartBadgeCount()).toBe('0');
    })

    test('TC_CART_003 - View shopping cart with multiple items', async ({ authenticatedStandardUser: page }) => {
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);

        const selectedProducts = await productsPage.getUniqueRandomProducts(3);

        const selectedProduct1 = selectedProducts[0];
        await productsPage.addRandomProductToCart(selectedProduct1);

        const selectedProduct2 = selectedProducts[1];
        await productsPage.addRandomProductToCart(selectedProduct2);

        const selectedProduct3 = selectedProducts[2];
        await productsPage.addRandomProductToCart(selectedProduct3);

        expect(await productsPage.getcartBadgeCount()).toBe('3');

        await productsPage.goToCart();

        await expect(page).toHaveURL(/.*cart.html/);

        const cartItemCount = await cartPage.getCartItemCount();
        expect(cartItemCount).toBe(3);

        const cartItemNames = await cartPage.getCartItemNames();
        expect(cartItemNames).toContain(selectedProduct1);
        expect(cartItemNames).toContain(selectedProduct2);
        expect(cartItemNames).toContain(selectedProduct3);


    });


    test('TC_CART_004 - Remove item from cart page', async ({ authenticatedStandardUser: page }) => {
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);

        const selectedProducts = await productsPage.getUniqueRandomProducts(2);

        const selectedProduct1 = selectedProducts[0];
        await productsPage.addRandomProductToCart(selectedProduct1);

        const selectedProduct2 = selectedProducts[1];
        await productsPage.addRandomProductToCart(selectedProduct2);

        await productsPage.goToCart();

        await cartPage.removeItemByName(selectedProduct1);

        expect(await cartPage.getCartItemCount()).toBe(1);

        const updatedItemNames = await cartPage.getCartItemNames();
        expect(updatedItemNames).toContain(selectedProduct2);
        expect(updatedItemNames).not.toContain(selectedProduct1);

    });

    test('TC_CART_005 - Continue shopping from cart', async ({ authenticatedStandardUser: page }) => {
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);

        const selectedProduct = await productsPage.getRandomProduct();
        await productsPage.addRandomProductToCart(selectedProduct);
        await productsPage.goToCart();

        expect(await cartPage.getCartItemCount()).toBe(1);
        expect(await cartPage.getCartItemNames()).toContain(selectedProduct);

        await cartPage.continueShopping();
        await expect(page).toHaveURL(/.*inventory.html/);

        expect(await productsPage.getcartBadgeCount()).toBe('1');

    });

    test('TC_CART_006 - Empty cart by removing all items', async ({ authenticatedStandardUser: page }) => {
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);

        const selectedProducts = await productsPage.getUniqueRandomProducts(2);
        const selectedProduct1 = selectedProducts[0];
        await productsPage.addRandomProductToCart(selectedProduct1);

        const selectedProduct2 = selectedProducts[1];
        await productsPage.addRandomProductToCart(selectedProduct2);

        await productsPage.goToCart();

        await cartPage.removeItemByName(selectedProduct1);
        await cartPage.removeItemByName(selectedProduct2);

        expect(await cartPage.getCartItemCount()).toBe(0);


    });

    test('TC_CART_007 - Cart persists across page navigation', async ({ authenticatedStandardUser: page }) => {
        productsPage = new ProductsPage(page);

        const selectedProducts = await productsPage.getUniqueRandomProducts(3);

        const selectedProduct1 = selectedProducts[0];
        await productsPage.addRandomProductToCart(selectedProduct1);

        const selectedProduct2 = selectedProducts[1];
        await productsPage.addRandomProductToCart(selectedProduct2);

        const selectedProduct3 = selectedProducts[2];

        await productsPage.goToProductDetails(selectedProduct3);

        expect(await productsPage.getcartBadgeCount()).toBe('2');

    });
});
