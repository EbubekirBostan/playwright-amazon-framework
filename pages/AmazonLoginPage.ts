import { Page, Locator, expect } from '@playwright/test';


type Creds = { email: string; password: string };

export class AmazonLoginPage {
  private emailInput: Locator;
  private continueButton: Locator;
  private passwordInput: Locator;
  private signInButton: Locator;
  private emailError: Locator;
  private passwordError: Locator;
  private alertBox: Locator;
 

  constructor(private page: Page, private creds: Creds) {
    this.emailInput = page.locator('[type="email"]');
    this.continueButton = page.getByRole('button', { name: 'Weiter' })
    this.passwordInput = page.locator('[type="password"]');
    this.signInButton = page.locator('#signInSubmit');

    this.emailError = page.locator('#auth-email-missing-alert, #auth-email-invalid-claim-alert, #auth-error-message-box');
    this.passwordError = page.locator('#auth-password-missing-alert, #auth-error-message-box');
    this.alertBox = page.locator('#auth-error-message-box');
    
  }

  async goto() {
      await this.page.goto('/');
    const accountLink = this.page.locator('#nav-link-accountList');

  await Promise.all([
    this.page.waitForURL(/\/ap\/signin/),
    accountLink.click(),
  ]);
  }

  // ✅ Atomic actions (negative testlerde de kullanılır)
  async fillEmail(email: string) {
    await expect(this.emailInput).toBeVisible({ timeout: 20000 });
    await this.emailInput.fill(email);
  }

  async continue() {
    await this.continueButton.click();
  }

  async fillPassword(password: string) {
    await expect(this.passwordInput).toBeVisible({ timeout: 20000 });
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.signInButton.click();
  }

  // ✅ Esnek attempt: negative/positive her şeyin temeli
  async attemptLogin(params: { email?: string; password?: string }) {
    if (params.email !== undefined) {
      await this.fillEmail(params.email);
    }
    await this.continue();

    // Email step’inde error varsa password step’e geçmeyebilir; o yüzden burada zorlamıyoruz.
    if (params.password !== undefined) {
      // password alanı görünüyorsa doldur
      if (await this.passwordInput.isVisible({ timeout: 20000 }).catch(() => false)) {
        await this.fillPassword(params.password);
        await this.submit();
      }
    }
  }

  // ✅ Happy path convenience (senin fixture creds’ini kullanır)
  async loginValidUser() {
    await this.attemptLogin({ email: this.creds.email, password: this.creds.password });
  }

  // ✅ Senior assert’ler
  async assertEmailErrorVisible() {
    await expect(this.emailError).toBeVisible({ timeout: 20000 });
  }

  async assertPasswordErrorVisible() {
    await expect(this.passwordError).toBeVisible({ timeout: 20000 });
  }

  async assertLoggedIn() {

    await this.page.goto('/gp/css/homepage.html', { waitUntil: 'domcontentloaded' });
    await expect(this.page).not.toHaveURL(/\/ap\/signin/);

  }

  async assertStillOnSignIn() {
    await expect(this.page).toHaveURL(/\/ap\/signin/);
  }
}