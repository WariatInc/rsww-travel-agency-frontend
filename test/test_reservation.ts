import { selenium_run } from './util';
import { strict as assert } from 'assert';

const URL = 'http://localhost:4200/';
const EMAIL = 'jeremias.sofia@gmail.com';

describe('Reservation', function () {
  let reservation_num: null | number = null;

  it('User should be able to get reservation list', async function () {
    await selenium_run(async (tb) => {
      await tb.driver.get(URL);
      await tb.login_with_email(EMAIL);
      let reservations = await tb.get_reservations();
      reservation_num = reservations.length;
    });
  });

  it('User should be able to make a reservation', async function () {
    await selenium_run(async (tb) => {
      assert(reservation_num !== null, 'Reservation list could not be accesed');
      await tb.driver.get(URL);
      // Step 0. Login
      await tb.login_with_email(EMAIL);

      // Step 1. Run generic search
      const offer = (
        await tb.perform_search({
          adults: 2,
          kids: 1,
        })
      )[reservation_num + 1];
      assert(offer !== null, 'There should be at least one offer');

      // Step 2. Open trip details
      await offer.click();
      await tb.driver.sleep(500);

      // Step 3. Make a reservation
      tb.driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
      await tb.driver.sleep(500);
      const reserve_button = await tb.find_button_with_text('event_available');
      assert(reserve_button !== null);
      await reserve_button?.click();
      await tb.driver.sleep(100);
      const accept_button = await tb.find_button_with_text('Tak');
      assert(accept_button !== null);
      await accept_button?.click();
      await tb.driver.sleep(100);

      // Step 6. Get new reservation count
      const reservations = await tb.get_reservations();
      const current_reservation_num = reservations.length;

      assert(
        current_reservation_num == reservation_num + 1,
        `There should be ${
          reservation_num + 1
        } reservations, but are ${current_reservation_num}`
      );
    });
  });
});
