import {expect, Page} from '@playwright/test';
import {loginOpenmrs, sleep} from "./utils";


// Validate if Sample Patients contain results
export async function runSamplePatientsResultViewerTest(page: Page) {
    await page.setViewportSize({width: 1920, height: 1080});

    await loginOpenmrs(page);
    await sleep(500);

    await page.getByTestId('searchPatientIcon').click();
    await sleep(500);
    await page.getByTestId('patientSearchBar').click();
    await sleep(500);
    await page.getByTestId('patientSearchBar').fill('Devan Modi');
    await sleep(500);
    await expect(page.getByText('1 search result')).toBeVisible();
    await sleep(500);
    await page.locator('[data-testid="floatingSearchResultsContainer"]').locator(`text=Devan Modi`).click();
    await sleep(500);
    await expect(page.getByRole('link', {name: 'Results'})).toBeVisible();
    await sleep(500);
    await page.getByRole('link', {name: 'Results'}).click();
    await sleep(500);
    await expect(page.getByRole('tab', {name: 'Over time'})).toBeVisible();
    await sleep(500);
    await page.getByRole('tab', { name: 'Over time' }).click();
    await sleep(500);
    await expect(page.getByText('CT head (without contrast)').nth(1)).toBeVisible();
    await sleep(500);
    await expect(page.getByText('Haemoglobin').nth(2)).toBeVisible();
    await sleep(500);
    await expect(page.getByText('Serum sodium').nth(2)).toBeVisible();
    await sleep(500);
}
