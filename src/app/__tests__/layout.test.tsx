import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import RootLayout from "../layout";

afterEach(cleanup);

test("page content rendered through the root layout also shows the footer", () => {
  render(
    <RootLayout params={Promise.resolve({})}>
      <p>child page</p>
    </RootLayout>,
  );

  expect(screen.getByText("child page")).toBeDefined();
  expect(screen.getByRole("contentinfo").textContent).toContain(
    "© 2026 Agent Playground",
  );
  expect(
    screen.getByRole("link", { name: "Home" }).getAttribute("href"),
  ).toBe("/");
});
