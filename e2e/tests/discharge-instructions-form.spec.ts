import {Browser, expect, Page} from '@playwright/test';
import {delay, HomePage} from '../utils/pages/home-page';
import {Keycloak} from '../utils/pages/keycloak';
import {VisitsPage} from '../utils/pages/visits-page';
import {
    ClinicalFormsPage,
    additionalInstructions,
    dischargeMedications,
    followUpAppointment,
    reasonsToContactDoctor,
    treatmentInformationAndInstructions,
    updatedAdditionalInstructions,
    updatedDischargeMedications,
    updatedFollowUpAppointment,
    updatedReasonsToContactDoctor
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

// Add discharge instructions
export async function runAddDischargeInstructionsTest(page: Page, browser: Browser) {
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
    await formsPage.navigateToDischargeInstructionsForm();
    await formsPage.fillDischargeInstructionsForm();
    await formsPage.saveForm();

    // verify
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToEncounterPage();
    await page.getByRole('button', {name: /expand current row/i}).click();
    await expect(page.locator('//span[normalize-space()="Discharge Medication"]/following-sibling::span[1]')).toHaveText(`${dischargeMedications}`);
    await expect(page.locator('//span[normalize-space()="Physician"]/following-sibling::span[1]')).toHaveText(`${followUpAppointment}`);
    await expect(page.locator('//span[normalize-space()="Reasons to Contact the Doctor"]/following-sibling::span[1]')).toHaveText(`${reasonsToContactDoctor}`);
    await expect(page.locator('//span[normalize-space()="Treatment Information and Instructions"]/following-sibling::span[1]')).toHaveText(`${treatmentInformationAndInstructions}`);
    await expect(page.locator('//span[normalize-space()="Additional Instructions"]/following-sibling::span[1]')).toHaveText(`${additionalInstructions}`);

    await cleanup(browser);
}

// Edit discharge instructions
export async function runEditDischargeInstructionsTest(page: Page, browser: Browser) {
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
    await formsPage.navigateToDischargeInstructionsForm();
    await formsPage.fillDischargeInstructionsForm();
    await formsPage.saveForm();
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToEncounterPage();
    await page.getByRole('button', {name: /expand current row/i}).click();
    await expect(page.locator('//span[normalize-space()="Discharge Medication"]/following-sibling::span[1]')).toHaveText(`${dischargeMedications}`);
    await expect(page.locator('//span[normalize-space()="Physician"]/following-sibling::span[1]')).toHaveText(`${followUpAppointment}`);
    await expect(page.locator('//span[normalize-space()="Reasons to Contact the Doctor"]/following-sibling::span[1]')).toHaveText(`${reasonsToContactDoctor}`);
    await expect(page.locator('//span[normalize-space()="Treatment Information and Instructions"]/following-sibling::span[1]')).toHaveText(`${treatmentInformationAndInstructions}`);
    await expect(page.locator('//span[normalize-space()="Additional Instructions"]/following-sibling::span[1]')).toHaveText(`${additionalInstructions}`);

    // replay
    await formsPage.updateDischargeInstructions();
    await homePage.navigateToHomePage();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Devan Modi'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Devan Modi');

    // verify
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToEncounterPage();
    await page.getByRole('button', {name: /expand current row/i}).click();
    await expect(page.locator('//span[normalize-space()="Discharge Medication"]/following-sibling::span[1]')).not.toHaveText(`${dischargeMedications}`);
    await expect(page.locator('//span[normalize-space()="Discharge Medication"]/following-sibling::span[1]')).toHaveText(`${updatedDischargeMedications}`);
    await expect(page.locator('//span[normalize-space()="Physician"]/following-sibling::span[1]')).not.toHaveText(`${followUpAppointment}`);
    await expect(page.locator('//span[normalize-space()="Physician"]/following-sibling::span[1]')).toHaveText(`${updatedFollowUpAppointment}`);
    await expect(page.locator('//span[normalize-space()="Reasons to Contact the Doctor"]/following-sibling::span[1]')).not.toHaveText(`${reasonsToContactDoctor}`);
    await expect(page.locator('//span[normalize-space()="Reasons to Contact the Doctor"]/following-sibling::span[1]')).toHaveText(`${updatedReasonsToContactDoctor}`);
    await expect(page.locator('//span[normalize-space()="Treatment Information and Instructions"]/following-sibling::span[1]')).toHaveText(`${treatmentInformationAndInstructions}`);
    await expect(page.locator('//span[normalize-space()="Additional Instructions"]/following-sibling::span[1]')).not.toHaveText(`${additionalInstructions}`);
    await expect(page.locator('//span[normalize-space()="Additional Instructions"]/following-sibling::span[1]')).toHaveText(`${updatedAdditionalInstructions}`);

    await cleanup(browser);
}

// Delete discharge instructions
export async function runDeleteDischargeInstructionsTest(page: Page, browser: Browser) {
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
    await formsPage.navigateToDischargeInstructionsForm();
    await formsPage.fillDischargeInstructionsForm();
    await formsPage.saveForm();
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToEncounterPage();
    await page.getByRole('button', {name: /expand current row/i}).click();
    await expect(page.locator('//span[normalize-space()="Discharge Medication"]/following-sibling::span[1]')).toHaveText(`${dischargeMedications}`);
    await expect(page.locator('//span[normalize-space()="Physician"]/following-sibling::span[1]')).toHaveText(`${followUpAppointment}`);
    await expect(page.locator('//span[normalize-space()="Reasons to Contact the Doctor"]/following-sibling::span[1]')).toHaveText(`${reasonsToContactDoctor}`);
    await expect(page.locator('//span[normalize-space()="Treatment Information and Instructions"]/following-sibling::span[1]')).toHaveText(`${treatmentInformationAndInstructions}`);
    await expect(page.locator('//span[normalize-space()="Additional Instructions"]/following-sibling::span[1]')).toHaveText(`${additionalInstructions}`);

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

export const config = {
    target: 'https://oz-faimer-dev.mekomsolutions.net',
    engines: {
        playwright: {
            timeout: 60000
        }
    }
};

export const scenarios = [
    {
        engine: 'playwright',
        testFunction: runAddDischargeInstructionsTest
    },
    {
        engine: 'playwright',
        testFunction: runEditDischargeInstructionsTest
    },
    {
        engine: 'playwright',
        testFunction: runDeleteDischargeInstructionsTest
    }
];
