import {expect, Page} from '@playwright/test';
import {test} from '../utils/configs/globalSetup';
import {delay, HomePage} from '../utils/pages/home-page';
import {Keycloak} from '../utils/pages/keycloak';
import {cleanup} from "./utils";

let homePage: HomePage;
let keycloak: Keycloak;

async function setup(page: Page) {
    homePage = new HomePage(page);
    keycloak = new Keycloak(page);
}

// User creation and data filtering
export async function runUserCreationAndFilteringTest(page: Page) {

    await page.setViewportSize({width: 1920, height: 1080});
    await setup(page);

    // setup
    await keycloak.open();
    test.setTimeout(240000);
    await keycloak.navigateToUsers();
    await keycloak.addUserButton().click();
    await keycloak.createUser();
    await page.getByLabel('Breadcrumb').getByRole('link', {name: /users/i}).click();
    await keycloak.addUserButton().click();
    await keycloak.createUserTwo();
    await page.getByLabel('Breadcrumb').getByRole('link', {name: /users/i}).click();
    await keycloak.addUserButton().click();
    await keycloak.createUserThree();

    // replay
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Daniel Acosta'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Daniel Acosta');
    await homePage.searchPatientId();
    const patientIdentifierForFirstSamplePatient = await page.locator('[data-testid="identifier-placeholder"]').textContent();
    await homePage.navigateToHomePage();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Devan Modi'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Devan Modi');
    await homePage.searchPatientId();
    const patientIdentifierForSecondSamplePatient = await page.locator('[data-testid="identifier-placeholder"]').textContent();
    await homePage.navigateToHomePage();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Florencia Klinger'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Florencia Klinger');
    await homePage.searchPatientId();
    const patientIdentifierForThirdSamplePatient = await page.locator('[data-testid="identifier-placeholder"]').textContent();
    await homePage.logout();

    // verify
    await homePage.loginWithUserTwo();
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
    await homePage.patientSearchBar().fill(`${patientIdentifierForFirstSamplePatient}`), delay(3000);
    await expect(page.getByText(/sorry, no patient charts were found/i)).toBeVisible();
    await homePage.patientSearchBar().clear(), delay(1000);
    await homePage.patientSearchBar().fill(`${patientIdentifierForSecondSamplePatient}`), delay(3000);
    await expect(page.getByText(/sorry, no patient charts were found/i)).toBeVisible();
    await homePage.patientSearchBar().clear(), delay(1000);
    await homePage.patientSearchBar().fill(`${patientIdentifierForThirdSamplePatient}`), delay(3000);
    await expect(page.getByText(/sorry, no patient charts were found/i)).toBeVisible();
    await homePage.patientSearchBar().clear(), delay(1000);
    await homePage.logout();
    await homePage.loginWithUserThree();
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
    await homePage.patientSearchBar().fill(`${patientIdentifierForFirstSamplePatient}`), delay(3000);
    await expect(page.getByText(/sorry, no patient charts were found/i)).toBeVisible();
    await homePage.patientSearchBar().clear(), delay(1000);
    await homePage.patientSearchBar().fill(`${patientIdentifierForSecondSamplePatient}`), delay(3000);
    await expect(page.getByText(/sorry, no patient charts were found/i)).toBeVisible();
    await homePage.patientSearchBar().clear(), delay(1000);
    await homePage.patientSearchBar().fill(`${patientIdentifierForThirdSamplePatient}`), delay(3000);
    await expect(page.getByText(/sorry, no patient charts were found/i)).toBeVisible();
    await homePage.patientSearchBar().clear(), delay(1000);
    await homePage.logout();

    await cleanup(page);
}
