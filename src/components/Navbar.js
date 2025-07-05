import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">MyAuthApp</div>
      <div className="nav-right">
        <Link to="/login" className="nav-btn">Login</Link>
        <Link to="/register" className="nav-btn">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
