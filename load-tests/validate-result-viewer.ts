import {expect, Page} from '@playwright/test';
import {loginOpenmrs} from "./utils";


// Validate if Sample Patients contain results
export async function runSamplePatientsResultViewerTest(page: Page) {
    await page.setViewportSize({width: 1920, height: 1080});

    await loginOpenmrs(page);

    await page.getByTestId('searchPatientIcon').click();
    await page.getByTestId('patientSearchBar').click();
    await page.getByTestId('patientSearchBar').fill('Dev');
    await expect(page.getByRole('link', {name: 'Devan Modi Male 65 yrs · 01-'})).toBeVisible();
    await page.getByRole('link', {name: 'Devan Modi Male 65 yrs · 01-'}).click();
    await expect(page.getByRole('link', {name: 'Results'})).toBeVisible();
    await page.getByRole('link', {name: 'Results'}).click();
    await expect(page.getByRole('tab', {name: 'Over time'})).toBeVisible();
    await page.getByRole('tab', { name: 'Over time' }).click();
    await expect(page.getByText('CT head (without contrast)').nth(1)).toBeVisible();
    await expect(page.getByText('Haemoglobin').nth(2)).toBeVisible();
    await expect(page.getByText('Serum sodium').nth(2)).toBeVisible();
}
