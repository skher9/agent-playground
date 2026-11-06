import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import NotFound from "../not-found";

afterEach(cleanup);

test("not-found page shows the heading", () => {
  render(<NotFound />);
  expect(screen.getByRole("heading", { level: 1, name: "Page not found" })).toBeDefined();
});

test("not-found page links back to the home page", () => {
  render(<NotFound />);
  expect(screen.getByRole("link", { name: "Back to home" }).getAttribute("href")).toBe("/");
});
