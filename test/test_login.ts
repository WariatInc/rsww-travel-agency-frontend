import { Builder, By, Key, until } from 'selenium-webdriver';
import { selenium_run } from './util';
import { strict as assert } from 'assert';

const URL = 'http://localhost:4200/';
const EMAIL = 'jeremias.sofia@gmail.com';

describe('Login page', function () {
  it('Should be possible to go to login page', async function () {
    await selenium_run(async (tb) => {
      await tb.driver.get(URL);
      const current_url = await tb.driver.getCurrentUrl();
      const login_button = await tb.get_login_button();
      assert(login_button);
      await login_button.click();
      await tb.driver.wait(until.urlContains('login'), 500);
      const next_url = await tb.driver.getCurrentUrl();
      assert(current_url != next_url, 'Url should be changed after click');
    });
  });

  it('Should be possible to login', async function () {
    await selenium_run(async (tb) => {
      await tb.driver.get(URL);
      await tb.login_with_email(EMAIL);

      const toolbar = await tb.driver.wait(
        until.elementLocated(By.xpath("//mat-toolbar")),
        500
      );

      const found = await tb.find_recursive(toolbar, async (child) => {
        return (await child.getText()).trim() === EMAIL;
      });
      assert(found, "Email should be visible in the taskbar");
    });
  });
});
