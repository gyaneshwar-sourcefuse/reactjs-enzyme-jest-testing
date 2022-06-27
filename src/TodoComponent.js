import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  Row,
} from "react-bootstrap";
import "./style.css";
import { generateGuid } from "./utils";

export const initialState = [];
export const ACTION = {
  ADD: "ADD",
  COMPLETE: "COMPLETE",
  REMOVE: "REMOVE",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.ADD:
      return [action.todo, ...state];

    case ACTION.COMPLETE:
      return state.map((todo) => {
        if (action.id === todo.id) {
          return { ...todo, is_completed: !todo.is_completed };
        } else {
          return todo;
        }
      });

    case ACTION.REMOVE:
      return state.filter((todo) => todo.id !== action.id);

    default:
      return state;
  }
};

export default function TodoComponent() {
  const [todos, dispatch] = React.useReducer(reducer, initialState);
  const [text, setText] = React.useState("");

  const add = () => {
    if (!text) {
        return;
    }
    dispatch({
      type: ACTION.ADD,
      todo: {
        text: text,
        is_completed: false,
        id: generateGuid(),
      },
    });
    setText("");
  };

  const completed = (id) => {
    dispatch({
      type: ACTION.COMPLETE,
      id: id,
    });
  };

  const remove = (id) => {
    dispatch({
      type: ACTION.REMOVE,
      id: id,
    });
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col lg={12}>
          <h4>Add todo:</h4>
        </Col>
        <Col lg={10}>
          <FormControl
            type="text"
            onChange={(e) => setText(e.target.value)}
            id="todoInput"
            data-testid="todoInput"
            value={text}
          />
        </Col>
        <Col lg={2}>
          <Button onClick={add} id="todoAddBtn" className="w-100" data-testid="todoAddBtn">
            Add
          </Button>
        </Col>
        <Col lg={12}>
          <h4 className="mt-4">Todos:</h4>
        </Col>
        <Col lg={12}>
          {todos?.map?.((todo) => {
            return (
              <Card key={todo.id} className="todo-wrapper mb-3" data-testid="todo">
                <Card.Body
                  onClick={() => completed(todo.id)}
                  className={todo.is_completed ? "strike todo" : "todo"}
                  data-testid="todo-body"
                >
                  {todo.text}
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                  <Button
                    onClick={() => remove(todo.id)}
                    className="remove"
                    size="sm"
                    variant="danger"
                  >
                    Remove
                  </Button>
                </Card.Footer>
              </Card>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}
