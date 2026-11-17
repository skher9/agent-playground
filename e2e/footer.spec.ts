import { expect, test } from "@playwright/test";

let errors: string[] = [];

test.beforeEach(async ({ page }) => {
  errors = [];
  page.on("pageerror", (err) => errors.push(err.message)); // uncaught browser errors
});

test("every page shows the footer copyright", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("© 2026 Agent Playground")).toBeVisible();
  expect(errors).toEqual([]);
});

test("the footer Home link goes to the root route", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL("/");
  expect(errors).toEqual([]);
});

test("a page with no footer code still gets the footer from the layout", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByText("© 2026 Agent Playground")).toBeVisible();
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  expect(errors).toEqual([]);
});
