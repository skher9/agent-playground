import { expect, test } from "@playwright/test";

test("every page shows a footer with the copyright text", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message)); // uncaught browser errors

  await page.goto("/");
  await expect(page.getByRole("contentinfo")).toContainText(
    "© 2026 Agent Playground",
  );
  expect(errors).toEqual([]);
});

test("the footer has a Home link that goes to /", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/");
  const homeLink = page.getByRole("contentinfo").getByRole("link", {
    name: "Home",
  });
  await expect(homeLink).toBeVisible();
  // The app has a single route, so clicking from "/" could never change the URL.
  // Assert the navigation target instead of clicking.
  await expect(homeLink).toHaveAttribute("href", "/");
  expect(errors).toEqual([]);
});

test("the footer comes from the shared layout, so it is there without per-page work", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/");
  // The footer is rendered by the root layout, outside of the page content.
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(
    page.getByRole("contentinfo").getByRole("link", { name: "Home" }),
  ).toHaveAttribute("href", "/");
  expect(errors).toEqual([]);
});
