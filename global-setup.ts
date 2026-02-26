import { chromium, FullConfig } from '@playwright/test';
import { ensureHome } from './utils/ensureHome';

async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL as string;

  const browser = await chromium.launch();
  const page = await browser.newPage({ baseURL });

  await ensureHome(page);

  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;