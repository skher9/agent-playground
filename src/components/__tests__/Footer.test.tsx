import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import Footer from "../Footer";

afterEach(cleanup);

test("footer shows the copyright line", () => {
  render(<Footer />);
  expect(screen.getByText("© 2026 Agent Playground").textContent).toBe("© 2026 Agent Playground");
});

test("footer links Home to the root route", () => {
  render(<Footer />);
  expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/");
});
