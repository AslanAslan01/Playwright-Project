class Product {
    addToCart = '[data-test="add-to-cart-sauce-labs-backpack"]'
    cartBtn= '#shopping_cart_container';
    productTitle = `.header_secondary_container` 
    filtersBtn = '.product_sort_container'
    changeFiltreClick= ".product_sort_container"
    lastItemLacator="#item_3_title_link"
    sauseLabsOnesieLocator="#add-to-cart-sauce-labs-onesie"
    titleWindow=".title"

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
   

   async clickOnFilterBtn(){
       await this.page.locator(this.filtersBtn).click()
   }
   async changeFiltre(){
       await this.page.locator(this.changeFiltreClick).click()
   }
   async getLastProductName() {
       return await this.page.locator(this.lastItemLacator).textContent()
   }
   async clickOnOnesieBtn(){
       await this.page.locator(this.sauseLabsOnesieLocator).click()
   }

   async headerTextCheck(titleWindow){
       const element = await this.page.$(titleWindow);
       const textFromElement = await this.page.evaluate(element => element.textContent, element);
       return textFromElement;
   }
}

module.exports = Product