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

test("about page shows a paragraph of text below the heading", () => {
  const { container } = render(<About />);
  const heading = screen.getByRole("heading", { level: 1, name: "About us" });
  const paragraph = container.querySelector("p");

  expect(paragraph).not.toBeNull();
  expect(paragraph?.textContent?.trim().length).toBeGreaterThan(0);
  expect(
    heading.compareDocumentPosition(paragraph as Node) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
});
