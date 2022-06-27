import {
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import TodoComponent, { ACTION, initialState, reducer } from "../TodoComponent";
import "@testing-library/jest-dom";
import { generateGuid } from "../utils";

describe.only("Todo", () => {
  test("Todo Component", () => {
    render(<TodoComponent />);
    expect(screen.getByText("Add todo:")).toBeInTheDocument();
  });

  test("should render the text input", () => {
    render(<TodoComponent />);
    expect(screen.getByTestId("todoInput")).toBeInTheDocument();
  });

  test("should render the add button", () => {
    render(<TodoComponent />);
    expect(screen.getByTestId("todoAddBtn")).toBeInTheDocument();
  });

  test("should add the todo", () => {
    render(<TodoComponent />);
    const addBtn = screen.getByTestId("todoAddBtn");
    const input = screen.getByTestId("todoInput");

    fireEvent.change(input, { target: { value: "sample todo 1" } });
    fireEvent.click(addBtn);

    const todos = screen.getAllByTestId("todo");
    expect(todos).toHaveLength(1);
  });

  test("should remove the todo", async () => {
    render(<TodoComponent />);
    const addBtn = screen.getByTestId("todoAddBtn");
    const input = screen.getByTestId("todoInput");

    fireEvent.change(input, { target: { value: "sample todo 1" } });
    fireEvent.click(addBtn);

    const todos = screen.queryAllByTestId("todo");
    expect(todos).toHaveLength(1);

    fireEvent.click(screen.getByText("Remove"));

    const updatedTodos = screen.queryAllByTestId("todo");
    expect(updatedTodos.length).toBe(0);
  });

  test("should not add todo if text is empty", () => {
    render(<TodoComponent />);
    const addBtn = screen.getByTestId("todoAddBtn");

    fireEvent.click(addBtn);

    const todos = screen.queryAllByTestId("todo");
    expect(todos).toHaveLength(0);
  });

  test("should mark todo as completed", () => {
    render(<TodoComponent />);
    const addBtn = screen.getByTestId("todoAddBtn");
    const input = screen.getByTestId("todoInput");

    fireEvent.change(input, { target: { value: "sample todo 1" } });
    fireEvent.click(addBtn);

    const todo = within(screen.queryAllByTestId("todo")[0]).queryByTestId(
      "todo-body"
    );
    fireEvent.click(todo);
    expect(todo).toHaveClass("strike");
  });

  test("reducer should return default state for invalid action type", () => {
    const action = {
      type: "INVALID",
    };
    const data = reducer(initialState, action);
    expect(data).toStrictEqual(initialState);
  });

  test("reducer should return all todos in case of invalid todo id for complete action", () => {
    const initialState = [
      {
        id: generateGuid(),
        is_completed: false,
        text: "sample todo 1",
      },
    ];
    const action = {
      id: generateGuid(),
      type: ACTION.COMPLETE,
    };
    const data = reducer(initialState, action);
    expect(data).toStrictEqual(initialState);
  });
});
