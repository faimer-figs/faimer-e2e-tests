import {Page} from "@playwright/test";
import {Keycloak} from "../utils/pages/keycloak";

export async function cleanup(page: Page) {
    const keycloak = new Keycloak(page);
    await keycloak.deleteUser();
}