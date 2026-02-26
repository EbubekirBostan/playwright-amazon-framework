import { test as base, expect, type Page } from '@playwright/test';
import { ensureHome } from '../utils/ensureHome';
import { AmazonHomePage } from '../pages/AmazonHomePage';
import { AmazonSearchResultsPage } from '../pages/AmazonSearchResultsPage';
import { AmazonLoginPage } from '../pages/AmazonLoginPage';

type Pages = {
  home: AmazonHomePage;
  results: AmazonSearchResultsPage;
  loginAmazon: AmazonLoginPage;
};
type Options = {
  email: string;
  password: string;
}
type Creds = {
  email: string;
  password: string;
}

type Helpers = {
  gotoHome(): Promise<void>;
};



export const test = base.extend<Options&{creds: Creds}&Pages & Helpers>({
  email: ['', { option: true }],
  password: ['', { option: true }],

  // ✅ tek yerden “credentials” objesi üret
  creds: async ({ email, password }, use) => {
    if (!email) throw new Error('EMAIL boş (.env / CI secrets / ENV.email kontrol et)');
    if (!password) throw new Error('PASSWORD boş (.env / CI secrets / ENV.password kontrol et)');
    await use({ email, password });
  },
  // Page Objects
  home: async ({ page }, use) => {
    await use(new AmazonHomePage(page));
  },

  results: async ({ page }, use) => {
    await use(new AmazonSearchResultsPage(page));
  },
  loginAmazon: async({page, creds}, use)=>{
    await use(new AmazonLoginPage(page, creds));
  },

  // Helpers
  



gotoHome: async ({ page }, use) => {
  await use(async () => {
    await ensureHome(page);
  });
},
});

export { expect };