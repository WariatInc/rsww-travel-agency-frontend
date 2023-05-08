import { By, Builder, until, Key, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { strict as assert } from 'assert';

const WEB_DRIVER = 'http://localhost:4444';
const USE_LOCAL = false;

export class TestBench {
  driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async find_button_with_text(text: string) {
    const all_buttons = await this.driver.wait(
      until.elementsLocated(By.xpath('//button')),
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

  async get_search_button() {
    return await this.find_button_with_text('Szukaj');
  }

  async get_login_button() {
    return await this.find_button_with_text('Zaloguj się');
  }

  async login_with_email(email: string) {
    const initial_url = await this.driver.getCurrentUrl();
    const login_button = await this.get_login_button();
    assert(login_button !== null);
    await login_button.click();
    await this.driver.wait(until.urlContains('login'), 500);
    const email_field = await this.driver.wait(
      until.elementLocated(By.xpath("//input[@type='search']")),
      500
    );

    await email_field.sendKeys(email, Key.ENTER);
    const submit_button = await this.find_button_with_text('Login');
    assert(submit_button !== null);
    await submit_button.click();

    await this.driver.get(initial_url);
  }
}

export async function selenium_run(
  testcase: (arg1: TestBench) => Promise<void>
) {
  const options = new Options().addArguments('--disable-web-security');
  let driver_builder = await new Builder().forBrowser('chrome');
  if (!USE_LOCAL) {
    driver_builder = driver_builder.usingServer(WEB_DRIVER);
  }
  const driver = driver_builder.setChromeOptions(options).build();
  const tb = new TestBench(driver);

  try {
    await testcase(tb);
  } finally {
    await driver.quit();
  }
}
