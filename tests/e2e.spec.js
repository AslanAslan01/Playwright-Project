const { test, expect } = require("@playwright/test")
const Login = require("../pages/login.page.js")
const Product = require("../pages/product.page.js")
const Checkout = require("../pages/checkout.page.js")
const data = require("../data/data.json")

test.describe(`E2E Test`, async() => {

  let loginPage, productPage, checkout

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new Login(page)
    productPage = new Product(page)
    checkout = new Checkout(page)

    await page.goto(`${baseURL}`)
    await loginPage.loginUser(data.credentials.user, data.credentials.pass)
  })

  test(`Verify user able make a purchase`, async () => {
    expect(await productPage.isProductTitleShowing()).toBeTruthy()

    await productPage.addBackPackToCart()
    await productPage.clickCart()
    expect(await checkout.getCartProductName()).toBe(data.productName)

    await checkout.clickCheckoutBtn()
    await checkout.enterCheckoutInfo(data.firstName, data.lastName, data.zipcode)
    await checkout.clickContinueBtn()
    await checkout.clickFinishBtn()
    expect(await checkout.getConfirmationMessage()).toBe(data.orderConfirmMessage)
  })

  test('Verify that user able to filtre products from Z to A' , async()=>{
    await productPage.clickOnFilterBtn();
    await productPage.changeFiltre();
    expect(await productPage.getLastProductName()).toBe(data.lastProductName);
  })

  test('Verify that user able to add and delete item from the shopping cart', async()=>{
    await productPage.clickOnOnesieBtn()
    await productPage.clickCart()
    expect(await checkout.checkTheNumberOfItemsInCart()).toBe(data.quantityOfItemsInCartAfterAdd)
    await checkout.removeItemFromCart()
    await checkout.clickOnContinueShoppingBtn()
    expect(await productPage.headerTextCheck(productPage.titleWindow)).toBe(data.titleText)
    
  })

})
