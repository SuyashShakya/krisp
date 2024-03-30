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
    const length = e.target.value;
    setPasswordLength(Number(length));
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
        />
      </div>
      <div>
        <p>Generated Password:</p>
        <div className="p-4 border border-gray-300 break-all rounded-lg">
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
