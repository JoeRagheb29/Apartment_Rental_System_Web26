import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return `${styles.navLink} ${
      location.pathname === path ? styles.active : ""
    }`;
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={getLinkClass("/")}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/apartments" className={getLinkClass("/apartments")}>
            Apartments
          </Link>
        </li>

        <li>
          <Link to="/login" className={getLinkClass("/login")}>
            Login
          </Link>
        </li>

        <li>
          <Link to="/register" className={getLinkClass("/register")}>
            Register
          </Link>
        </li>

        <li>
          <Link to="/dashboard" className={getLinkClass("/dashboard")}>
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/profile" className={getLinkClass("/profile")}>
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;