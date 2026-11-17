import { expect, test } from "@playwright/test";

let errors: string[] = [];

test.beforeEach(async ({ page }) => {
  errors = [];
  page.on("pageerror", (err) => errors.push(err.message)); // uncaught browser errors
});

const HOME_HEADING = "Hello from the starter app";

test("Home page shows the footer with the copyright line", async ({ page }) => {
  await test.step("Open the home page /", async () => {
    await page.goto("/");
  });

  await test.step("Look at the bottom of the page for a footer", async () => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer.getByText("© 2026 Agent Playground")).toBeVisible();
  });

  expect(errors).toEqual([]);
});

test("Footer Home link points at the site root", async ({ page }) => {
  await test.step("Open the home page /", async () => {
    await page.goto("/");
  });

  await test.step("Check where the Home link in the footer goes", async () => {
    await expect(page.locator("footer").getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  expect(errors).toEqual([]);
});

test("Clicking the footer Home link from an unknown page lands on the home page", async ({
  page,
}) => {
  await test.step("Open an unknown URL /no-such-page", async () => {
    await page.goto("/no-such-page");
  });

  await test.step("Click the Home link in the footer", async () => {
    await page.locator("footer").getByRole("link", { name: "Home" }).click();
  });

  await test.step("The browser is on the home page", async () => {
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(HOME_HEADING);
  });

  expect(errors).toEqual([]);
});

test("Clicking the footer Home link twice keeps the user on the home page", async ({ page }) => {
  await test.step("Open the home page /", async () => {
    await page.goto("/");
  });

  await test.step("Click the Home link in the footer", async () => {
    await page.locator("footer").getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL("/");
  });

  await test.step("Click the Home link in the footer again", async () => {
    await page.locator("footer").getByRole("link", { name: "Home" }).click();
  });

  await test.step("The home page heading is still shown", async () => {
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(HOME_HEADING);
  });

  expect(errors).toEqual([]);
});

test("A page with no footer code of its own still shows the footer", async ({ page }) => {
  await test.step("Open a URL that has no page of its own, /no-such-page", async () => {
    await page.goto("/no-such-page");
  });

  await test.step("Look for the footer at the bottom of the rendered page", async () => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer.getByText("© 2026 Agent Playground")).toBeVisible();
    await expect(footer.getByRole("link", { name: "Home" })).toBeVisible();
  });

  expect(errors).toEqual([]);
});
