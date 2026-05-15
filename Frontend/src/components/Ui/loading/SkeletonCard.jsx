import styles from './SkeletonLoader.module.css';

const SkeletonCard = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.skeletonImage}></div>
    <div className={styles.skeletonContent}>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText} style={{ width: '80%' }}></div>
      <div className={styles.skeletonText} style={{ width: '60%' }}></div>
    </div>
  </div>
);

export default SkeletonCard;