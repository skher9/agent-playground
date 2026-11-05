import { expect, test } from "@playwright/test";

test("about page loads with its heading and paragraph", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message)); // uncaught browser errors

  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About us");

  const paragraphs = page.locator("main p");
  await expect(paragraphs).toHaveCount(1);
  await expect(paragraphs.first()).not.toHaveText("");

  expect(errors).toEqual([]);
});

test("home page links to the about page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "About us" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About us");
});
