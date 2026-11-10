import { expect, test } from "@playwright/test";

test("home page loads with its heading", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message)); // uncaught browser errors

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hello from the starter app");
  expect(errors).toEqual([]);
});

test("every page shows a 'Dark mode' button in the top right", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("button", { name: "Dark mode" });
  await expect(button).toBeVisible();
  const box = await button.boundingBox();
  const viewport = page.viewportSize();
  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  // Top right corner: closer to the right edge than the left, and above the middle.
  expect(box!.x + box!.width / 2).toBeGreaterThan(viewport!.width / 2);
  expect(box!.y + box!.height / 2).toBeLessThan(viewport!.height / 2);
});

test("clicking adds the 'dark' class to html and the button reads 'Light mode'", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Dark mode" }).click();

  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.getByRole("button", { name: "Light mode" })).toBeVisible();
});

test("clicking again removes the 'dark' class and the button reads 'Dark mode'", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Dark mode" }).click();
  await page.getByRole("button", { name: "Light mode" }).click();

  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await expect(page.getByRole("button", { name: "Dark mode" })).toBeVisible();
});

test("dark mode survives a page reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Dark mode" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.reload();

  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.getByRole("button", { name: "Light mode" })).toBeVisible();
});
