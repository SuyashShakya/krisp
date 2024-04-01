import React, { useState } from "react";

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [password, setPassword] = useState<string>("");

  const generatePassword = (): string => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    return newPassword;
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let length = Number(e.target.value);
    if (isNaN(length) || length < 8) {
      length = 8;
    } else if (length > 128) {
      length = 128;
    }
    length = Math.floor(length); // Ensure length is an integer

    // Check for the letter 'e'
    const containsE = e.target.value.includes("e");
    if (containsE) {
      length = passwordLength; // Keep the previous valid length
    }

    setPasswordLength(length);
  };

  return (
    <div className="flex flex-col gap-8">
      <p className="text-3xl font-medium">Password Generator</p>
      <div>
        <p>Enter the length of the password</p>
        <input
          className="outline outline-1 outline-gray-300 rounded-lg"
          type="number"
          placeholder="Enter the Length of password"
          value={passwordLength}
          onChange={handleSearchInputChange}
          min={8}
          max={128}
        />
      </div>
      <div>
        <p>Generated Password:</p>
        <div
          className="p-4 border border-gray-300 break-all rounded-lg"
          data-testid="generated-password"
        >
          {password}
        </div>
      </div>
      <button
        className="p-2 w-fit bg-slate-500 text-white rounded-lg"
        onClick={handleGeneratePassword}
      >
        Generate New Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
