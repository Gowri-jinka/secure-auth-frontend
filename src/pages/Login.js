import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // ✅ Place your handleLogin function here (inside the Login component)
  const handleLogin = (e) => {
    e.preventDefault();

    // Show success toast
    toast.success("Welcome Back!");

    // You can add your real login API call here...
    console.log("Logging in with:", email, password);
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <form className="auth-card" onSubmit={handleLogin}>
          <h2>Welcome Back!</h2>
          <p>Login to your account</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="toggle-pass"
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit">Login</button>

          <p className="switch-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
