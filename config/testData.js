export const testData = {
    baseURL: 'https://www.saucedemo.com',

    // User credentials
    users: {
        standard: {
            username: 'standard_user',
            password: 'secret_sauce',
            description: 'Standard user with full access'
        },
        locked: {
            username: 'locked_out_user',
            password: 'secret_sauce',
            description: 'User that has been locked out'
        }
    },

    invalidCredentials: {
        username: 'invalid_user',
        password: 'wrong_password'
    },

    sortOptions: {
        nameAZ: 'az',
        nameZA: 'za',
        priceLowHigh: 'lohi',
        priceHighLow: 'hilo'
    },

    products: {
        backpack: 'Sauce Labs Backpack',
        bikeLight: 'Sauce Labs Bike Light',
        boltTShirt: 'Sauce Labs Bolt T-Shirt',
        fleeceJacket: 'Sauce Labs Fleece Jacket',
        onesie: 'Sauce Labs Onesie',
        redTShirt: 'Test.allTheThings() T-Shirt (Red)'
    }
};

