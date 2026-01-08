import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_USER } from "../graphql/mutations";
import { isValidEmail, isValidPassword } from "../utils/validation";
import "./Auth.css";

type Props = {
  onOpenRegister: () => void;
};

type LoginResponse = {
  login: string;
};

const Login: React.FC<Props> = ({ onOpenRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loginUser, { loading }] =
    useMutation<LoginResponse>(LOGIN_USER);

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
      const res = await loginUser({
        variables: { email, password },
      });

      if (res.data) {
        alert(res.data.login);
      }
    } catch {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="window-bar">
        <span />
        <span />
        <span />
      </div>

      <div className="auth-container">
        <h1>Login</h1>

        <p className="subtitle">
          New here?{" "}
          <span onClick={onOpenRegister}>Create an account</span>
        </p>

        <form onSubmit={handleSubmit}>
          <label>EMAIL</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hello@reallygreatsite.com"
          />

          <label>PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
          />

          <button type="submit" disabled={loading}>
            LOGIN
          </button>

          {errorMessage && (
            <p className="error-text">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
