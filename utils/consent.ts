import { Page } from '@playwright/test';

export async function handleAmazonConsent(page: Page) {
  const buttons = [
    page.getByRole('button', { name: /accept/i }),
    page.getByRole('button', { name: /alle akzeptieren/i }),
    page.getByRole('button', { name: /akzeptieren/i }),
  ];

  for (const btn of buttons) {
    try {
      if (await btn.isVisible({ timeout: 1000 })) {
        await btn.click({ timeout: 2000 });
        await page.waitForTimeout(300);
        break;
      }
    } catch {}
  }
}
