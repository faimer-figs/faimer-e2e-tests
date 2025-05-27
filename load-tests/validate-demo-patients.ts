import {expect, Page} from '@playwright/test';
import {loginOpenmrs} from "./utils";


// Login OpenMRS and validate if Demo Patients are present
export async function runDemoPatientsTest(page: Page) {
    await page.setViewportSize({width: 1920, height: 1080});

    await loginOpenmrs(page);

    await page.getByTestId('searchPatientIcon').click();
    await page.getByTestId('patientSearchBar').click();
    await page.getByTestId('patientSearchBar').fill('bett');
    await expect(page.getByRole('link', {name: 'Betty Williams Female 52 yrs'})).toBeVisible();
}
