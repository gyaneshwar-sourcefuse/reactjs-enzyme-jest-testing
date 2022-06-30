import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FORM_VALIDATIONS } from "../constants";
import FormComponent from "../FormComponent";

describe.only("Form component", () => {
  test(`should display error - ${FORM_VALIDATIONS.NAME_REQUIRED}`, () => {
    render(<FormComponent />);
    
    userEvent.type(screen.getByTestId("name"), "");
    
    userEvent.click(screen.getByTestId("submit"))
    
    expect(screen.getByTestId("name-error").textContent).toEqual(FORM_VALIDATIONS.NAME_REQUIRED)
  });
});
