import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import Home from "../page";

afterEach(cleanup);

test("home page shows the heading", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Hello from the starter app" }),
  ).toBeDefined();
});

test("home page links to the about page", () => {
  render(<Home />);
  const link = screen.getByRole("link", { name: "About us" });
  expect(link).toBeDefined();
  expect(link.getAttribute("href")).toBe("/about");
});
