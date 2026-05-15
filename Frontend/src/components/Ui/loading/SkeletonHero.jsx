import styles from './SkeletonLoader.module.css';

const SkeletonHero = () => (
  <div className={styles.skeletonHero}>
    <div className={styles.skeletonImage}></div>
  </div>
);

export default SkeletonHero;