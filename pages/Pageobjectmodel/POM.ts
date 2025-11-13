import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage"; // Ensure filename casing matches

type MyPomFixtures = {
  loginPage: LoginPage;
};

export const test = baseTest.extend<MyPomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});