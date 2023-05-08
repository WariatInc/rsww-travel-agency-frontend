import { Builder, By, Key, until } from 'selenium-webdriver';
import { selenium_run } from './util';
import { strict as assert } from 'assert';

const URL = 'http://localhost:4200/';

describe('Search fields', function () {
  // TODO
});

describe('Search button', function () {
  it('Should have proper text inside', async function () {
    await selenium_run(async (tb) => {
      await tb.driver.get(URL);
      const search_button = await tb.get_search_button();
      assert(search_button != null, 'No search button was found');
    });
  });

  it('Should redirect to next site', async function () {
    await selenium_run(async (tb) => {
      await tb.driver.get(URL);
      const search_button = await tb.get_search_button();
      assert(search_button !== null);
      const current_url = await tb.driver.getCurrentUrl();
      await search_button.click();
      await tb.driver.wait(until.urlContains('offer-list'), 500);
      const next_url = await tb.driver.getCurrentUrl();
      assert(
        current_url != next_url,
        'URL should have changed after the button was clicked'
      );
    });
  });
});

describe('Search results', async function () {
  let search_result_url: null | string = null;
  it('When no fields are set, there should be at least one offer', async function () {
    await selenium_run(async (tb) => {
      await tb.driver.get(URL);
      const search_button = await tb.get_search_button();
      assert(search_button !== null);
      await search_button.click();
      const offers = await tb.driver.wait(
        until.elementsLocated(By.className('offer')),
        500
      );
      assert(offers.length > 0, 'There should be > 0 offers');
      search_result_url = await tb.driver.getCurrentUrl();
    });
  });

  it('It should be possible to inspect offer', async function () {
    await selenium_run(async (tb) => {
      assert(search_result_url !== null, 'There are no offers');
      await tb.driver.get(search_result_url);
      const offer = await tb.driver.wait(
        until.elementLocated(By.className('offer')),
        500
      );
      const inspect_button = await offer.findElement(By.xpath('button'));
      // TODO: If there will bo more buttons, take that into account
      await inspect_button.click();
      const inspected_offer = await tb.driver.wait(
        until.elementLocated(By.xpath('//app-single-offer')),
        500
      );
      assert(inspected_offer !== null, "Offer inspection doesn't seem to work");
    });
  });
});
