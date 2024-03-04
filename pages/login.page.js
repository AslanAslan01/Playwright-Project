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

module.exports = Login