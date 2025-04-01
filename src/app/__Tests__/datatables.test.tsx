import { render, screen, fireEvent } from "@testing-library/react";
import DataTablePage from "../datatables/page";
import "@testing-library/jest-dom";

jest.mock("../components/navbar", () => () => <div data-testid="navbar">Navbar</div>);

describe("DataTablePage Component", () => {
  test("renders the DataTablePage correctly", () => {
    render(<DataTablePage />);
    expect(screen.getByText("Data Table")).toBeInTheDocument();
  });

  test("opens modal when Save is clicked with selected rows", () => {
    render(<DataTablePage />);
    
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]); // Selecting a row

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(screen.getByText("Selected Rows")).toBeInTheDocument();
  });

  test("fails when checking for a non-existent element", () => {
    render(<DataTablePage />);
    expect(screen.getByText("Non-Existent Element"))
      .toBeInTheDocument(); // This should fail
  });

  test("fails when clicking Add new without implementation", () => {
    render(<DataTablePage />);
    
    const addButton = screen.getByText("Add new");
    fireEvent.click(addButton);
    
    expect(screen.getByText("New row added"))
      .toBeInTheDocument(); // This should fail
  });
});
