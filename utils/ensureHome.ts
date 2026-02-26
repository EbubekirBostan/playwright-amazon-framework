import { Page, expect } from '@playwright/test';
import { handleAmazonConsent } from './consent';

export async function ensureHome(page: Page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // Gate varsa tıkla (Weiter shoppen)
  try {
    const gateBtn = page.getByRole('button', { name: /weiter shoppen/i });
    const iconI = page.getByAltText('Warnsymbol');
    if (await iconI.isVisible({ timeout: 15000 })) {
      await gateBtn.click({ force: true });
      await page.waitForLoadState('domcontentloaded');
    }
  } catch {
    // gate yoksa sessiz geç
  }

  // Consent varsa kapat
  await handleAmazonConsent(page);

  // Home hazır mı?
  await expect(
    page.locator('#twotabsearchtextbox').first()
  ).toBeVisible({ timeout: 20000 });
}