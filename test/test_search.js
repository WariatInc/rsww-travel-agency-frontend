const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { describe, it } = require("mocha");

const { selenium_run, get_search_button } = require("./util");

const URL = "http://localhost:4200/";

describe("Search fields", function () {
  // TODO
});

describe("Search button", function () {
  it("Should have proper text inside", async function () {
    await selenium_run(async (driver) => {
      await driver.get(URL);
      const search_button = await get_search_button(driver);
      assert(search_button != null, "No search button was found");
    });
  });

  it("Should redirect to next site", async function () {
    await selenium_run(async (driver) => {
      await driver.get(URL);
      const search_button = await get_search_button(driver);
      const current_url = await driver.getCurrentUrl();
      await search_button.click();
      await driver.wait(until.urlContains("offer-list"), 500);
      const next_url = await driver.getCurrentUrl();
      assert(
        current_url != next_url,
        "URL should have changed after the button was clicked"
      );
    });
  });
});

describe("Search results", async function () {
  let search_result_url = null;
  it("When no fields are set, there should be at least one offer", async function () {
    await selenium_run(async (driver) => {
      await driver.get(URL);
      const search_button = await get_search_button(driver);
      await search_button.click();
      const offers = await driver.wait(
        until.elementsLocated(By.className("offer")),
        500
      );
      assert(offers.length > 0, "There should be > 0 offers");
      search_result_url = await driver.getCurrentUrl();
    });
  });

  it("It should be possible to inspect offer", async function () {
    assert(search_result_url !== null, "There are no offers");
    await selenium_run(async (driver) => {
      await driver.get(search_result_url);
      const offer = await driver.wait(
        until.elementLocated(By.className("offer")),
        500
      );
      const inspect_button = await offer.findElement(By.xpath("button"));
      // TODO: If there will bo more buttons, take that into account
      await inspect_button.click();
      const inspected_offer = await driver.wait(
        until.elementLocated(By.xpath("//app-single-offer")),
        500
      );
      assert(inspected_offer !== null, "Offer inspection doesn't seem to work");
    });
  });
});
