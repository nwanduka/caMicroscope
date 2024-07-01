const { AxeBuilder } = require('@axe-core/webdriverjs');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// URLs to test
const urlsToTest = [
  'http://localhost:4010/apps/landing/landing.html',
  'http://localhost:4010/apps/table.html',
  'http://localhost:4010/apps/Info.html',
  'http://localhost:4010/apps/dev-workbench/workbench.html',
  'http://localhost:4010/apps/signup/signup.html',
  'http://localhost:4010/apps/viewer/viewer.html',
];

(async () => {
  const chromeOptions = new chrome.Options().headless();
  const drivers = [];

  try {
    // Initialize WebDriver instances in parallel
    await Promise.all(urlsToTest.map(async (url) => {
      const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();
      drivers.push(driver);

      // Navigate to the current URL and analyze accessibility
      await driver.get(url);
      const results = await new AxeBuilder(driver).analyze();

      // Output results for the current page
      console.log(`Accessibility results for ${url}:`, results.violations);
    }));
  } catch (e) {
    console.error('Error occurred during accessibility testing:', e);
  } finally {
    // Close all WebDriver sessions
    await Promise.all(drivers.map(driver => driver.quit()));
  }
})();
