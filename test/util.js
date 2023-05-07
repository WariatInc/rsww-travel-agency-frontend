const { By, Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const WEB_DRIVER = "http://localhost:4444";
const USE_LOCAL = false;

async function selenium_run(testcase) {
    const options = new chrome.Options()
        .addArguments("--disable-web-security");
    let driver_builder = await new Builder().forBrowser('chrome');
    if (!USE_LOCAL) {
        driver_builder = driver_builder.usingServer(WEB_DRIVER);
    }
    const driver = driver_builder.setChromeOptions(options).build();

    try {
      await testcase(driver);
    }
    finally {
      await driver.quit();
    }
}

async function find_button_with_text(driver, text) {
  const all_buttons = await driver.findElements(By.xpath("//button"));
  for (const button of all_buttons) {
    const button_text = await button.getText();
    if (button_text.trim().toLowerCase() === text.trim().toLowerCase()) {
      return button;
    }
  }
  return null;
}

async function get_search_button(driver) {
  return await find_button_with_text(driver, "Szukaj");
}

async function get_login_button(driver) {
  return await find_button_with_text(driver, "Zaloguj się");
}

module.exports = {
    selenium_run,
    find_button_with_text,
    get_search_button,
    get_login_button
}