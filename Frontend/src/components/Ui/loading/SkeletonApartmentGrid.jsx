import styles from './SkeletonLoader.module.css';
import SkeletonCard from './SkeletonCard';

const SkeletonApartmentGrid = ({ count = 3 }) => (
  <div className={styles.skeletonGrid}>
    {[...Array(count)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonApartmentGrid;



