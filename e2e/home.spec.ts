import { expect, test } from "@playwright/test";

test("home page loads with its heading", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message)); // uncaught browser errors

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hello from the starter app");
  expect(errors).toEqual([]);
});

test("Like button counts clicks and resets on reload", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message)); // uncaught browser errors

  await page.goto("/");

  const button = page.getByRole("button");
  await expect(button).toHaveText("Like (0)");

  await button.click();
  await button.click();
  await expect(button).toHaveText("Like (2)");

  await page.reload();
  await expect(button).toHaveText("Like (0)");
  expect(errors).toEqual([]);
});
