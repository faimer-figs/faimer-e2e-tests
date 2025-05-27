import {O3_URL} from "../e2e/utils/configs/globalSetup";
import {Page} from "@playwright/test";

export async function loginOpenmrs(page: Page) {
    await page.goto(`${O3_URL}`);
    await page.getByRole('textbox', {name: 'Username'}).click();
    await page.getByRole('textbox', {name: 'Username'}).fill('testFaimer');
    await page.getByRole('textbox', {name: 'Password'}).click();
    await page.getByRole('textbox', {name: 'Password'}).fill('Admin123');
    await page.getByRole('button', {name: 'Log in'}).click();
    await page.locator('label').filter({hasText: 'Inpatient Ward'}).locator('span').first().click();
    await page.getByRole('button', {name: 'Confirm'}).click();
}

