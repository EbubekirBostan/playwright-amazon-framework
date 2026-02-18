import { defineConfig, devices } from '@playwright/test';
import { ENV } from './utils/env';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 10_000 },

  // Kurumsal: CI ve lokal farklı davranır
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : ENV.workers,

  reporter: [
  ['list'],
  ['html', { open: 'never' }],
  ['allure-playwright'],
],

  use: {
    baseURL: ENV.baseUrl,
    headless: ENV.headless,
    
    // Kurumsal debug paketi:
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',

    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  projects: [
    // Kurumsal: browser matrix
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // Public site için bazen webkit ekstra flaky olabilir; istersek sonra açarız
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
