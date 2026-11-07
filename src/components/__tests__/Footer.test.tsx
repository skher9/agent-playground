import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import Footer from "../Footer";

afterEach(cleanup);

test("footer shows the copyright text", () => {
  render(<Footer />);

  expect(screen.getByRole("contentinfo").textContent).toContain(
    "© 2026 Agent Playground",
  );
});

test("footer has a Home link pointing to the home page", () => {
  render(<Footer />);

  expect(
    screen.getByRole("link", { name: "Home" }).getAttribute("href"),
  ).toBe("/");
});
