import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import Home from "../page";

afterEach(cleanup);

test("home page shows a Like button starting at zero", () => {
  render(<Home />);
  expect(screen.getByRole("button").textContent).toBe("Like (0)");
});

test("Like button counts clicks", () => {
  render(<Home />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  fireEvent.click(button);
  expect(button.textContent).toBe("Like (2)");
});
