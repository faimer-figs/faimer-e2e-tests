import {expect, Page} from '@playwright/test';
import {loginOpenmrs, sleep} from "./utils";


// Login OpenMRS and validate if all 5 Sample Patients are present
export async function runSamplePatientsTest(page: Page) {
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
    await page.getByTestId('patientSearchBar').fill('Florencia Klinger');
    await sleep(500);
    await expect(page.getByText('1 search result')).toBeVisible();
    await sleep(500);
    await page.getByTestId('patientSearchBar').fill('Daichi Okada');
    await sleep(500);
    await expect(page.getByText('1 search result')).toBeVisible();
    await sleep(500);
    await page.getByTestId('patientSearchBar').fill('Leon Wagner');
    await sleep(500);
    await expect(page.getByText('1 search result')).toBeVisible();
    await sleep(500);
    await page.getByTestId('patientSearchBar').fill('Daniel Acosta');
    await sleep(500);
    await expect(page.getByText('1 search result')).toBeVisible();
    await sleep(500);
}
