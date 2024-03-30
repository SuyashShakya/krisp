import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PasswordGenerator from "../PasswordGenerator";

describe("PasswordGenerator component", () => {
  test("renders correctly", () => {
    render(<PasswordGenerator />);

    expect(screen.getByText("Password Generator")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter the Length of password")
    ).toBeInTheDocument();
    expect(screen.getByText("Generated Password:")).toBeInTheDocument();
    expect(screen.getByText("Generate New Password")).toBeInTheDocument();
  });

  test("generates password with correct length", () => {
    render(<PasswordGenerator />);

    const lengthInput = screen.getByPlaceholderText(
      "Enter the Length of password"
    );
    fireEvent.change(lengthInput, { target: { value: "10" } });

    const generateButton = screen.getByText("Generate New Password");
    fireEvent.click(generateButton);

    // Check if generated password matches regex for length 10
    const generatedPassword = screen.getByText(/[a-zA-Z0-9!@#$%^&*]{10}/);
    expect(generatedPassword).toBeInTheDocument();
  });

  test("updates password length on input change", () => {
    render(<PasswordGenerator />);

    const lengthInput = screen.getByPlaceholderText(
      "Enter the Length of password"
    ) as HTMLInputElement;
    fireEvent.change(lengthInput, { target: { value: "15" } });

    expect(lengthInput.value).toBe("15");
  });
});
