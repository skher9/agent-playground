import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import Home from "../page";

afterEach(cleanup);

test("home page shows the heading", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Welcome to Agent Playground" }),
  ).toBeDefined();
});

test("home page no longer shows the old heading", () => {
  render(<Home />);
  expect(screen.queryByText("Hello from the starter app")).toBeNull();
});
