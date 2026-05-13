import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Company Info */}
          <div className={styles.companyInfo}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>🏠</span>
              <span className={styles.logoText}>ApartmentHub</span>
            </div>
            <p className={styles.description}>
              Find your perfect apartment with ease. Explore hundreds of listings across Egypt.
            </p>
          </div>

          {/* Links Section 1 */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Property Finder</h3>
            <ul className={styles.linksList}>
              <li>
                <a href="#" className={styles.link}>
                  About us
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Links Section 2 */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Real estate professionals</h3>
            <ul className={styles.linksList}>
              <li>
                <a href="#" className={styles.link}>
                  Agent Hub
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  PF Expert
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Advertise Property
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Footer */}
        <div className={styles.bottomFooter}>
          {/* Links */}
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>
              Terms & Conditions
            </a>
            <span className={styles.separator}>|</span>
            <a href="#" className={styles.footerLink}>
              Privacy Policy
            </a>
            <span className={styles.separator}>|</span>
            <a href="#" className={styles.footerLink}>
              Cookies Policy
            </a>
            <span className={styles.separator}>|</span>
            <a href="#" className={styles.footerLink}>
              Sitemap
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p className={styles.copyrightText}>
            &copy; 2026 ApartmentHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;