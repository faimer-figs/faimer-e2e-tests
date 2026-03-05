import { expect, type Page } from '@playwright/test';
import { delay, HomePage } from './home-page';

export class VisitsPage {
  constructor(readonly page: Page) {}

  async navigateToVisitsPage() {
    await this.page.getByRole('link', { name: /visits/i }).click(), delay(2000);
  }

  async startPatientVisit() {
    await this.page.getByRole('button', { name: /actions/i }).click();
    await this.page.getByRole('menuitem', { name: /add visit/i }).click(), delay(2000);
    await this.page.locator('label').filter({ hasText: 'Facility Visit' }).locator('span').first().click();
    await this.page.getByRole('button', { name: /start visit/i }).click();
    await expect(this.page.getByText(/visit started successfully/i)).toBeVisible(), delay(3000);
  }

  async updatePatientVisit() {
    await this.page.getByRole('cell', { name: /edit/i }).first().getByLabel(/edit/i).click();
    await this.page.locator('label').filter({ hasText: 'Home Visit' }).locator('span').first().click();
    await this.page.getByRole('button', { name: /update visit/i }).click(), delay(3000);
  }

  async endPatientVisit() {
    await this.page.getByRole('button', { name: /actions/i, exact: true }).click();
    await this.page.getByRole('menuitem', { name: /end active visit/i }).click();
    await this.page.getByRole('button', { name: /danger end visit/i }).click(), delay(1000);
    await expect(this.page.getByText(/error ending visit/i)).not.toBeVisible();
    await expect(this.page.getByText(/visit ended/i)).toBeVisible();
  }
}
