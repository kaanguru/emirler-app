import { test, expect } from "@playwright/test";

test("Visit the homepage and check the title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Kuran'daki Emirler ve Yasaklar");
  await expect(page.getByTestId("emir-card")).toBeVisible();
  await expect(page.getByTestId("emir-text")).toBeVisible();
  await expect(page.getByTestId("sure-text")).toBeVisible();
});
