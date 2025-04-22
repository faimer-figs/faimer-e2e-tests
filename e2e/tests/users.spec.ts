import { test, expect } from '@playwright/test';
import { delay, HomePage } from '../utils/pages/home-page';
import { Keycloak } from '../utils/pages/keycloak';
import { VisitsPage } from '../utils/pages/visits-page';
import { patientName } from '../utils/pages/registration-page';

let homePage: HomePage;
let keycloak: Keycloak;
let visitsPage: VisitsPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  keycloak = new Keycloak(page);
  visitsPage = new VisitsPage(page);

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
  await homePage.searchPatient('DANIEL ACOSTA');
  await expect(page.getByText('1 search result')).toBeVisible();
  await page.getByRole('link', { name: `${patientName.firstName + ' ' + patientName.givenName}` }).first().click();
  await homePage.searchPatientId();
  const patientIdentifierForFirstSamplePatient = await page.locator('#demographics section p:nth-child(2)').textContent();
  await homePage.searchPatient('DEVAN MODI');
  await expect(page.getByText('1 search result')).toBeVisible();
  await page.getByRole('link', { name: `${patientName.firstName + ' ' + patientName.givenName}` }).first().click();
  await homePage.searchPatientId();
  const patientIdentifierForSecondSamplePatient = await page.locator('#demographics section p:nth-child(2)').textContent();
  await homePage.navigateToHomePage();
  await homePage.logout();

  // verify
  await homePage.loginWithSecondUser();
  await homePage.searchPatient('DANIEL ACOSTA');
  await expect(page.getByText('1 search result')).toBeVisible();
  await page.locator('[data-testid="patientSearchBar"]').fill('DEVAN MODI'), delay(3000);
  await expect(page.getByText('1 search result')).toBeVisible();
  await page.locator('[data-testid="patientSearchBar"]').clear(), delay(1000);
  await page.locator('[data-testid="patientSearchBar"]').fill(`${patientIdentifierForFirstSamplePatient}`), delay(3000);
  await expect(page.getByText(/sorry, no patient charts were found/i)).toBeVisible();
  await page.locator('[data-testid="patientSearchBar"]').clear(), delay(1000);
  await page.locator('[data-testid="patientSearchBar"]').fill(`${patientIdentifierForSecondSamplePatient}`), delay(3000);
  await expect(page.getByText(/sorry, no patient charts were found/i)).toBeVisible();
  await page.locator('[data-testid="patientSearchBar"]').clear();
  await homePage.logout();
});

test.afterEach(async ({}) => {
  await keycloak.deleteUser();
});
