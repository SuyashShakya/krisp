import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PasswordGenerator from "../PasswordGenerator";

describe("PasswordGenerator", () => {
  it("renders correctly", () => {
    render(<PasswordGenerator />);
    expect(screen.getByText("Password Generator")).toBeInTheDocument();
    expect(
      screen.getByText("Enter the length of the password")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter the Length of password")
    ).toBeInTheDocument();
    expect(screen.getByText("Generated Password:")).toBeInTheDocument();
    expect(screen.getByText("Generate New Password")).toBeInTheDocument();
  });

  it("generates password on button click", () => {
    render(<PasswordGenerator />);
    const generateButton = screen.getByText("Generate New Password");
    fireEvent.click(generateButton);
    const generatedPassword = screen.getByTestId("generated-password");
    expect(generatedPassword.textContent).not.toBe("");
  });

  it("updates password length on input change", () => {
    render(<PasswordGenerator />);
    const lengthInput = screen.getByPlaceholderText(
      "Enter the Length of password"
    ) as HTMLInputElement;
    fireEvent.change(lengthInput, { target: { value: "10" } });
    expect(lengthInput.value).toBe("10");
  });

  it("does not allow negative numbers", () => {
    render(<PasswordGenerator />);
    const lengthInput = screen.getByPlaceholderText(
      "Enter the Length of password"
    ) as HTMLInputElement;
    fireEvent.change(lengthInput, { target: { value: "-10" } });
    expect(lengthInput.value).toBe("8"); // Should revert to minimum value
  });

  it("limits input to range 8-128", () => {
    render(<PasswordGenerator />);
    const lengthInput = screen.getByPlaceholderText(
      "Enter the Length of password"
    ) as HTMLInputElement;
    fireEvent.change(lengthInput, { target: { value: "500" } });
    expect(lengthInput.value).toBe("128"); // Should revert to maximum value
  });

  it("prevents entering letter e", () => {
    render(<PasswordGenerator />);
    const lengthInput = screen.getByPlaceholderText(
      "Enter the Length of password"
    ) as HTMLInputElement;
    fireEvent.change(lengthInput, { target: { value: "e" } });
    expect(lengthInput.value).toBe("8"); // Should revert to minimum value
  });
});
