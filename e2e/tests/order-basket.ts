import {expect, Page} from '@playwright/test';
import {delay, HomePage} from '../utils/pages/home-page';
import {Keycloak} from '../utils/pages/keycloak';
import {VisitsPage} from '../utils/pages/visits-page';
import {ChartPage} from '../utils/pages/chart-page';
import {cleanup} from "./utils";

let homePage: HomePage;
let keycloak: Keycloak;
let visitsPage: VisitsPage;
let chartPage: ChartPage;

async function setup(page: Page) {
    homePage = new HomePage(page);
    keycloak = new Keycloak(page);
    visitsPage = new VisitsPage(page);
    chartPage = new ChartPage(page);

    await keycloak.open();
    await keycloak.navigateToUsers();
    await keycloak.addUserButton().click();
    await keycloak.createUser();
}

// Order basket should load all the orderables
export async function runOrderBasketLoadAllOrderablesTest(page: Page) {

    await page.setViewportSize({width: 1920, height: 1080});
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
    await chartPage.navigateToOrderBasket();

    // verify
    await expect(page.getByText(/Drug orders/)).toBeVisible();
    await expect(page.getByText(/Lab orders/)).toBeVisible();
    await expect(page.getByText(/Imaging orders/)).toBeVisible();

    await cleanup(page);
}
