class Product {
     addToCart = '[data-test="add-to-cart-sauce-labs-backpack"]'
     cartBtn= '#shopping_cart_container';
     productTitle = `#header_container .header_secondary_container`

    constructor(page) {
        this.page = page;
    }

     async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }
     async clickCart() {
        await this.page.locator(this.cartBtn).click()
    }
    async isProductTitleShowing(){
        return await this.page.locator(this.productTitle).isVisible()
    }
}

module.exports = Product