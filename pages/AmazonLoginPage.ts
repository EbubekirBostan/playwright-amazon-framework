import { Page, Locator, expect } from "@playwright/test";

export class AmazonLoginPage {

readonly inputEmail: Locator;
readonly buttonWeiter: Locator;

constructor(page: Page) {
this.inputEmail = page.getByRole('textbox', { name: 'Mobiltelefonnummer oder E-' });
this.buttonWeiter = page.getByRole('button', { name: 'Weiter' });
}
async fillEmailAndContinue(email: string) {
    await expect(this.inputEmail).toBeVisible({ timeout: 1500 });

    await this.inputEmail.fill(email).then(() =>{
        this.buttonWeiter.click();
    });





}
}