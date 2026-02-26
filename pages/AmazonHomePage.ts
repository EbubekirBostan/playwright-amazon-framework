import { Page, Locator, expect } from '@playwright/test';

export class AmazonHomePage {
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly loginLink: Locator;
  readonly anmeldenLink: Locator;

  constructor(private page: Page) {
    this.searchBox = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
    this.loginLink = page.locator('#nav-link-accountList');
    this.anmeldenLink = page.locator('.nav-action-signin-button')
  }

  async search(term: string) {
    await expect(this.searchBox).toBeVisible({ timeout: 15000 });
    await this.searchBox.fill(term);

    // ✅ Kurumsal: önce butonun gerçekten tıklanabilir olmasını bekle
    await expect(this.searchButton).toBeVisible({ timeout: 15000 });

    // 1) normal click dene
    try {
      await this.searchButton.click({ timeout: 5000 });
      return;
    } catch {
      // 2) fallback: Enter ile submit (Firefox/overlay durumlarında çok işe yarar)
      await this.searchBox.press('Enter');
    }
  }
  async linkLoginHover(){
    await this.loginLink.hover();
  }
  async linkAnmeldenClick(){
    await this.anmeldenLink.click();
  }
}