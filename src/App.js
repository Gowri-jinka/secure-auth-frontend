import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Navbar Component
function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navLeft}>🔒 SecureAuth</div>
      <div style={styles.navRight}>
        <Link to="/login" style={styles.navBtn}>
          Login
        </Link>
        <Link to="/register" style={styles.navBtn}>
          Register
        </Link>
      </div>
    </nav>
  );
}

// ✅ Login Page
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      email === storedUser.email &&
      password === storedUser.password
    ) {
      toast.success("Welcome Back!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.authContainer}>
        <form style={styles.authCard} onSubmit={handleLogin}>
          <h2>Welcome Back!</h2>
          <p>Login to your account</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              style={styles.togglePass}
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
          <p style={styles.switchLink}>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
}

// ✅ Register Page
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      toast.error("Passwords do not match!");
      return;
    }

    const userData = { email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    toast.success("Registered Successfully!");
  };

  return (
    <>
      <Navbar />
      <div style={styles.authContainer}>
        <form style={styles.authCard} onSubmit={handleRegister}>
          <h2>Join Us!</h2>
          <p>Create your account</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPass}
              required
              onChange={(e) => setConfirmPass(e.target.value)}
              style={styles.input}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              style={styles.togglePass}
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>
          <button type="submit" style={styles.button}>
            Register
          </button>
          <p style={styles.switchLink}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}

// ✅ Dashboard Page
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.info("Logged out!");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <>
      <Navbar />
      <div style={styles.authContainer}>
        <div style={styles.authCard}>
          <h2>Welcome {user?.email || "Guest"}!</h2>
          <p>You have successfully logged in.</p>
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

// ✅ Main App with Routes
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}

export default App;

// ✅ Inline CSS Styles
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    backgroundColor: "#1e1e2f",
    color: "white",
  },
  navLeft: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navRight: {
    display: "flex",
    gap: "1rem",
  },
  navBtn: {
    textDecoration: "none",
    color: "white",
    backgroundColor: "#00d1b2",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
  },
  authContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  authCard: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#1e1e2f",
    color: "white",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  switchLink: {
    marginTop: "1rem",
  },
  togglePass: {
    position: "absolute",
    right: "12px",
    top: "35%",
    cursor: "pointer",
  },
};
