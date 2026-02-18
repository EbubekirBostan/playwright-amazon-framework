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
    const productPage = await results.openFirstProduct();

    await expect(productPage.locator('#productTitle')).toBeVisible({ timeout: 20000 });

    const price = productPage.locator('.a-price').first();
    await expect(price).toBeVisible();
  });
});
