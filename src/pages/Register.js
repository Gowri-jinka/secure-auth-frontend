import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Auth.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering with:", email, password);
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <form className="auth-card" onSubmit={handleRegister}>
          <h2>Join Us!</h2>
          <p>Create your account</p>
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
          <button type="submit">Register</button>
          <p className="switch-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
