import {expect, Page} from '@playwright/test';
import {delay, HomePage} from '../utils/pages/home-page';
import {Keycloak} from '../utils/pages/keycloak';
import {
    PatientListsPage,
    editedPatientListDescription,
    editedPatientListName,
    patientListDescription,
    patientListName,
} from '../utils/pages/patient-lists-page';
import {cleanup} from "./utils";

let homePage: HomePage;
let keycloak: Keycloak;
let patientListPage: PatientListsPage;

async function setup(page: Page) {
    homePage = new HomePage(page);
    keycloak = new Keycloak(page);
    patientListPage = new PatientListsPage(page);

    await keycloak.open();
    await keycloak.navigateToUsers();
    await keycloak.addUserButton().click();
    await keycloak.createUser();
}

// Create a patient list
export async function runCreatePatientListTest(page: Page) {

    await setup(page);

    // setup
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await patientListPage.navigateToPatientList();

    // replay
    await patientListPage.addNewPatientList(patientListName, patientListDescription);
    await patientListPage.allListsButton().click();
    await patientListPage.searchPatientList(patientListName);
    await patientListPage.patientListsTable().getByText(patientListName).click();

    // verify
    await expect(patientListPage.patientListHeader()).toHaveText(new RegExp(patientListName));
    await expect(patientListPage.patientListHeader()).toHaveText(new RegExp(patientListDescription));
    await expect(patientListPage.patientListHeader()).toHaveText(/0 patients/);

    await cleanup(page);
}

// Edit a patient list
export async function runEditPatientListTest(page: Page) {

    await setup(page);

    // setup
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await patientListPage.navigateToPatientList();
    await patientListPage.addNewPatientList(patientListName, patientListDescription);
    await patientListPage.allListsButton().click();
    await patientListPage.searchPatientList(patientListName);
    await patientListPage.patientListsTable().getByText(patientListName).click();
    await expect(patientListPage.patientListHeader()).toHaveText(new RegExp(patientListName));
    await expect(patientListPage.patientListHeader()).toHaveText(new RegExp(patientListDescription));
    await expect(patientListPage.patientListHeader()).toHaveText(/0 patients/);

    // replay
    await patientListPage.editPatientList(editedPatientListName, editedPatientListDescription);

    // verify
    await expect(patientListPage.patientListHeader()).not.toHaveText(new RegExp(patientListName));
    await expect(patientListPage.patientListHeader()).toHaveText(new RegExp(editedPatientListName));
    await expect(patientListPage.patientListHeader()).not.toHaveText(new RegExp(patientListDescription));
    await expect(patientListPage.patientListHeader()).toHaveText(new RegExp(editedPatientListDescription));

    await cleanup(page);
}

// Delete a patient list
export async function runDeletePatientListTest(page: Page) {

    await setup(page);

    // setup
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await patientListPage.navigateToPatientList();
    await patientListPage.addNewPatientList(patientListName, patientListDescription);
    await patientListPage.allListsButton().click();
    await patientListPage.searchPatientList(patientListName);
    await patientListPage.patientListsTable().getByText(patientListName).click();
    await expect(patientListPage.patientListHeader()).toHaveText(new RegExp(patientListName));
    await expect(patientListPage.patientListHeader()).toHaveText(new RegExp(patientListDescription));
    await expect(patientListPage.patientListHeader()).toHaveText(/0 patients/);

    // replay
    await patientListPage.deletePatientList();

    // verify
    await patientListPage.navigateToMyList();
    await expect(page.getByText(/there are no user-defined patient lists to display/i)).toBeVisible();

    await cleanup(page);
}

// Manage patients in a list
export async function runManagePatientListTest(page: Page) {

    await setup(page);

    // setup
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await patientListPage.navigateToPatientList();
    await patientListPage.addNewPatientList(patientListName, patientListDescription);
    await patientListPage.allListsButton().click();
    await patientListPage.searchPatientList(patientListName);
    await patientListPage.patientListsTable().getByText(patientListName).click();
    await expect(patientListPage.patientListHeader()).toHaveText(new RegExp(patientListName));
    await expect(patientListPage.patientListHeader()).toHaveText(new RegExp(patientListDescription));
    await expect(patientListPage.patientListHeader()).toHaveText(/0 patients/);

    // replay
    await homePage.navigateToHomePage();
    await homePage.patientSearchIcon().click();
    await homePage.patientSearchBar().fill('Florencia Klinger'), delay(2000);
    await expect(page.getByText('1 search result')).toBeVisible();
    await homePage.clickOnPatientResult('Florencia Klinger');
    await patientListPage.addPatientToList();

    // verify adding patient to list
    await homePage.navigateToHomePage();
    await patientListPage.navigateToPatientList();
    await patientListPage.navigateToMyList();
    await patientListPage.searchPatientList(patientListName);
    await page.getByRole('link', {name: 'Cohort'}).click();
    await expect(page.getByRole('link', {name: 'Florencia Klinger'})).toBeVisible();

    // verify removing patient from list
    await patientListPage.removePatientToList();
    await expect(page.getByText(/there are no patients in this list/i)).toBeVisible();

    await cleanup(page);
}

// Patient list created by one user should not be visible to another user
export async function runPatientListVisibilityCheckTest(page: Page) {

    await setup(page);

    // setup
    await page.getByLabel('Breadcrumb').getByRole('link', {name: /users/i}).click();
    await keycloak.addUserButton().click();
    await keycloak.createUserTwo();
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await patientListPage.navigateToPatientList();
    await patientListPage.addNewPatientList(patientListName, patientListDescription);
    await patientListPage.allListsButton().click();
    await patientListPage.searchPatientList(patientListName);
    await patientListPage.patientListsTable().getByText(patientListName).click();
    await expect(patientListPage.patientListHeader()).toHaveText(new RegExp(patientListName));
    await expect(patientListPage.patientListHeader()).toHaveText(new RegExp(patientListDescription));
    await expect(patientListPage.patientListHeader()).toHaveText(/0 patients/);
    await homePage.logout();

    // replay
    await homePage.loginWithUserTwo();
    await patientListPage.navigateToPatientList();
    await patientListPage.navigateToMyList();
    await expect(page.getByText(/there are no user-defined patient lists to display/i)).toBeVisible();
    await patientListPage.allListsButton().click();
    await expect(page.getByText(patientListName)).not.toBeVisible();

    await cleanup(page);
}
