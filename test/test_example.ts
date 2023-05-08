import { selenium_run } from './util';
import { strict as assert } from 'assert';

const URL = 'http://localhost:4200/';

describe('Example', function () {
  it('Should be ...', async function () {
    await selenium_run(async (tb) => {
      tb.driver.get(URL);
      assert(true, 'Sample test works.');
    });
  });
});
