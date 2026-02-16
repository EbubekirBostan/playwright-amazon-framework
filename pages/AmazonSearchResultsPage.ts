import { Page, Locator, expect } from '@playwright/test';
import { handleAmazonConsent } from '../utils/consent';

export class AmazonSearchResultsPage {
  readonly firstResult: Locator;

  constructor(private page: Page) {
    this.firstResult = page.locator('[data-component-type="s-search-result"]').first();
  }

  async clickFirstProduct(): Promise<Page> {
    await expect(this.firstResult).toBeVisible({ timeout: 15000 });

    const context = this.page.context();

    const [maybeNewPage] = await Promise.all([
      context.waitForEvent('page').catch(() => null),
      this.firstResult.click(),
    ]);

    const productPage = maybeNewPage ?? this.page;

    await productPage.waitForLoadState();

    // ✅ kritik: product page'te consent tekrar handle
    await handleAmazonConsent(productPage);

    return productPage;
  }
}
