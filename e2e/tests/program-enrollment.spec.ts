import { test, expect } from '@playwright/test';
import { HomePage } from '../utils/pages/home-page';
import { VisitsPage } from '../utils/pages/visits-page';
import { patientName, RegistrationPage } from '../utils/pages/registration-page';
import { ProgramsPage } from '../utils/pages/program-page';

let homePage: HomePage;
let visitsPage: VisitsPage;
let registrationPage: RegistrationPage;
let programsPage: ProgramsPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  visitsPage = new VisitsPage(page);
  registrationPage = new RegistrationPage(page);
  programsPage = new ProgramsPage(page);

  await homePage.login();
  await registrationPage.navigateToRegistrationForm();
  await registrationPage.createPatient();
});

test('Add a program enrollment', async ({ page }) => {
  // setup
  const headerRow = programsPage.programsTable().locator('thead > tr');
  const dataRow = programsPage.programsTable().locator('tbody > tr');

  // replay
  await programsPage.navigateToProgramsPage();
  await programsPage.addPatientProgramEnrollment();

  // verify
  await homePage.searchPatient(`${patientName.firstName + ' ' + patientName.givenName}`);
  await programsPage.navigateToProgramsPage();
  await expect(headerRow).toContainText(/active programs/i);
  await expect(headerRow).toContainText(/location/i);
  await expect(headerRow).toContainText(/date enrolled/i);
  await expect(headerRow).toContainText(/status/i);
  await expect(dataRow).toContainText(/hiv care and treatment/i);
  await expect(dataRow).toContainText(/outpatient clinic/i);
});

test('Edit a program enrollment', async ({ page }) => {
  // setup
  const headerRow = programsPage.programsTable().locator('thead > tr');
  const dataRow = programsPage.programsTable().locator('tbody > tr');
  await programsPage.navigateToProgramsPage();
  await programsPage.addPatientProgramEnrollment();
  await homePage.searchPatient(`${patientName.firstName + ' ' + patientName.givenName}`);
  await programsPage.navigateToProgramsPage();
  await expect(headerRow).toContainText(/active programs/i);
  await expect(headerRow).toContainText(/location/i);
  await expect(headerRow).toContainText(/date enrolled/i);
  await expect(headerRow).toContainText(/status/i);
  await expect(dataRow).toContainText(/hiv care and treatment/i);
  await expect(dataRow).toContainText(/outpatient clinic/i);
  await expect(dataRow).toContainText(/15-Aug-2024/i);

  // replay
  await programsPage.updatePatientProgramEnrollment();

  // verify
  await homePage.searchPatient(`${patientName.firstName + ' ' + patientName.givenName}`);
  await programsPage.navigateToProgramsPage();
  await expect(dataRow).toContainText(/hiv care and treatment/i);
  await expect(dataRow).not.toContainText(/outpatient clinic/i);
  await expect(dataRow).toContainText(/inpatient ward/i);
});

test.afterEach(async ({}) => {
  await homePage.voidPatient();
});
