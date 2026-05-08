import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  const getLinkClass = (path) => {
    return `${styles.navLink} ${
      location.pathname === path ? styles.active : ""
    }`;
  };

  const onLogout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🏠</span>
          <span className={styles.logoText}>ApartmentHub</span>
        </Link>

        <ul className={styles.navList}>
          <li><Link to="/" className={getLinkClass("/")}>
              Home
            </Link></li>
          <li><Link to="/apartments" className={getLinkClass("/apartments")}>
              Apartments
            </Link></li>
          {isLoggedIn && (
            <li><Link to="/dashboard" className={getLinkClass("/dashboard")}>
              Dashboard
            </Link></li>
          )}
        </ul>

        <div className={styles.navActions}>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className={getLinkClass("/profile")}>
                <div className={styles.profileIcon}>👤</div>
              </Link>
              <button className={styles.logoutBtn} onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginBtn}>Login</Link>
              <Link to="/register" className={styles.registerBtn}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;