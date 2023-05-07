const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { describe, it } = require("mocha");

const {
  selenium_run,
  login_with_email,
  find_button_with_text,
  get_search_button,
} = require("./util");

const URL = "http://localhost:4200/";
const EMAIL = "jeremias.sofia@gmail.com";

describe("Reservation", function () {
  let reservation_num = null;
  let cancelled_num = 0;

  it("User should be able to get reservation list", async function () {
    await selenium_run(async (driver) => {
      await driver.get(URL);
      // Step 1. Login
      await login_with_email(driver, EMAIL);

      // Step 2. Collect initial reservations
      const reservation_button = await find_button_with_text(
        driver,
        "Moje rezerwacje"
      );
      await reservation_button.click();
      await driver.wait(until.urlContains("reservation"), 500);

      // Step 3. Count noncanelled reservations
      reservation_num = 0;
      for (const reservation of await driver.wait(
        until.elementsLocated(By.className("reservation")),
        500
      )) {
        if ((await reservation.getText()).indexOf("cancelled") == -1) {
          reservation_num += 1;
        } else {
          cancelled_num += 1;
        }
      }
      console.log(reservation_num + cancelled_num);
    });
  });

  it("User should be able to make a reservation", async function () {
    assert(reservation_num !== null, "Reservation list could not be accesed");
    await selenium_run(async (driver) => {
      await driver.get(URL);
      // Step 0. Login
      await login_with_email(driver, EMAIL);

      // Step 1. Run generic search
      const search_button = await get_search_button(driver);
      await search_button.click();

      // Step 2. Select first offer
      const offer = (
        await driver.wait(until.elementsLocated(By.className("offer")), 500)
      )[reservation_num + cancelled_num + 1];
      assert(offer !== null, "There should be at least one offer");

      // Step 3. Open offer details
      const offer_button = await offer.findElement(By.xpath("button"));
      await offer_button.click();

      // Step 4. Make a reservation
      const inspected_offer = await driver.wait(
        until.elementLocated(By.xpath("//app-single-offer")),
        500
      );
      const show_reservation_button = await find_button_with_text(
        driver,
        "Rezerwuj"
      );
      assert(
        show_reservation_button !== null,
        "There should be a button for opening reservation dialog"
      );
      await show_reservation_button.click();
      const dialog = await driver.wait(
        until.elementLocated(By.xpath("//mat-dialog-content")),
        500
      );
      const dialog_buttons = await dialog.findElements(By.xpath("button"));
      let make_reservation_button = null;
      for (const button of dialog_buttons) {
        if ((await button.getText()).trim().toLowerCase() == "rezerwuj") {
          make_reservation_button = button;
          break;
        }
      }
      assert(
        make_reservation_button !== null,
        "There should be a button for reservation"
      );
      await make_reservation_button.click();

      // Step 5. Close reservation window
      const exit_button = await find_button_with_text(driver, "Wyjdź");
      await exit_button.click();

      // Step 6. Get new reservation count
      const reservation_button = await find_button_with_text(
        driver,
        "Moje rezerwacje"
      );
      await reservation_button.click();
      await driver.wait(until.urlContains("reservation"), 500);
      let current_reservation_num = 0;
      for (const reservation of await driver.wait(
        until.elementsLocated(By.className("reservation")),
        500
      )) {
        if ((await reservation.getText()).indexOf("cancelled") == -1) {
          current_reservation_num += 1;
        }
      }

      assert(
        current_reservation_num == reservation_num + 1,
        `There should be ${
          reservation_num + 1
        } reservations, but are ${current_reservation_num}`
      );
    });
  });
});
