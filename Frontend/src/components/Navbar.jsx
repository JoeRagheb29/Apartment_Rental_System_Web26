import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><Link to="/" className={styles.navLink}>Home</Link></li>
        <li><Link to="/apartments" className={styles.navLink}>Apartments</Link></li>
        <li><Link to="/login" className={styles.navLink}>Login</Link></li>
        <li><Link to="/register" className={styles.navLink}>Register</Link></li>
        <li><Link to="/dashboard" className={styles.navLink}>Dashboard</Link></li>
        <li><Link to="/profile" className={styles.navLink}>Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
