import { expect, test } from "@playwright/test";

test("unknown URL shows the page-not-found heading", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message)); // uncaught browser errors

  await page.goto("/this-page-does-not-exist");
  await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("page-not-found links back to the home page", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message)); // uncaught browser errors

  await page.goto("/this-page-does-not-exist");
  const homeLink = page.getByRole("link", { name: "Back to home" });
  await expect(homeLink).toBeVisible();
  await homeLink.click();
  await expect(page).toHaveURL("/");
  expect(errors).toEqual([]);
});
