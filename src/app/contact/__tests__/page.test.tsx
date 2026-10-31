import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import Contact from "../page";

afterEach(() => {
  cleanup();
});

test("contact page shows the form with name, email and message fields", () => {
  render(<Contact />);
  expect(screen.getByLabelText("Name")).toBeDefined();
  expect(screen.getByLabelText("Email")).toBeDefined();
  expect(screen.getByLabelText("Message")).toBeDefined();
  expect(screen.getByRole("button", { name: "Submit" })).toBeDefined();
});

test("submitting an empty email shows validation error and keeps the form", () => {
  render(<Contact />);
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
  fireEvent.submit(screen.getByRole("button", { name: "Submit" }).closest("form")!);
  expect(screen.getByText("Please enter a valid email")).toBeDefined();
  expect(screen.getByLabelText("Email")).toBeDefined();
  expect(screen.getByLabelText("Name")).toBeDefined();
  expect(screen.getByLabelText("Message")).toBeDefined();
});

test("submitting an invalid email shows validation error and keeps the form", () => {
  render(<Contact />);
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "not-an-email" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
  fireEvent.submit(screen.getByRole("button", { name: "Submit" }).closest("form")!);
  expect(screen.getByText("Please enter a valid email")).toBeDefined();
  expect(screen.getByLabelText("Email")).toBeDefined();
  expect(screen.getByLabelText("Name")).toBeDefined();
  expect(screen.getByLabelText("Message")).toBeDefined();
});

test("submitting with a valid email replaces the form with the thank-you message", () => {
  render(<Contact />);
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ada@example.com" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
  fireEvent.submit(screen.getByRole("button", { name: "Submit" }).closest("form")!);
  expect(screen.getByText("Thanks, we'll be in touch")).toBeDefined();
  expect(screen.queryByLabelText("Name")).toBeNull();
  expect(screen.queryByLabelText("Email")).toBeNull();
  expect(screen.queryByLabelText("Message")).toBeNull();
});
