import styles from './LoadingScreen.module.css';

const LoadingScreen = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.logoWrapper}>
          <span className={styles.logoIcon}>🏠</span>
        </div>
        <div className={styles.loaderWrapper}>
          <div className={styles.spinner}></div>
        </div>
        <h2 className={styles.loadingText}>ApartmentHub</h2>
        <p className={styles.loadingSubtext}>Loading your apartments...</p>
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
