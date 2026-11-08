import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";

import TodosPage from "../../todos/page";

beforeEach(() => {
  localStorage.clear();
});

afterEach(cleanup);

function addTodo(text: string) {
  fireEvent.change(screen.getByRole("textbox"), { target: { value: text } });
  fireEvent.click(screen.getByRole("button", { name: "Add" }));
}

test("shows a text box and an Add button", () => {
  render(<TodosPage />);
  expect(screen.getByRole("textbox")).toBeDefined();
  expect(screen.getByRole("button", { name: "Add" })).toBeDefined();
});

test("adding a non-empty item shows it in the list", () => {
  render(<TodosPage />);
  addTodo("Buy milk");
  expect(screen.getByText("Buy milk")).toBeDefined();
});

test("adding with empty input adds nothing to the list", () => {
  render(<TodosPage />);
  addTodo("");
  expect(screen.queryByRole("listitem")).toBeNull();
  expect(screen.getByText("Nothing to do")).toBeDefined();
});

test("checking an item's checkbox marks it done with line-through", () => {
  render(<TodosPage />);
  addTodo("Walk the dog");
  const checkbox = screen.getByRole("checkbox", { name: "Walk the dog" });
  expect((checkbox as HTMLInputElement).checked).toBe(false);

  fireEvent.click(checkbox);

  expect(
    (screen.getByRole("checkbox", { name: "Walk the dog" }) as HTMLInputElement)
      .checked,
  ).toBe(true);
  expect(screen.getByText("Walk the dog").className).toContain("line-through");
});

test("clicking Delete removes that item", () => {
  render(<TodosPage />);
  addTodo("Buy milk");
  addTodo("Walk the dog");

  const [firstDelete] = screen.getAllByRole("button", { name: "Delete" });
  fireEvent.click(firstDelete);

  expect(screen.queryByText("Buy milk")).toBeNull();
  expect(screen.getByText("Walk the dog")).toBeDefined();
});

test("shows N left counting items not done", () => {
  render(<TodosPage />);
  expect(screen.getByText("0 left")).toBeDefined();

  addTodo("Buy milk");
  addTodo("Walk the dog");
  expect(screen.getByText("2 left")).toBeDefined();

  fireEvent.click(screen.getByRole("checkbox", { name: "Buy milk" }));
  expect(screen.getByText("1 left")).toBeDefined();
});

test("shows Nothing to do when there are no items", () => {
  render(<TodosPage />);
  expect(screen.getByText("Nothing to do")).toBeDefined();
});

test("items and their done state survive a reload", () => {
  const { unmount } = render(<TodosPage />);
  addTodo("Buy milk");
  fireEvent.click(screen.getByRole("checkbox", { name: "Buy milk" }));
  unmount();

  render(<TodosPage />);

  expect(screen.getByText("Buy milk")).toBeDefined();
  expect(
    (screen.getByRole("checkbox", { name: "Buy milk" }) as HTMLInputElement)
      .checked,
  ).toBe(true);
  expect(screen.getByText("0 left")).toBeDefined();
});
