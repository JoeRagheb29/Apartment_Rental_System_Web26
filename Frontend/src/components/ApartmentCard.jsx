import styles from './ApartmentCard.module.css';

const ApartmentCard = ({ apartment }) => {
  return (
    <div className={styles.apartmentCard}>
      <h3>{apartment.name}</h3>
      <p>{apartment.price}</p>
    </div>
  );
};

export default ApartmentCard;
