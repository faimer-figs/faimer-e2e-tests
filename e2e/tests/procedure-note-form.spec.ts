import {Browser, expect, Page} from '@playwright/test';
import {test} from '../utils/configs/globalSetup';
import {delay, HomePage} from '../utils/pages/home-page';
import {Keycloak} from '../utils/pages/keycloak';
import {VisitsPage} from '../utils/pages/visits-page';
import {
    ClinicalFormsPage,
    complications,
    consent,
    indication,
    physcian,
    procedure,
    procedureSummary,
    updatedComplications,
    updatedConsent,
    updatedProcedureSummary
} from '../utils/pages/clinical-forms-page';

let homePage: HomePage;
let keycloak: Keycloak;
let visitsPage: VisitsPage;
let formsPage: ClinicalFormsPage;


async function setup(page: Page) {
    homePage = new HomePage(page);
    keycloak = new Keycloak(page);
    visitsPage = new VisitsPage(page);
    formsPage = new ClinicalFormsPage(page);

    await keycloak.open();
    await keycloak.navigateToUsers();
    await keycloak.addUserButton().click();
    await keycloak.createUser();
}

// Add procedure note
export async function runAddProcedureNoteTest(page: Page, browser: Browser) {
    await setup(page);

    // setup
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Daniel Acosta'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Daniel Acosta');
    await visitsPage.startPatientVisit();

    // replay
    await formsPage.navigateToClinicalForms();
    await formsPage.navigateToProcedureNoteForm();
    await formsPage.fillProcedureNoteForm();
    await formsPage.saveForm();

    // verify
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToEncounterPage();
    await page.getByRole('button', {name: /expand current row/i}).click();
    await expect(page.locator('//span[normalize-space()="Indication"]/following-sibling::span[1]')).toHaveText(`${indication}`);
    await expect(page.locator('//span[normalize-space()="Physician"]/following-sibling::span[1]')).toHaveText(`${physcian}`);
    await expect(page.locator('//span[normalize-space()="Procedure Summary"]/following-sibling::span[1]')).toHaveText(`${procedureSummary}`);
    await expect(page.locator('//span[normalize-space()="Time of Procedure"]/following-sibling::span[1]')).toHaveText(/April 22, 2025/i);
    await expect(page.locator('//span[normalize-space()="Procedure"]/following-sibling::span[1]')).toHaveText(`${procedure}`);
    await expect(page.locator('//span[normalize-space()="Consent"]/following-sibling::span[1]')).toHaveText(`${consent}`);
    await expect(page.locator('//span[normalize-space()="Anesthesia Type"]/following-sibling::span[1]')).toHaveText(/local anesthesia and sedation/i);
    await expect(page.locator('//span[normalize-space()="Complications"]/following-sibling::span[1]')).toHaveText(`${complications}`);

    await cleanup(browser);
}


