const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { describe, it } = require("mocha");

const {
  selenium_run,
  get_login_button,
  find_button_with_text,
} = require("./util");

const URL = "http://localhost:4200/";
const EMAIL = "jeremias.sofia@gmail.com";

describe("Login page", function () {
  let login_page = null;
  it("Should be possible to go to login page", async function () {
    await selenium_run(async (driver) => {
      await driver.get(URL);
      const current_url = await driver.getCurrentUrl();
      const login_button = await get_login_button(driver);
      await login_button.click();
      await driver.wait(until.urlContains("login"), 500);
      const next_url = await driver.getCurrentUrl();
      assert(current_url != next_url, "Url should be changed after click");
      login_page = next_url;
    });
  });

  it("Should be possible to login", async function () {
    await selenium_run(async (driver) => {
      await driver.get(login_page);
      const email_field = await driver.wait(
        until.elementLocated(By.xpath("//input[@type='search']")),
        500
      );

      await email_field.sendKeys(EMAIL, Key.ENTER);
      const submit_button = await find_button_with_text(driver, "Login");
      await submit_button.click();

      const email_div = await driver.wait(
        until.elementLocated(By.xpath(`//mat-toolbar/div[text()='${EMAIL}']`)),
        500
      );
      assert(email_div !== null, "Email should be displayed in the toolbar");
    });
  });
});
