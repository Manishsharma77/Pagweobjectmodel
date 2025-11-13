import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Loginpage";
import * as fs from "fs";
import * as path from "path";

test.describe("Login functionality", () => {
  test("should login successfully with valid credentials", async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);

    // Step 1: Open the application
    await loginPage.openApplication();

    // Step 2: Perform login
    await loginPage.login("standard_user", "secret_sauce");

    // Step 3: Assert successful login by checking URL or page element
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".inventory_list")).toBeVisible();

    // ✅ Save screenshot to ../pages folder
    const screenshotPath = path.join(__dirname, "../pages", `login-success-${Date.now()}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`🖼️ Screenshot saved at: ${screenshotPath}`);

    // ✅ Log and copy video to ../pages folder
    const video = page.video();
    if (video) {
      const videoPath = await video.path();
      const targetPath = path.join(__dirname, "../pages", `login-test-${Date.now()}.webm`);

      fs.copyFile(videoPath, targetPath, (err) => {
        if (err) {
          console.error("❌ Failed to copy video:", err);
        } else {
          console.log(`✅ Test video copied to: ${targetPath}`);
        }
      });
    } else {
      console.log("⚠️ Video recording is not enabled in the Playwright config.");
    }
  });
});