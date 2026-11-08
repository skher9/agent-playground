import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/todos");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("opening /todos shows a text box and an Add button", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await expect(page.getByRole("textbox")).toBeVisible();
  await expect(page.getByRole("button", { name: "Add" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("entering a non-empty item and clicking Add shows that item", async ({ page }) => {
  await page.getByRole("textbox").fill("Buy milk");
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("Buy milk")).toBeVisible();
});

test("clicking Add with empty input adds nothing", async ({ page }) => {
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByRole("listitem")).toHaveCount(0);
  await expect(page.getByText("Nothing to do")).toBeVisible();
});

test("checking a checkbox marks the item done with line-through", async ({ page }) => {
  await page.getByRole("textbox").fill("Walk the dog");
  await page.getByRole("button", { name: "Add" }).click();

  const checkbox = page.getByRole("checkbox", { name: "Walk the dog" });
  await checkbox.check();

  await expect(checkbox).toBeChecked();
  await expect(page.getByText("Walk the dog")).toHaveCSS(
    "text-decoration-line",
    "line-through",
  );
});

test("clicking Delete removes the item", async ({ page }) => {
  await page.getByRole("textbox").fill("Buy milk");
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("Buy milk")).toBeVisible();

  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText("Buy milk")).toBeHidden();
});

test("shows N left counting items not done", async ({ page }) => {
  await expect(page.getByText("0 left")).toBeVisible();

  await page.getByRole("textbox").fill("Buy milk");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("textbox").fill("Walk the dog");
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("2 left")).toBeVisible();

  await page.getByRole("checkbox", { name: "Buy milk" }).check();
  await expect(page.getByText("1 left")).toBeVisible();
});

test("with no items the page shows Nothing to do", async ({ page }) => {
  await expect(page.getByText("Nothing to do")).toBeVisible();
});

test("after reloading, items and their done state are still shown", async ({ page }) => {
  await page.getByRole("textbox").fill("Buy milk");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("checkbox", { name: "Buy milk" }).check();
  await expect(page.getByText("0 left")).toBeVisible();

  await page.reload();

  await expect(page.getByText("Buy milk")).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "Buy milk" })).toBeChecked();
  await expect(page.getByText("0 left")).toBeVisible();
});