// Edit procedure note
export async function runEditProcedureNoteTest(page: Page, browser: Browser) {
    await setup(page);

    // setup
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Devan Modi'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Devan Modi');
    await visitsPage.startPatientVisit();
    await formsPage.navigateToClinicalForms();
    await formsPage.navigateToProcedureNoteForm();
    await formsPage.fillProcedureNoteForm();
    await formsPage.saveForm();
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToEncounterPage();
    await page.getByRole('button', {name: /expand current row/i}).click();
    await expect(page.locator('//span[normalize-space()="Indication"]/following-sibling::span[1]')).toHaveText(`${indication}`);
    await expect(page.locator('//span[normalize-space()="Physician"]/following-sibling::span[1]')).toHaveText(`${physcian}`);
    await expect(page.locator('//span[normalize-space()="Time of Procedure"]/following-sibling::span[1]')).toHaveText(/April 22, 2025/i);
    await expect(page.locator('//span[normalize-space()="Procedure Summary"]/following-sibling::span[1]')).toHaveText(`${procedureSummary}`);
    await expect(page.locator('//span[normalize-space()="Procedure"]/following-sibling::span[1]')).toHaveText(`${procedure}`);
    await expect(page.locator('//span[normalize-space()="Consent"]/following-sibling::span[1]')).toHaveText(`${consent}`);
    await expect(page.locator('//span[normalize-space()="Anesthesia Type"]/following-sibling::span[1]')).toHaveText(/local anesthesia and sedation/i);
    await expect(page.locator('//span[normalize-space()="Complications"]/following-sibling::span[1]')).toHaveText(`${complications}`);

    // replay
    await formsPage.updateProcedureNote();
    await homePage.navigateToHomePage();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Devan Modi'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Devan Modi');

    // verify
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToEncounterPage();
    await page.getByRole('button', {name: /expand current row/i}).click();
    await expect(page.locator('//span[normalize-space()="Time of Procedure"]/following-sibling::span[1]')).not.toHaveText(/April 22, 2025/i);
    await expect(page.locator('//span[normalize-space()="Time of Procedure"]/following-sibling::span[1]')).toHaveText(/March 24, 2025/i);
    await expect(page.locator('//span[normalize-space()="Consent"]/following-sibling::span[1]')).not.toHaveText(`${consent}`);
    await expect(page.locator('//span[normalize-space()="Consent"]/following-sibling::span[1]')).toHaveText(`${updatedConsent}`);
    await expect(page.locator('//span[normalize-space()="Anesthesia Type"]/following-sibling::span[1]')).not.toHaveText(/local anesthesia and sedation/i);
    await expect(page.locator('//span[normalize-space()="Anesthesia Type"]/following-sibling::span[1]')).toHaveText(/monitored anesthesia care/i);
    await expect(page.locator('//span[normalize-space()="Procedure Summary"]/following-sibling::span[1]')).not.toHaveText(`${procedureSummary}`);
    await expect(page.locator('//span[normalize-space()="Procedure Summary"]/following-sibling::span[1]')).toHaveText(`${updatedProcedureSummary}`);
    await expect(page.locator('//span[normalize-space()="Complications"]/following-sibling::span[1]')).not.toHaveText(`${complications}`);
    await expect(page.locator('//span[normalize-space()="Complications"]/following-sibling::span[1]')).toHaveText(`${updatedComplications}`);

    await cleanup(browser);
}


// Delete procedure note
export async function runDeleteProcedureNoteTest(page: Page, browser: Browser) {
    await setup(page);

    // setup
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Leon Wagner'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Leon Wagner');
    await visitsPage.startPatientVisit();
    await formsPage.navigateToClinicalForms();
    await formsPage.navigateToProcedureNoteForm();
    await formsPage.fillProcedureNoteForm();
    await formsPage.saveForm();
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToEncounterPage();
    await page.getByRole('button', {name: /expand current row/i}).click();
    await expect(page.locator('//span[normalize-space()="Indication"]/following-sibling::span[1]')).toHaveText(`${indication}`);
    await expect(page.locator('//span[normalize-space()="Physician"]/following-sibling::span[1]')).toHaveText(`${physcian}`);
    await expect(page.locator('//span[normalize-space()="Time of Procedure"]/following-sibling::span[1]')).toHaveText(/April 22, 2025/i);
    await expect(page.locator('//span[normalize-space()="Procedure Summary"]/following-sibling::span[1]')).toHaveText(`${procedureSummary}`);
    await expect(page.locator('//span[normalize-space()="Procedure"]/following-sibling::span[1]')).toHaveText(`${procedure}`);
    await expect(page.locator('//span[normalize-space()="Consent"]/following-sibling::span[1]')).toHaveText(`${consent}`);
    await expect(page.locator('//span[normalize-space()="Anesthesia Type"]/following-sibling::span[1]')).toHaveText(/local anesthesia and sedation/i);
    await expect(page.locator('//span[normalize-space()="Complications"]/following-sibling::span[1]')).toHaveText(`${complications}`);

    // replay
    await formsPage.deleteEncounter();
    await homePage.navigateToHomePage();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Leon Wagner'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Leon Wagner');

    // verify
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToEncounterPage();
    await expect(page.getByText(/There are no encounters to display for this patient/).nth(0)).toBeVisible();

    await cleanup(browser);
}

async function cleanup(browser: Browser) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const keycloak = new Keycloak(page);
    await keycloak.deleteUser();
    await context.close();
}

