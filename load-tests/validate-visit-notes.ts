import {expect, Page} from '@playwright/test';
import {loginOpenmrs, sleep} from "./utils";


// Validate if Sample Patient Daniel Acosta has Visit Notes
export async function runSamplePatientsVisitNoteTest(page: Page) {
    await page.setViewportSize({width: 1920, height: 1080});

    await loginOpenmrs(page);
    await sleep(500);

    await page.getByTestId('searchPatientIcon').click();
    await sleep(500);
    await page.getByTestId('patientSearchBar').click();
    await sleep(500);
    await page.getByTestId('patientSearchBar').fill('Daniel Acosta');
    await sleep(500);
    await expect(page.getByText('1 search result')).toBeVisible();
    await sleep(500);
    await page.locator('[data-testid="floatingSearchResultsContainer"]').locator(`text=Daniel Acosta`).click();
    await sleep(500);
    await expect(page.getByRole('link', { name: 'Visits' })).toBeVisible();
    await sleep(500);
    await page.getByRole('link', {name: 'Visits'}).click();
    await sleep(500);
    await page.getByRole('tab', { name: 'Visit summaries' }).click();
    await sleep(500);
    await expect(page.getByRole('tab', { name: 'All encounters' })).toBeVisible();
    await sleep(500);
    await page.getByRole('tab', { name: 'All encounters' }).click();
    await sleep(500);
    await expect(page.getByText('/ 9 items')).toBeVisible();
    await sleep(500);
}
