import { By, Builder, until, Key, WebDriver, WebElement } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { strict as assert } from 'assert';

const WEB_DRIVER = 'http://localhost:4444';
const TEST_URL = 'http://localhost:4200/';
const USE_LOCAL = false;

type SearchOptions = {
    where?: string | undefined,
    adults?: number | undefined,
    kids?: number | undefined,
};

export class TestBench {
    driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async goto_homepage() {
        await this.driver.get(TEST_URL);
        await this.driver.sleep(200);
    }

    async find_recursive(root: WebElement, method: (arg0: WebElement) => Promise<boolean>) {
        const children = await root.findElements(By.css("*"));

        for (const promise of children.map(async (child) => {
            if (await method(child)) {
                return true;
            }

            return await this.find_recursive(child, method);
        })) {
            if (await promise) {
                return true;
            }
        }

        return false;
    }

    async find_button_with_text(text: string) {
        const all_buttons = await this.driver.wait(
            until.elementsLocated(By.xpath('//button')),
            1_000
        );
        for (const button of all_buttons) {
            if (await this.find_recursive(button, async (el) => {
                return (await el.getText()).trim().toLowerCase() === text.trim().toLowerCase();
            })) {
                return button;
            }
        }
        return null;
    }

    async find_buttons_with_text(text: string) {
        const all_buttons = await this.driver.wait(
            until.elementsLocated(By.xpath('//button')),
            1_000
        );

        return await Promise.all(all_buttons.map(async (button) => {
            if (await this.find_recursive(button, async (el) => {
                return (await el.getText()).trim().toLowerCase() === text.trim().toLowerCase();
            })) {
                return button;
            }
        }));
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
        const submit_button = (await this.find_buttons_with_text('Zaloguj się'))[1];
        assert(submit_button !== null && submit_button instanceof WebElement);
        await submit_button.click();

        await this.driver.get(initial_url);
        await this.driver.get(initial_url);
    }

    async get_mat_options(): Promise<Map<number, WebElement>> {
        const mat_options = this.driver.findElements(By.xpath('//mat-option'));

        let result: Map<number, WebElement> = new Map();
        await Promise.all((await mat_options).map(async (el) => {
            const val = parseInt(await el.getAttribute("ng-reflect-value"));
            result.set(val, el);
        }));

        return result;
    }

    async find_among_elements(els: WebElement[], pred: (arg0: WebElement) => Promise<boolean>): Promise<WebElement | null> {
        for (const el of els) {
            if (await pred(el)) {
                return el;
            }
        }
        return null;
    }

    async perform_search(args: SearchOptions): Promise<WebElement[]> {
        await this.goto_homepage();
        const all_labels = await this.driver.findElements(By.xpath("//mat-label"));

        if (args.adults !== undefined) {
            const dst_lbl = all_labels[2];
            assert(dst_lbl !== null);
            await dst_lbl.click();

            const options = await this.get_mat_options();
            const selected_option = options.get(args.adults);
            assert(selected_option !== null);
            await selected_option?.click();

            await this.driver.sleep(1_000);
        }

        if (args.kids !== undefined) {
            const dst_lbl = all_labels[3];
            assert(dst_lbl !== null);
            await dst_lbl.click();

            const options = await this.get_mat_options();
            const selected_option = options.get(args.kids);
            assert(selected_option !== null);
            await selected_option?.click();

            await this.driver.sleep(1_000);
        }

        const search_button = await this.get_search_button();
        assert(search_button !== null);
        await search_button.click();
        const offers = await this.driver.wait(
            until.elementsLocated(By.className('offer')),
            50_000
        );
        assert(offers.length > 0, 'There should be > 0 offers');
        return await this.driver.findElements(By.className('offer'));
    }

    async get_reservations(): Promise<WebElement[]> {
        const reservation_button = await this.find_button_with_text(
            'Moje rezerwacje'
        );
        assert(reservation_button !== null);
        await reservation_button.click();

        let reservations: WebElement[] = [];
        try {
            reservations = await this.driver.wait(
                until.elementsLocated(By.className('reservation')),
                500
            );
        }
        catch (err) {
        }

        return reservations;
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
