import styles from './SkeletonLoader.module.css';
import SkeletonApartmentGrid from "./SkeletonCard";
import SkeletonHero from "./SkeletonHero";

const SkeletonLoader = () => (
  <div className={styles.container}>
    <SkeletonHero />
    <div style={{ padding: '50px 0' }}>
      <SkeletonApartmentGrid count={3} />
    </div>
  </div>
);

export default SkeletonLoader;