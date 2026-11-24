import { expect, test } from "@playwright/test";

// Shared by every test in this file: collect uncaught browser errors and expect none.
// New tests need no setup of their own.
let errors: string[];

test.beforeEach(({ page }) => {
  errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test("a URL that doesn't exist shows the heading Page not found", async ({ page }) => {
  await test.step("Open a URL that does not exist", async () => {
    await page.goto("/this-page-does-not-exist");
  });
  await test.step("See the Page not found heading", async () => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  });
});

test("a deeper URL that doesn't exist also shows the heading Page not found", async ({ page }) => {
  await test.step("Open a deep URL that does not exist", async () => {
    await page.goto("/blog/some/missing/article");
  });
  await test.step("See the Page not found heading", async () => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  });
});

test("the page-not-found page has a link back to the home page that works", async ({ page }) => {
  await test.step("Open a URL that does not exist", async () => {
    await page.goto("/this-page-does-not-exist");
  });
  await test.step('Click the "Go back home" link', async () => {
    await page.getByRole("link", { name: "Go back home" }).click();
  });
  await test.step("See the home page", async () => {
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hello from the starter app");
  });
});

test("the Go back home link points at the home page", async ({ page }) => {
  await test.step("Open a URL that does not exist", async () => {
    await page.goto("/this-page-does-not-exist");
  });
  await test.step('Look at the link named "Go back home"', async () => {
    await expect(page.getByRole("link", { name: "Go back home" })).toHaveAttribute("href", "/");
  });
});