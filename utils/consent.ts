import { Page } from '@playwright/test';

export async function handleAmazonConsent(page: Page) {
  // Bu popup bazen sayfanın altına gelir, button role her zaman "button" olur.
  const acceptButtons = [
    page.getByRole('button', { name: /^accept$/i }),
    page.getByRole('button', { name: /accept all/i }),
    page.getByRole('button', { name: /alle akzeptieren/i }),
    page.getByRole('button', { name: /akzeptieren/i }),
  ];

  for (const btn of acceptButtons) {
    try {
      if (await btn.isVisible({ timeout: 1200 })) {
        await btn.click({ timeout: 3000 });
        await page.waitForTimeout(300);
        return;
      }
    } catch {}
  }

  // Bazı varyantlarda buton input olabilir:
  const acceptInput = page.locator('input[type="submit"][value*="Accept" i]');
  try {
    if (await acceptInput.isVisible({ timeout: 800 })) {
      await acceptInput.click({ timeout: 3000 });
      await page.waitForTimeout(300);
    }
  } catch {}
}