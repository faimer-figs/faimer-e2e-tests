import {Browser, expect, Page} from '@playwright/test';
import {test} from '../utils/configs/globalSetup';
import {delay, HomePage} from '../utils/pages/home-page';
import {Keycloak} from '../utils/pages/keycloak';
import {VisitsPage} from "../utils/pages/visits-page";
import {ClinicalFormsPage} from "../utils/pages/clinical-forms-page";
import {
    runAddProcedureNoteTest,
    runDeleteProcedureNoteTest,
    runEditProcedureNoteTest
} from "./procedure-note-form.spec";

let homePage: HomePage;
let keycloak: Keycloak;

async function setup(page: Page) {
    homePage = new HomePage(page);
    keycloak = new Keycloak(page);

    await keycloak.open();
    await keycloak.navigateToUsers();
    await keycloak.addUserButton().click();
    await keycloak.createUser();
}

// Sample patients should be created upon the first user login
export async function runSamplePatientsCreatedUponFirstLoginTest(page: Page, browser: Browser) {
    await setup(page);

    // setup
    await homePage.navigateToLoginPage();

    // replay
    await homePage.loginWithUser();

    // verify
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Daniel Acosta'), delay(3000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.patientSearchBar().clear(), delay(1000);
    await homePage.patientSearchBar().fill('Devan Modi'), delay(3000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.patientSearchBar().clear(), delay(1000);
    await homePage.patientSearchBar().fill('Florencia Klinger'), delay(3000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.patientSearchBar().clear(), delay(1000);
    await homePage.patientSearchBar().fill('Leon Wagner'), delay(3000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.patientSearchBar().clear(), delay(1000);
    await homePage.patientSearchBar().fill('Daichi Okada'), delay(3000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.patientSearchBar().clear(), delay(1000);

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
        testFunction: runSamplePatientsCreatedUponFirstLoginTest
    }
];
