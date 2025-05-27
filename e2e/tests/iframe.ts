import {expect, Page} from '@playwright/test';
import {HomePage} from '../utils/pages/home-page';
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

// Render server in an iframe after login, with all core features available
export async function runRenderIframeTest(page: Page) {

    await setup(page);

    // setup
    await homePage.navigateToLoginPage();
    await homePage.loginWithUser();
    await expect(page.locator("//a[text()='Wards']")).toBeVisible();
    await expect(page.locator("//a[text()='Patient lists']")).toBeVisible();
    await expect(page.locator("//a[text()='Laboratory']")).toBeVisible();
    await expect(page.locator("//a[text()='Service queues']")).toBeVisible();
    await expect(page.getByText(/active visits/i).nth(0)).toBeVisible();
    await expect(page.getByRole('button', {name: 'my account'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'app menu'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'add patient'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'search patient'})).toBeVisible();

    // replay
    await page.goto(`${process.env.IFRAME_URL_DEV}`);

    // verify
    const iframe = await page.frameLocator('//iframe');
    await expect(iframe.locator("//a[text()='Wards']")).toBeVisible();
    await expect(iframe.locator("//a[text()='Patient lists']")).toBeVisible();
    await expect(iframe.locator("//a[text()='Laboratory']")).toBeVisible();
    await expect(iframe.locator("//a[text()='Service queues']")).toBeVisible();
    await expect(iframe.getByRole('button', {name: 'my account'})).toBeVisible();
    await expect(iframe.getByRole('button', {name: 'app menu'})).toBeVisible();
    await expect(iframe.getByRole('button', {name: 'add patient'})).toBeVisible();
    await expect(iframe.getByRole('button', {name: 'search patient'})).toBeVisible();
    await iframe.locator('[data-testid="searchPatientIcon"]').click();
    await iframe.locator('[data-testid="patientSearchBar"]').fill('Leon Wagner');
    await expect(iframe.getByText('1 search result')).toBeVisible();
    await iframe.locator('[data-testid="floatingSearchResultsContainer"]').locator(`text=Leon Wagner`).click();
    await expect(iframe.locator('header[aria-label="patient banner"]').getByText(`Leon Wagner`)).toBeVisible();
    await expect(iframe.locator('header[aria-label="patient banner"]').getByText(/7 days/i)).toBeVisible();
    await expect(iframe.locator('header[aria-label="patient banner"]').getByText(/male/i)).toBeVisible();

    await cleanup(page);
}
