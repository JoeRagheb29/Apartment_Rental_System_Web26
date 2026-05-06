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
          <li><Link to="/dashboard" className={getLinkClass("/dashboard")}>
              Dashboard
            </Link></li>
        </ul>

        <div className={styles.navActions}>
          <Link to="/profile" className={getLinkClass("/profile")}>
            <div className={styles.profileIcon}>👤</div>
          </Link>
          <div className={styles.authButtons}>
            <Link to="/login" className={styles.loginBtn}>Login</Link>
            <Link to="/register" className={styles.registerBtn}>Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;