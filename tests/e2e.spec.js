const { test, expect } = require("@playwright/test")
const Login = require("../pages/login.page.js")
const Product = require("../pages/product.page.js")
const Checkout = require("../pages/checkout.page.js")
const data = require("../data/data.json")

test.describe(`E2E Test`, async () => {

  var loginPage, productPage, checkout
  test(`Verify user can order a product after login`, async ({ page, baseURL }) => {
    loginPage = new Login(page)
    productPage = new Product(page)
    checkout = new Checkout(page)

    await page.goto(`${baseURL}`)
    await loginPage.loginUser(data.credantials.user, data.credantials.pass)
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

})