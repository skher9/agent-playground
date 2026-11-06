import { expect, test } from "@playwright/test";

test("faq page shows its heading", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/faq");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Frequently asked questions",
  );
  expect(errors).toEqual([]);
});

test("faq page lists 4 questions with every answer hidden", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/faq");
  await expect(page.getByRole("button")).toHaveCount(4);

  const buttons = page.getByRole("button");
  const answers = [
    "This is a small Next.js starter app you can build on.",
    "Send an email describing what you expected and what happened instead.",
    "Email us your idea and we will consider adding it to the roadmap.",
    "Use the contact email listed on our site and we will reply as soon as we can.",
  ];

  for (const answer of answers) {
    await expect(page.getByText(answer)).toBeHidden();
  }
  for (let i = 0; i < (await buttons.count()); i += 1) {
    await expect(buttons.nth(i)).toHaveAttribute("aria-expanded", "false");
  }

  expect(errors).toEqual([]);
});

test("clicking an open question hides its answer again", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/faq");
  const question = page.getByRole("button", { name: "What is this app?" });
  const answer = page.getByText("This is a small Next.js starter app you can build on.");

  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(answer).toBeVisible();

  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await expect(answer).toBeHidden();

  expect(errors).toEqual([]);
});

test("home page links to the faq page", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/");
  await page.getByRole("link", { name: "Frequently asked questions" }).click();
  await expect(page).toHaveURL("/faq");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  expect(errors).toEqual([]);
});
