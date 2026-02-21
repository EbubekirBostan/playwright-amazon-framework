import { test, expect } from '../../../fixtures/test';
import { handleAmazonConsent } from '../../../utils/consent';
import { testData } from '../../../fixtures/data';

test.describe('Amazon Product @regression', () => {
  test('user can open product and see price', async ({ page, home, results, gotoHome }) => {
    await gotoHome();

    await home.search(testData.searchTerms.regression);
    await handleAmazonConsent(page); // arama sonrası popup tekrar çıkabiliyor

    const productPage = await results.openFirstProduct();

    await expect(productPage.locator('#productTitle')).toBeVisible({ timeout: 20000 });
    await expect(productPage.locator('.a-price').first()).toBeVisible({ timeout: 20000 });
  });
});