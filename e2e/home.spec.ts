import { expect, test } from "@playwright/test";

test("home page loads with its heading", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message)); // uncaught browser errors

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Welcome to Agent Playground");
  await expect(page.getByText("Hello from the starter app")).toHaveCount(0);
  expect(errors).toEqual([]);
});
