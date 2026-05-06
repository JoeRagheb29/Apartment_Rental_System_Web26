import React from 'react';
import { useParams } from "react-router-dom";
import styles from './ApartmentDetails.module.css';

const ApartmentDetails = () => {
  const { id } = useParams();

  // البيانات التي تظهر في الصفحة
  const apartment = {
    price: "15,000",
    location: "Maadi, Cairo",
    description: "This apartment is located in a prime area, featuring a modern design and high-end finishes. Perfect for families looking for comfort and accessibility.",
    specs: { beds: 3, baths: 2, area: 120 },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6"
    ]
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainCard}>
        
        {/* قسم الصور: حيز صغير ومنظم */}
        <div className={styles.imageSection}>
          <img src={apartment.images[0]} alt="Main" className={styles.mainImg} />
          <div className={styles.thumbGrid}>
            <img src={apartment.images[1]} alt="Interior 1" />
            <img src={apartment.images[2]} alt="Interior 2" />
          </div>
        </div>

        
        <div className={styles.detailsSection}>
          <span className={styles.locationTag}>📍 {apartment.location}</span>
          
          <h1 className={styles.priceDisplay}>
            {apartment.price} <span className={styles.unit}>EGP / Month</span>
          </h1>

          <div className={styles.statsRow}>
            <div className={styles.statItem}>🛏️ {apartment.specs.beds} Beds</div>
            <div className={styles.statItem}>🚿 {apartment.specs.baths} Baths</div>
            <div className={styles.statItem}>📏 {apartment.specs.area} m²</div>
          </div>

          <div className={styles.descriptionBox}>
            <h4>Why this property?</h4>
            <p>{apartment.description}</p>
            <ul className={styles.featureList}>
              <li>✨ High-end Finishing</li>
              <li>✨ Prime Location</li>
              <li>✨ Fully Equipped Kitchen</li>
            </ul>
          </div>

          <button className={styles.contactBtn}>Contact Agent</button>
        </div>

      </div>
    </div>
  );
};

export default ApartmentDetails;