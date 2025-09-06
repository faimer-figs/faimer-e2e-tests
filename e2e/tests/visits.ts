import {expect, Page} from '@playwright/test';
import {delay, HomePage} from '../utils/pages/home-page';
import {Keycloak} from '../utils/pages/keycloak';
import {VisitsPage} from '../utils/pages/visits-page';
import {cleanup} from "./utils";

let homePage: HomePage;
let keycloak: Keycloak;
let visitsPage: VisitsPage;

async function setup(page: Page) {
    homePage = new HomePage(page);
    keycloak = new Keycloak(page);
    visitsPage = new VisitsPage(page);

    await keycloak.open();
    await keycloak.navigateToUsers();
    await keycloak.addUserButton().click();
    await keycloak.createUser();
}

// Start patient visit
export async function runStartPatientVisitTest(page: Page) {

    await page.setViewportSize({width: 1920, height: 1080});
    await setup(page);

    // setup
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();

    // replay
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Florencia Klinger'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Florencia Klinger');
    await visitsPage.startPatientVisit();

    // verify
    await visitsPage.navigateToVisitsPage();
    await expect(page.getByRole('heading', {name: 'Facility Visit'}).nth(0)).toBeVisible();
    await expect(page.locator('span[title="Active Visit"]').getByText(/active visit/i)).toBeVisible();

    await cleanup(page);
}

// Edit patient visit
export async function runEditPatientVisitTest(page: Page) {

    await page.setViewportSize({width: 1920, height: 1080});
    await setup(page);

    // setup
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Devan Modi'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Devan Modi');
    await visitsPage.startPatientVisit();
    await visitsPage.navigateToVisitsPage();
    await expect(page.getByRole('heading', {name: 'Facility Visit'}).nth(0)).toBeVisible();
    await expect(page.locator('span[title="Active Visit"]').getByText(/active visit/i)).toBeVisible();

    // replay
    await visitsPage.updatePatientVisit();

    // verify
    await expect(page.getByRole('heading', {name: 'Home Visit'}).nth(0)).toBeVisible();
    await expect(page.locator('span[title="Active Visit"]').getByText(/active visit/i)).toBeVisible();

    await cleanup(page);
}

// End patient visit
export async function runEndPatientVisitTest(page: Page) {

    await page.setViewportSize({width: 1920, height: 1080});
    await setup(page);

    // setup
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Leon Wagner'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Leon Wagner');
    await visitsPage.startPatientVisit();
    await visitsPage.navigateToVisitsPage();
    await expect(page.getByRole('heading', {name: 'Facility Visit'}).nth(0)).toBeVisible();
    await expect(page.locator('span[title="Active Visit"]').getByText(/active visit/i)).toBeVisible();

    // replay
    await visitsPage.endPatientVisit();

    // verify
    await expect(page.getByText(/active visit/i)).not.toBeVisible();

    await cleanup(page);
}
