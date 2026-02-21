import { test, expect } from '../../../fixtures/test';
import { testData } from '../../../fixtures/data';

test.describe('Amazon Search @smoke', () => {
  test('search returns results', async ({ page, home, gotoHome }) => {
    await gotoHome();

    await home.search(testData.searchTerms.smoke);

    await expect(page).toHaveURL(/\/s\?/);
    await expect(page.locator('[data-component-type="s-search-result"]').first())
      .toBeVisible({ timeout: 20000 });
  });
});