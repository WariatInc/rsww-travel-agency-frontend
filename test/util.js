const { By, Builder, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const WEB_DRIVER = "http://localhost:4444";
const USE_LOCAL = false;

async function selenium_run(testcase) {
  const options = new chrome.Options().addArguments("--disable-web-security");
  let driver_builder = await new Builder().forBrowser("chrome");
  if (!USE_LOCAL) {
    driver_builder = driver_builder.usingServer(WEB_DRIVER);
  }
  const driver = driver_builder.setChromeOptions(options).build();

  try {
    await testcase(driver);
  } finally {
    await driver.quit();
  }
}

async function find_button_with_text(driver, text) {
  const all_buttons = await driver.wait(
    until.elementsLocated(By.xpath("//button")),
    1_000
  );
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

async function login_with_email(driver, email) {
  const initial_url = await driver.getCurrentUrl();
  const login_button = await get_login_button(driver);
  await login_button.click();
  await driver.wait(until.urlContains("login"), 500);
  const email_field = await driver.wait(
    until.elementLocated(By.xpath("//input[@type='search']")),
    500
  );

  await email_field.sendKeys(email, Key.ENTER);
  const submit_button = await find_button_with_text(driver, "Login");
  await submit_button.click();

  await driver.get(initial_url);
}

module.exports = {
  selenium_run,
  find_button_with_text,
  get_search_button,
  get_login_button,
  login_with_email,
};
