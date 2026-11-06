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

const faqs = [
  {
    question: "What is this app?",
    answer: "This is a small Next.js starter app you can build on.",
  },
  {
    question: "How do I report a problem?",
    answer: "Send an email describing what you expected and what happened instead.",
  },
  {
    question: "How do I request a feature?",
    answer: "Email us your idea and we will consider adding it to the roadmap.",
  },
  {
    question: "How do I get in touch?",
    answer: "Use the contact email listed on our site and we will reply as soon as we can.",
  },
];

test("faq page lists at least 4 questions with every answer hidden until clicked", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/faq");
  await expect(page.getByRole("button")).toHaveCount(4);

  for (const { question, answer } of faqs) {
    await expect(page.getByRole("button", { name: question })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    // the answer is not on screen before the click
    await expect(page.getByText(answer)).toHaveCount(0);
  }

  // clicking a question reveals its answer
  await page.getByRole("button", { name: faqs[1].question }).click();
  await expect(page.getByText(faqs[1].answer)).toBeVisible();

  expect(errors).toEqual([]);
});

test("clicking an open question hides its answer again", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/faq");
  const question = page.getByRole("button", { name: faqs[0].question });

  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(faqs[0].answer)).toBeVisible();

  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByText(faqs[0].answer)).toHaveCount(0);

  expect(errors).toEqual([]);
});

test("home page links to the faq page", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/");
  await page.getByRole("link", { name: "Frequently asked questions" }).click();
  await expect(page).toHaveURL("/faq");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Frequently asked questions",
  );

  expect(errors).toEqual([]);
});
