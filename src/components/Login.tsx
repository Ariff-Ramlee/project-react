import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_USER } from "../graphql/mutations";
import "./Auth.css";
import { isValidEmail, isValidPassword } from "../utils/validation";

type LoginResponse = {
  login: string;
};

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loginUser, { loading }] = useMutation<LoginResponse>(LOGIN_USER);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMessage("");

  // Email validation
  if (!isValidEmail(email)) {
    setErrorMessage("Please enter a valid email address.");
    return;
  }

  // Password validation
  if (!isValidPassword(password)) {
    setErrorMessage("Password must be at least 6 characters long.");
    return;
  }

  try {
    const response = await loginUser({
      variables: { email, password },
    });

    if (response.data) {
      alert(response.data.login);
    }
  } catch (err: any) {
    setErrorMessage(err.message || "Login failed");
  }
};


  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Error message */}
        {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
