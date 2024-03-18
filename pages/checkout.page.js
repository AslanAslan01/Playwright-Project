class Checkout {

    checkoutBtn = '[data-test="checkout"]';
    firstName = '[data-test="firstName"]';
    lastName = '[data-test="lastName"]';
    postalCode = '[data-test="postalCode"]';
    continueBtn = '[data-test="continue"]';
    finishBtn = '[data-test="finish"]';
    confirmMessage = 'h2.complete-header';
    cartItemNameLocator = `.inventory_item_name`
    removeBtn="#remove-sauce-labs-onesie"
    continueShoppingBtn= "#continue-shopping"

    constructor(page) {
        this.page = page;
    }
    async enterCheckoutInfo(firstName, lastName, postalCode) {
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.lastName).fill(lastName);
        await this.page.locator(this.postalCode).fill(postalCode);
    }
    async getConfirmationMessage() {
return await this.page.locator(this.confirmMessage).textContent()
    }
    async clickCheckoutBtn() {
        await this.page.locator(this.checkoutBtn).click()
    }

    async clickFinishBtn() {
        await this.page.locator(this.finishBtn).click()
    }

    async clickContinueBtn() {
        await this.page.locator(this.continueBtn).click();
    }

    async getCartProductName() {
        return await this.page.locator(this.cartItemNameLocator).textContent()
    }

    async checkTheNumberOfItemsInCart(){
       const element = await this.page.$(".shopping_cart_badge")
       const textFromElement = await this.page.evaluate(element =>element.textContent,element)
       return textFromElement;
    }

    async removeItemFromCart(){
        await this.page.locator(this.removeBtn).click()
    }
    async clickOnContinueShoppingBtn(){
        await this.page.locator(this.continueShoppingBtn).click()
    }
}

module.exports = Checkout