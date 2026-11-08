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

test("home page renders its heading with the shared PageHeading style", () => {
  render(<Home />);
  const heading = screen.getByRole("heading", {
    level: 1,
    name: "Hello from the starter app",
  });
  expect(heading.className).toContain("text-2xl");
  expect(heading.className).toContain("font-semibold");
});
