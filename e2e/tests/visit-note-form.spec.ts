import {test, expect, Page, Browser} from '@playwright/test';
import {delay, HomePage} from '../utils/pages/home-page';
import {Keycloak} from '../utils/pages/keycloak';
import {VisitsPage} from '../utils/pages/visits-page';
import {
    ClinicalFormsPage,
    updatedVisitNote,
    visitNote
} from '../utils/pages/clinical-forms-page';
import {runUserCreationAndFilteringTest} from "./users.spec";

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

// Add visit note
export async function runAddVisitNoteTest(page: Page, browser: Browser) {
    await setup(page);

    // setup
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Florencia Klinger'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Florencia Klinger');
    await visitsPage.startPatientVisit();

    // replay
    await formsPage.navigateToClinicalForms();
    await formsPage.navigateToVisitNoteForm();
    await formsPage.fillVisitNoteForm();
    await formsPage.saveForm();

    // verify
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToNotesPage(), delay(2000);
    await expect(page.getByText(visitNote)).toBeVisible();

    await cleanup(browser);
}

// Edit visit note
export async function runEditVisitNoteTest(page: Page, browser: Browser) {
    await setup(page);

    // setup
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Daniel Acosta'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Daniel Acosta');
    await visitsPage.startPatientVisit();
    await formsPage.navigateToClinicalForms();
    await formsPage.navigateToVisitNoteForm();
    await formsPage.fillVisitNoteForm();
    await formsPage.saveForm();
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToNotesPage(), delay(2000);
    await expect(page.getByText(visitNote)).toBeVisible();

    // replay
    await formsPage.updateVisitNote();
    await homePage.navigateToHomePage();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Daniel Acosta'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Daniel Acosta');

    // verify
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToNotesPage(), delay(2000);
    await expect(page.getByText(visitNote)).not.toBeVisible();
    await expect(page.getByText(updatedVisitNote)).toBeVisible();

    await cleanup(browser);
}

// Delete visit note
export async function runDeleteVisitNoteTest(page: Page, browser: Browser) {
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
    await formsPage.navigateToVisitNoteForm();
    await formsPage.fillVisitNoteForm();
    await formsPage.saveForm();
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToNotesPage(), delay(2000);
    await expect(page.getByText(visitNote)).toBeVisible();

    // replay
    await formsPage.navigateToEncounterPage();
    await page.getByRole('button', {name: /expand current row/i}).click();
    await formsPage.deleteEncounter();
    await homePage.navigateToHomePage();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Devan Modi'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Devan Modi');

    // verify
    await visitsPage.navigateToVisitsPage();
    await formsPage.navigateToNotesPage(), delay(2000);
    await expect(page.getByText(/there are no notes to display for this patient/i).nth(0)).toBeVisible();

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
        testFunction: runAddVisitNoteTest
    },
    {
        engine: 'playwright',
        testFunction: runEditVisitNoteTest
    },
    {
        engine: 'playwright',
        testFunction: runDeleteVisitNoteTest
    }
];
