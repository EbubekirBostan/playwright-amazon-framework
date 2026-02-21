import { test as base, expect, type Page } from '@playwright/test';
import { handleAmazonConsent } from '../utils/consent'
import { AmazonHomePage } from '../pages/AmazonHomePage';
import { AmazonSearchResultsPage } from '../pages/AmazonSearchResultsPage';

type Pages = {
  home: AmazonHomePage;
  results: AmazonSearchResultsPage;
};

type Helpers = {
  gotoHome(): Promise<void>;
};

export const test = base.extend<Pages & Helpers>({
  // Page Objects
  home: async ({ page }, use) => {
    await use(new AmazonHomePage(page));
  },

  results: async ({ page }, use) => {
    await use(new AmazonSearchResultsPage(page));
  },

  // Helpers
  gotoHome: async ({ page }, use) => {
    await use(async () => {
      await page.goto('/');
      await handleAmazonConsent(page);
      await expect(page.locator('#twotabsearchtextbox')).toBeVisible({ timeout: 15000 });
    });
  },
});

export { expect };