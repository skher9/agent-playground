import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import About from "../page";

afterEach(cleanup);

test("about page shows the heading", () => {
  render(<About />);
  expect(
    screen.getByRole("heading", { level: 1, name: "About us" }),
  ).toBeDefined();
});

test("about page shows a single paragraph about the team below the heading", () => {
  const { container } = render(<About />);

  const paragraphs = container.querySelectorAll("p");
  expect(paragraphs.length).toBe(1);

  const paragraph = paragraphs[0];
  expect(paragraph.textContent).toBeTruthy();
  expect(paragraph.textContent).toMatch(/team/i);

  const heading = screen.getByRole("heading", { level: 1, name: "About us" });
  expect(
    heading.compareDocumentPosition(paragraph) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
});
