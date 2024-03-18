# E2E Testing

This repository demonstrates end-to-end testing using Playwright using POM.
Web application: https://www.saucedemo.com/

### Technology: <br>
* Automation Framework: Playwright <br>
* Build tool: npm <br>
* Bundled Tools: Mocha, Chai
* Language: Javascript <br>
* Report: html-report <br>
* Dependency/Packages:{
    "@playwright/test": "^1.42.0",
    "@types/node": "^20.11.21"
} <br>
* IDE: Visual Studio Code <br>

### Prerequisite:
The following software are required:

1. nodejs : Download and Install Node JS from<br>
    https://nodejs.org/en/download/<br>

### Installation:
1. Clone the repo using below URL<br>
2. Navigate to folder and install npm packages using:<br>
```typescript
  npm install
npx playwright install
  ```


  ### Usage:
  1. Execute this command to run the automation:<br>
  ```typescript
  npx playwright test
  ```

### Config
Config file is the main and root of this project. All the configuration related information like browser information, Specs file, URL will be written here.

```typescript
// playwright.config.js
module.exports = defineConfig({
  testDir: './tests',
  testMatch:'e2e.spec.js',
  workers: 1,
  reporter: [['html', { open: 'never' }]],
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: "https://www.saucedemo.com/",
        headless: !true,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        viewport: { width: 1600, height: 850 }
      },
    },
    .........

```

### Data
For test purpose we need data they are located in the [data] folder. We are using json data format to manage the test data.
```typescript
//data/data.json
{
    "credantials":{
        "user":"*** ***",
        "pass":"***"
    },
    "productName":"Sauce Labs Backpack",
    "firstName":"Test_first",
    "lastName":"Test_last",
    "zipcode":"1985",
    "orderConfirmMessage":"Thank you for your order!"
}

```

### Page Objects
Page objects are located in the [pages] folder. They are an abstraction of the page we are running the tests on. And they contain the selectors and methods to interact with the page. So instead of having a step with a lot of code, we can call a method from the page object.

```typescript
//pages/login.page.js
class Login {
     passwordField = '[data-test="password"]'
     userNameField = '[data-test="username"]'
     loginBtn = '[data-test="login-button"]'

    constructor(page) {
        this.page = page;
    }

     async loginUser(userName,pass) {
        await this.page.locator(this.userNameField).fill(userName)
        await this.page.locator(this.passwordField).fill(pass)
        await this.page.locator(this.loginBtn).click()
    }
}
```
### Specs
Specs are located in the [tests] folder. They are the main test scenarios. Following POM, the spec file will call the page functions from the pages and execute in this spec file. All the test steps will be found here.


```typescript
//tests/e2e.spec.js
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

###  HTML Report view:
![Screenshot 2024-03-04 at 11 21 29 PM](https://github.com/AslanAslan01/Playwright-Project/assets/128255111/9e5e91f0-8174-4df0-8004-068854f8e0f3)
