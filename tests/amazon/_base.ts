import { test as base } from '@playwright/test';
import { handleAmazonConsent } from '../../utils/consent';

export const test = base.extend({});

test.beforeEach(async ({ page }) => {
  // Her testte homepage'e gitmek istiyorsan:
  // await page.goto('/');
  // Ama bazı testler direkt farklı URL'e gidebilir. O yüzden consent'i
  // genelde goto sonrası çağırmak daha iyi.
});

export async function gotoHomeAndAccept(page: Parameters<typeof handleAmazonConsent>[0]) {
  await page.goto('/');
  await handleAmazonConsent(page);
}
