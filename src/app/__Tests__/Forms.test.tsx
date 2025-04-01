import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../redux/slices/formSlices";
import RegisterForm from "../Forms/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockRouter = { push: jest.fn() };
(useRouter as jest.Mock).mockReturnValue(mockRouter);

const renderWithProvider = (ui: React.ReactElement, { preloadedState = {} } = {}) => {
  const store = configureStore({ reducer: { form: formReducer }, preloadedState });
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("RegisterForm Component", () => {
  test("renders form fields correctly", () => {
    renderWithProvider(<RegisterForm />);
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("Select gender")).toBeInTheDocument();
    expect(screen.getByText("Select relationship status")).toBeInTheDocument();
  });

  test("validates required fields and shows error messages", () => {
    renderWithProvider(<RegisterForm />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(screen.getByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
  });

  test("submits the form when valid and navigates to the dashboard", () => {
    renderWithProvider(<RegisterForm />);

    fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john.doe@example.com" } });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
  });

  test("disables input fields when form is read-only", () => {
    renderWithProvider(<RegisterForm />, { preloadedState: { form: { isReadOnly: true } } });

    expect(screen.getByLabelText("First Name")).toBeDisabled();
    expect(screen.getByLabelText("Last Name")).toBeDisabled();
    expect(screen.getByLabelText("Email")).toBeDisabled();
  });


  test('reducers', () => {
    let state;
    state = reducers(undefined, {});
    expect(state).toEqual({form:{firstName:'',lastName:'',gender:'',relationship:'',fileName:'',isReadOnly:false,email:''}});
  });

  
  test("displays pre-filled data when form is in read-only mode", () => {
    renderWithProvider(<RegisterForm />, {
      preloadedState: {
        form: {
          isReadOnly: true,
          firstName: "Alice",
          lastName: "Smith",
          email: "alice@example.com",
        },
      },
    });

    expect(screen.getByDisplayValue("Alice")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Smith")).toBeInTheDocument();
    expect(screen.getByDisplayValue("alice@example.com")).toBeInTheDocument();
  });

  test("allows selecting gender from dropdown", () => {
    renderWithProvider(<RegisterForm />);

    fireEvent.click(screen.getByText("Select gender"));
    fireEvent.click(screen.getByText("Male"));

    expect(screen.getByText("Male")).toBeInTheDocument();
  });

  test("allows selecting relationship status from dropdown", () => {
    renderWithProvider(<RegisterForm />);

    fireEvent.click(screen.getByText("Select relationship status"));
    fireEvent.click(screen.getByText("Married"));

    expect(screen.getByText("Married")).toBeInTheDocument();
  });

  test("handles theme toggle correctly", () => {
    renderWithProvider(<RegisterForm />);

    const toggleThemeButton = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(toggleThemeButton);

    expect(document.body).toHaveStyle("background-color: #ffffff");
  });
});

function reducers(undefined: undefined, arg1: {}): any {
  throw new Error("Function not implemented.");
}
