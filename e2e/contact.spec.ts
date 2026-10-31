import { expect, test } from "@playwright/test";

test("home links to /contact", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/");
  await page.getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  expect(errors).toEqual([]);
});

test("contact page shows the form with name, email and message fields", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/contact");
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("submitting empty email shows validation error and keeps the form", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/contact");
  await page.getByLabel("Name").fill("Ada");
  await page.getByLabel("Message").fill("Hello");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Please enter a valid email")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
  expect(errors).toEqual([]);
});

test("submitting an invalid email shows validation error and keeps the form", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/contact");
  await page.getByLabel("Name").fill("Ada");
  await page.getByLabel("Email").fill("not-an-email");
  await page.getByLabel("Message").fill("Hello");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Please enter a valid email")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
  expect(errors).toEqual([]);
});

test("submitting with a valid email replaces the form with thank-you", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/contact");
  await page.getByLabel("Name").fill("Ada");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByLabel("Message").fill("Hello");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Thanks, we'll be in touch")).toBeVisible();
  await expect(page.getByLabel("Name")).toHaveCount(0);
  await expect(page.getByLabel("Email")).toHaveCount(0);
  await expect(page.getByLabel("Message")).toHaveCount(0);
  expect(errors).toEqual([]);
});
