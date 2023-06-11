import { Builder, By, Key, until } from 'selenium-webdriver';
import { selenium_run } from './util';
import { strict as assert } from 'assert';

const URL = 'http://localhost:4200/';

describe('Search fields', function () {
  // TODO
});

describe('Search button', function () {
  it('Should exist', async function () {
    await selenium_run(async (tb) => {
      await tb.goto_homepage();
      const search_button = await tb.get_search_button();
      assert(search_button != null, 'No search button was found');
    });
  });

  it('Should redirect to next site', async function () {
    await selenium_run(async (tb) => {
      await tb.goto_homepage();
      const current_url = await tb.driver.getCurrentUrl();
      await tb.perform_search({})
      const next_url = await tb.driver.getCurrentUrl();
      assert(
        current_url != next_url,
        'URL should have changed after the button was clicked'
      );
    });
  });
});

describe('Tours search results', async function () {
  it('When no fields are set, there should be at least one offer', async function () {
    await selenium_run(async (tb) => {
      await tb.goto_homepage();
      const offers = await tb.perform_search({});
      assert(offers.length > 0, 'There should be > 0 offers');
    });
  });

  it('It should be possible to inspect offer', async function () {
    await selenium_run(async (tb) => {
      await tb.goto_homepage();
      const offers = await tb.perform_search({
        adults: 2,
        kids: 0
      });
      assert(offers.length > 0);
      const first_offer = offers[0];
      await first_offer.click();
      const inspected_offer = await tb.driver.wait(
        until.elementLocated(By.xpath('//app-single-offer')),
        500
      );
      assert(inspected_offer !== null, "Offer inspection doesn't seem to work");
    });
  });
});
