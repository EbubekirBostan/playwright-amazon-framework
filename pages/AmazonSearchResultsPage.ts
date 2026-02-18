import { Page, Locator, expect } from '@playwright/test';
import { handleAmazonConsent } from '../utils/consent';

export class AmazonSearchResultsPage {
  readonly firstProductLink: Locator;

  constructor(private page: Page) {
    // Gerçek ürün başlığı linki (h2 içindeki a)
    this.firstProductLink = page
      .locator('[data-component-type="s-search-result"] h2 a')
      .first();
  }

  async openFirstProduct(): Promise<Page> {
    await expect(this.firstProductLink).toBeVisible({ timeout: 15000 });

    await this.firstProductLink.click();

    await this.page.waitForLoadState('domcontentloaded');
    await handleAmazonConsent(this.page);

    return this.page;
  }
}
