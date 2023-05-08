import { Builder, By, Key, until } from 'selenium-webdriver';
import { selenium_run } from './util';
import { strict as assert } from 'assert';

const URL = 'http://localhost:4200/';
const EMAIL = 'jeremias.sofia@gmail.com';

describe('Reservation', function () {
  let reservation_num: null | number = null;
  let cancelled_num = 0;

  it('User should be able to get reservation list', async function () {
    await selenium_run(async (tb) => {
      await tb.driver.get(URL);
      // Step 1. Login
      await tb.login_with_email(EMAIL);

      // Step 2. Collect initial reservations
      const reservation_button = await tb.find_button_with_text(
        'Moje rezerwacje'
      );
      assert(reservation_button !== null);
      await reservation_button.click();
      await tb.driver.wait(until.urlContains('reservation'), 500);

      // Step 3. Count noncanelled reservations
      reservation_num = 0;
      for (const reservation of await tb.driver.wait(
        until.elementsLocated(By.className('reservation')),
        500
      )) {
        if ((await reservation.getText()).indexOf('cancelled') == -1) {
          reservation_num += 1;
        } else {
          cancelled_num += 1;
        }
      }
      console.log(reservation_num + cancelled_num);
    });
  });

  it('User should be able to make a reservation', async function () {
    await selenium_run(async (tb) => {
      assert(reservation_num !== null, 'Reservation list could not be accesed');
      await tb.driver.get(URL);
      // Step 0. Login
      await tb.login_with_email(EMAIL);

      // Step 1. Run generic search
      const search_button = await tb.get_search_button();
      assert(search_button);
      await search_button.click();

      // Step 2. Select first offer
      const offer = (
        await tb.driver.wait(until.elementsLocated(By.className('offer')), 500)
      )[reservation_num + cancelled_num + 1];
      assert(offer !== null, 'There should be at least one offer');

      // Step 3. Open offer details
      const offer_button = await offer.findElement(By.xpath('button'));
      await offer_button.click();

      // Step 4. Make a reservation
      const inspected_offer = await tb.driver.wait(
        until.elementLocated(By.xpath('//app-single-offer')),
        500
      );
      const show_reservation_button = await tb.find_button_with_text(
        'Rezerwuj'
      );
      assert(
        show_reservation_button !== null,
        'There should be a button for opening reservation dialog'
      );
      await show_reservation_button.click();
      const dialog = await tb.driver.wait(
        until.elementLocated(By.xpath('//mat-dialog-content')),
        500
      );
      const dialog_buttons = await dialog.findElements(By.xpath('button'));
      let make_reservation_button = null;
      for (const button of dialog_buttons) {
        if ((await button.getText()).trim().toLowerCase() == 'rezerwuj') {
          make_reservation_button = button;
          break;
        }
      }
      assert(
        make_reservation_button !== null,
        'There should be a button for reservation'
      );
      await make_reservation_button.click();

      // Step 5. Close reservation window
      const exit_button = await tb.find_button_with_text('Wyjdź');
      assert(exit_button);
      await exit_button.click();

      // Step 6. Get new reservation count
      const reservation_button = await tb.find_button_with_text(
        'Moje rezerwacje'
      );
      assert(reservation_button);
      await reservation_button.click();
      await tb.driver.wait(until.urlContains('reservation'), 500);
      let current_reservation_num = 0;
      for (const reservation of await tb.driver.wait(
        until.elementsLocated(By.className('reservation')),
        500
      )) {
        if ((await reservation.getText()).indexOf('cancelled') == -1) {
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
