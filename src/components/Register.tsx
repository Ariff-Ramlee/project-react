import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { REGISTER_USER } from "../graphql/mutations";
import { isValidEmail, isValidPassword } from "../utils/validation";
import "./Auth.css";

type Props = {
  onBackToLogin: () => void;
};

type RegisterResponse = {
  register: {
    unique_id: string;
    name: string;
    email: string;
  };
};

const Register: React.FC<Props> = ({ onBackToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [registerUser, { loading }] =
    useMutation<RegisterResponse>(REGISTER_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isValidEmail(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    if (!isValidPassword(password)) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      await registerUser({
        variables: { name, email, password },
      });

      alert("Registration successful");
      onBackToLogin(); // ✅ CLOSE MODAL
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      <h1>Create New Account</h1>

      <p className="subtitle">
        Already Registered?{" "}
        <span onClick={onBackToLogin}>Login</span>
      </p>

      <form onSubmit={handleSubmit}>
        <label>NAME</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>EMAIL</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>PASSWORD</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          SIGN UP
        </button>

        {errorMessage && (
          <p className="error-text">{errorMessage}</p>
        )}
      </form>
    </>
  );
};

export default Register;
