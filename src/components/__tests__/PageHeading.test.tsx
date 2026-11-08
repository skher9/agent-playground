import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import PageHeading from "../PageHeading";

afterEach(cleanup);

test("renders a level-1 heading with the given text", () => {
  render(<PageHeading>Section title</PageHeading>);
  expect(
    screen.getByRole("heading", { level: 1, name: "Section title" }),
  ).toBeDefined();
});

test("uses the existing heading style", () => {
  render(<PageHeading>Section title</PageHeading>);
  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading.className).toContain("text-2xl");
  expect(heading.className).toContain("font-semibold");
});
