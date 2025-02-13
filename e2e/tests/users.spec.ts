import { test, expect } from '@playwright/test';
import { delay, HomePage } from '../utils/pages/home-page';
import { patientName, RegistrationPage } from '../utils/pages/registration-page';
import { firstUser, Keycloak, secondUser } from '../utils/pages/keycloak';

let homePage: HomePage;
let keycloak: Keycloak;
let registrationPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  keycloak = new Keycloak(page);
  registrationPage = new RegistrationPage(page);

  await keycloak.login();
});

test('User creation and data filtering', async ({ page }) => {
  // setup
  await keycloak.navigateToUsers();
  await keycloak.addUserButton().click();
  await keycloak.createFirstUser();
  await keycloak.navigateToCredentials();
  await keycloak.createUserPassword();
  await keycloak.navigateToRoles();
  await keycloak.assignRoleToUser();
  await page.getByLabel('Breadcrumb').getByRole('link', { name: /users/i }).click();
  await keycloak.addUserButton().click();
  await keycloak.createSecondUser();
  await keycloak.navigateToCredentials();
  await keycloak.createUserPassword();
  await keycloak.navigateToRoles();
  await keycloak.assignRoleToUser();

  // replay
  await homePage.navigateToLoginPage();
  await homePage.loginWithFirstUser();
  // search for a patient, start a visit and record vitals

  // verify
  await homePage.loginWithSecondUser();
  // search for the same patient, verify that recorded obs by first user can't be visible to the second user

});

test.afterEach(async ({}) => {
  // end patient visit
  await keycloak.deleteUser();
});
