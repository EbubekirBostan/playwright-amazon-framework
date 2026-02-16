import { expect } from '@playwright/test';
import { test, gotoHomeAndAccept } from '../_base';
import { AmazonHomePage } from '../../../pages/AmazonHomePage';

test.describe('Amazon Search @smoke', () => {
  test('search returns results', async ({ page }) => {
    await gotoHomeAndAccept(page);

    const home = new AmazonHomePage(page);
    await home.search('playwright');

    await expect(page).toHaveURL(/\/s\?/);

    // ✅ Stabil sonuç sinyali (Amazon’da genelde var)
    await expect(page.locator('[data-component-type="s-search-result"]').first())
      .toBeVisible({ timeout: 15000 });
  });
});
