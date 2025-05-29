import {expect, Page} from '@playwright/test';
import {loginOpenmrs, sleep} from "./utils";


// Login OpenMRS and validate if Demo Patients are present
export async function runDemoPatientsTest(page: Page) {
    await page.setViewportSize({width: 1920, height: 1080});

    await loginOpenmrs(page);
    await sleep(500);

    await page.getByTestId('searchPatientIcon').click();
    await sleep(500);
    await page.getByTestId('patientSearchBar').click();
    await sleep(500);
    await page.getByTestId('patientSearchBar').fill('Betty Williams');
    await sleep(500);
    await expect(page.getByText('1 search result')).toBeVisible();
    await sleep(500);
    await page.locator('[data-testid="floatingSearchResultsContainer"]').locator(`text=Betty Williams`).click();
    await sleep(500);
}
