import { expect, test } from "@playwright/test";

// Shared by every test in this file: collect uncaught browser errors and expect none.
// New tests need no setup of their own.
let errors: string[];

test.beforeEach(async ({ page }) => {
  errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  await page.goto("/this-page-does-not-exist");
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test("a URL that doesn't exist shows the page-not-found heading", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
});

test("the page-not-found page links back to the home page", async ({ page }) => {
  await page.getByRole("link", { name: "Go back home" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hello from the starter app");
});
