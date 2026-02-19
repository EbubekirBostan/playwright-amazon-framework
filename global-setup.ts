import { chromium, FullConfig, expect } from '@playwright/test';
import { handleAmazonConsent } from './utils/consent';

async function globalSetup(_config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ baseURL: process.env.BASE_URL });

  await page.goto('/');
  await handleAmazonConsent(page);

  await expect(page.locator('#twotabsearchtextbox')).toBeVisible({ timeout: 15000 });

  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;