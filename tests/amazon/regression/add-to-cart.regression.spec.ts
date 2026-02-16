import { expect } from '@playwright/test';
import { test, gotoHomeAndAccept } from '../_base';
import { AmazonHomePage } from '../../../pages/AmazonHomePage';
import { AmazonSearchResultsPage } from '../../../pages/AmazonSearchResultsPage';

test.describe('Amazon Product @regression', () => {
  test('user can open product and see price', async ({ page }) => {
    await gotoHomeAndAccept(page);

    const home = new AmazonHomePage(page);
    await home.search('playwright book');

    const results = new AmazonSearchResultsPage(page);
    const productPage = await results.clickFirstProduct();

    const title = productPage.locator('#productTitle');
    await expect(title).toBeVisible({ timeout: 15000 });

    const price = productPage.locator('.a-price').first();
    await expect(price).toBeVisible();
  });
});
