import { Page, Locator, expect } from '@playwright/test';
import { handleAmazonConsent } from '../utils/consent';

export class AmazonSearchResultsPage {
  readonly firstProductLink: Locator;

  constructor(private page: Page) {
    // En stabil: ürün linkleri genelde /dp/ içerir
    this.firstProductLink = page
      .locator('[data-component-type="s-search-result"] a[href*="/dp/"]')
      .first();
  }

  async openFirstProduct(): Promise<Page> {
    // sonuçların geldiğini doğrula
    await expect(this.page.locator('[data-component-type="s-search-result"]').first())
      .toBeVisible({ timeout: 20000 });

    // popup her yerde çıkabilir
    await handleAmazonConsent(this.page);

    await expect(this.firstProductLink).toBeVisible({ timeout: 20000 });
    await this.firstProductLink.click();

    await this.page.waitForLoadState('domcontentloaded');
    await handleAmazonConsent(this.page);

    return this.page;
  }
}