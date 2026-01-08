import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { REGISTER_USER } from "../graphql/mutations";
import "./Auth.css";
import { isValidEmail, isValidPassword } from "../utils/validation";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMessage("");

  if (!isValidEmail(email)) {
    setErrorMessage("Please enter a valid email address.");
    return;
  }

  if (!isValidPassword(password)) {
    setErrorMessage("Password must be at least 6 characters long.");
    return;
  }

  try {
    await registerUser({
      variables: { name, email, password },
    });

    alert("Registration successful");
    setName("");
    setEmail("");
    setPassword("");
  } catch (err: any) {
    setErrorMessage(err.message || "Registration failed");
  }
};


  return (
    <div className="auth-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {errorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {errorMessage}
  </p>
)}

      </form>
    </div>
  );
};

export default Register;
