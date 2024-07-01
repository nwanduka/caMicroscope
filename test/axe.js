const { AxeBuilder } = require('@axe-core/webdriverjs');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async () => {
  // Define chrome options
  const options = new chrome.Options();
  options.addArguments('headless'); // Add headless argument directly
  options.addArguments('disable-gpu'); // Disable GPU rendering

  // Build the driver
  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  // List of URLs to test
  const urls = [
    'http://localhost:4010/apps/landing/landing.html',
  'http://localhost:4010/apps/table.html',
  'http://localhost:4010/apps/Info.html',
  'http://localhost:4010/apps/dev-workbench/workbench.html',
  'http://localhost:4010/apps/signup/signup.html',
  'http://localhost:4010/apps/viewer/viewer.html',
];

  // Loop through each URL and perform accessibility test
  for (const url of urls) {
    await driver.get(url);
    try {
      const results = await new AxeBuilder(driver).analyze();
      console.log(`Results for ${url}:`, results);
    } catch (e) {
      console.error(`Error testing ${url}:`, e);
    }
  }

  // Quit the driver
  await driver.quit();
})();
