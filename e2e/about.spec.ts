import { expect, test } from "@playwright/test";

test("about page loads with its heading", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message)); // uncaught browser errors

  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About us");
  expect(errors).toEqual([]);
});

test("about page shows a paragraph below the heading", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/about");
  const paragraph = page.locator("p");
  await expect(paragraph).toHaveCount(1);
  expect((await paragraph.textContent())?.trim().length).toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test("home page links to the about page", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/");
  await page.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL("/about");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About us");
  expect(errors).toEqual([]);
});
