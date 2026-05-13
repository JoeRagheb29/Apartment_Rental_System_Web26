import styles from './SkeletonLoader.module.css';

const SkeletonList = ({ count = 5 }) => (
  <div className={styles.skeletonList}>
    {[...Array(count)].map((_, i) => (
      <div key={i} className={styles.skeletonListItem}>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
      </div>
    ))}
  </div>
);

export default SkeletonList;
