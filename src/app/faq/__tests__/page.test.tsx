import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import FaqPage from "../page";

afterEach(cleanup);

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

test("faq page shows its heading", () => {
  render(<FaqPage />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Frequently asked questions" }),
  ).toBeDefined();
});

test("faq page lists at least 4 questions with every answer hidden", () => {
  render(<FaqPage />);

  const buttons = screen.getAllByRole("button");
  expect(buttons.length).toBeGreaterThanOrEqual(4);

  for (const faq of faqs) {
    const button = screen.getByRole("button", { name: faq.question });
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText(faq.answer)).toBeNull();
  }
});

test("clicking a question reveals its answer and clicking again hides it", () => {
  render(<FaqPage />);

  const button = screen.getByRole("button", { name: faqs[0].question });

  fireEvent.click(button);
  expect(button.getAttribute("aria-expanded")).toBe("true");
  expect(screen.getByText(faqs[0].answer)).toBeDefined();

  fireEvent.click(button);
  expect(button.getAttribute("aria-expanded")).toBe("false");
  expect(screen.queryByText(faqs[0].answer)).toBeNull();
});
