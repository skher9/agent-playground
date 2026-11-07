import { expect, test } from "@playwright/test";

test("about page shows the About us heading", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message)); // uncaught browser errors

  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1, name: "About us" })).toBeVisible();

  expect(errors).toEqual([]);
});

test("about page shows one paragraph about the team below the heading", async ({ page }) => {
  await page.goto("/about");

  const heading = page.getByRole("heading", { level: 1, name: "About us" });
  const paragraphs = page.locator("main p");
  await expect(paragraphs).toHaveCount(1);

  const paragraph = paragraphs.first();
  await expect(paragraph).toBeVisible();
  await expect(paragraph).toContainText(/team/i);

  const headingBox = await heading.boundingBox();
  const paragraphBox = await paragraph.boundingBox();
  expect(headingBox).not.toBeNull();
  expect(paragraphBox).not.toBeNull();
  // The paragraph is rendered underneath the heading, not above or beside it.
  expect(paragraphBox!.y).toBeGreaterThan(headingBox!.y + headingBox!.height);
});

test("home page links to the about page and opens it", async ({ page }) => {
  await page.goto("/");

  const link = page.getByRole("link", { name: "About us" });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "/about");

  await link.click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1, name: "About us" })).toBeVisible();
});
