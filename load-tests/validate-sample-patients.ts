import {expect, Page} from '@playwright/test';
import {loginOpenmrs} from "./utils";


// Login OpenMRS and validate if all 5 Sample Patients are present
export async function runSamplePatientsTest(page: Page) {
    await page.setViewportSize({width: 1920, height: 1080});

    await loginOpenmrs(page);

    await page.getByTestId('searchPatientIcon').click();
    await page.getByTestId('patientSearchBar').click();
    await page.getByTestId('patientSearchBar').fill('Devan');
    await expect(page.getByRole('link', { name: 'Devan Modi Male 65 yrs · 01-' })).toBeVisible();
    await page.getByTestId('patientSearchBar').click();
    await page.getByTestId('patientSearchBar').fill('Flo');
    await expect(page.getByRole('link', { name: 'Florencia Klinger Female 65' })).toBeVisible();
    await page.getByTestId('patientSearchBar').click();
    await page.getByTestId('patientSearchBar').fill('Dai');
    await expect(page.getByRole('link', { name: 'Daichi Okada Male 56 yrs · 01' })).toBeVisible();
    await page.getByTestId('patientSearchBar').click();
    await page.getByTestId('patientSearchBar').fill('Leon');
    await expect(page.getByRole('link', { name: 'Leon Wagner Male 7 days · 20-' })).toBeVisible();
    await page.getByTestId('patientSearchBar').click();
    await page.getByTestId('patientSearchBar').fill('Daniel');
    await expect(page.getByRole('link', { name: 'Daniel Acosta Male 72 yrs ·' })).toBeVisible();
}
