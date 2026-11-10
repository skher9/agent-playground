import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";

import DarkModeToggle from "../DarkModeToggle";

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});

afterEach(cleanup);

test("shows a 'Dark mode' button when the site is in light mode", () => {
  render(<DarkModeToggle />);
  expect(screen.getByRole("button", { name: "Dark mode" })).toBeDefined();
});

test("clicking adds the dark class to the html element and shows 'Light mode'", () => {
  render(<DarkModeToggle />);
  fireEvent.click(screen.getByRole("button", { name: "Dark mode" }));

  expect(document.documentElement.classList.contains("dark")).toBe(true);
  expect(screen.getByRole("button", { name: "Light mode" })).toBeDefined();
});

test("clicking again removes the dark class and shows 'Dark mode'", () => {
  render(<DarkModeToggle />);
  const button = screen.getByRole("button", { name: "Dark mode" });

  fireEvent.click(button);
  fireEvent.click(screen.getByRole("button", { name: "Light mode" }));

  expect(document.documentElement.classList.contains("dark")).toBe(false);
  expect(screen.getByRole("button", { name: "Dark mode" })).toBeDefined();
});

test("remembers dark mode in localStorage so it survives a reload", () => {
  render(<DarkModeToggle />);
  fireEvent.click(screen.getByRole("button", { name: "Dark mode" }));

  expect(localStorage.getItem("theme")).toBe("dark");

  // Simulate a reload: fresh DOM, state restored from storage.
  cleanup();
  document.documentElement.classList.remove("dark");
  render(<DarkModeToggle />);

  expect(document.documentElement.classList.contains("dark")).toBe(true);
  expect(screen.getByRole("button", { name: "Light mode" })).toBeDefined();
});
