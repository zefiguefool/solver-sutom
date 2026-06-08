import { test, expect } from "@playwright/test";

/* test("navigation entre jeux", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("nav-sutom").click();
  await expect(page).toHaveURL(/sutom/);

  await page.getByTestId("nav-tusmo").click();
  await expect(page).toHaveURL(/tusmo/);

  await page.getByTestId("nav-wordle").click();
  await expect(page).toHaveURL(/wordle/);
}); */

test("la lettre est affichée dans un a, async ({ page }) => {
  await page.goto("/solvami/wordle");

  await page.keyboard.press("A");
  await expect(page.locator('[data-testid="letter-input"]')).toContainText("a");
});
