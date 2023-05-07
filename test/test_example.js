const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { describe, it } = require("mocha");

const { selenium_run } = require("./util");

const URL = "http://localhost:4200/";

describe("Example", function () {
    it("Should be ...", async function () {
        await selenium_run(async (driver) => {
            driver.get(URL);
            assert(true, "Sample test works.")
        });
    })
})