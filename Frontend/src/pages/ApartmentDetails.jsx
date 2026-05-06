import React from 'react';
import { useParams, useNavigate } from "react-router-dom"; // ضيفنا useNavigate
import styles from './ApartmentDetails.module.css';

const ApartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // عشان نعرف نحول المستخدم لصفحة تانية

  // داتا الشقة
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

  // فنكشن التعامل مع زرار الإيجار
  const handleRentNow = () => {
    // هنا بنشيك هل فيه Token في الـ localStorage (معناه إنه عامل Login)
    const isAuthenticated = localStorage.getItem("userToken"); 

    if (isAuthenticated) {
      // لو عامل Login، كملي إجراءات الحجز (ممكن تفتحي Modal أو توديه لصفحة دفع)
      alert("Proceeding to rent apartment: " + id);
    } else {
      // لو مش عامل، وديه لصفحة الـ Login
      alert("Please login first to rent this property!");
      navigate("/login"); 
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.bentoGrid}>
        
        <div className={`${styles.gridItem} ${styles.mainImgCard}`}>
          <img src={apartment.images[0]} alt="Main" />
          <div className={styles.imgOverlay}>
            <span className={styles.locationTag}>📍 {apartment.location}</span>
          </div>
        </div>

        <div className={`${styles.gridItem} ${styles.priceCard}`}>
          <p className={styles.label}>Monthly Rent</p>
          <h2 className={styles.priceNumber}>
            {apartment.price} <small className={styles.currency}>EGP</small>
          </h2>
        </div>

        <div className={`${styles.gridItem} ${styles.subImgCard}`}>
          <img src={apartment.images[1]} alt="Interior" />
        </div>

        <div className={`${styles.gridItem} ${styles.specsCard}`}>
          <div className={styles.specMini}><span>🛏️</span> {apartment.specs.beds} Bedrooms</div>
          <div className={styles.specMini}><span>🚿</span> {apartment.specs.baths} Bathrooms</div>
          <div className={styles.specMini}><span>📏</span> {apartment.specs.area} m² Area</div>
        </div>

        <div className={styles.gridItem}>
            <button className={styles.rentBtn} onClick={handleRentNow}>
                Rent Now
            </button>
        </div>

        <div className={`${styles.gridItem} ${styles.descCard}`}>
          <h4 className={styles.sectionTitle}>Property Highlights</h4>
          <p className={styles.descriptionText}>{apartment.description}</p>
          <button className={styles.bookBtn}>Contact Agent</button>
        </div>

      </div>
    </div>
  );
};

export default ApartmentDetails;