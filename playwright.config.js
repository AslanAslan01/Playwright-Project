// @ts-check
const { defineConfig, devices } = require('@playwright/test');
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
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'], baseURL: "https://www.saucedemo.com/",
    //     headless: !true,
    //     trace: 'retain-on-failure',
    //     screenshot: 'only-on-failure',
    //     video: 'retain-on-failure',
    //     viewport: { width: 1600, height: 850 }
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'], baseURL: "https://www.saucedemo.com/",
    //     headless: !true,
    //     trace: 'retain-on-failure',
    //     screenshot: 'only-on-failure',
    //     video: 'retain-on-failure',
    //     viewport: { width: 1600, height: 850 }
    //   },
    // }
  ]
});

