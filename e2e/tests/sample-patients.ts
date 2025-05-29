import {expect, Page} from '@playwright/test';
import {delay, HomePage} from '../utils/pages/home-page';
import {Keycloak} from '../utils/pages/keycloak';
import {cleanup} from "./utils";

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
export async function runSamplePatientsCreatedUponFirstLoginTest(page: Page) {

    await page.setViewportSize({width: 1920, height: 1080});
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

    await cleanup(page);
}
