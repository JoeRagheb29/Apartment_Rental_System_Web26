import { useParams, useNavigate } from "react-router-dom"; // ضيفنا useNavigate
import styles from './ApartmentDetails.module.css';
import { useEffect, useState } from "react";
import axios from "axios";

const ApartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState({});
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("fadeIn");
  
  useEffect(() => {
    const Axios = axios.create({
      baseURL: "http://localhost:5000/",
      timeout: 5000,
    });

    const fetchData = async () => {
      try {
        const response = await Axios.get(`/api/apartments/${id}`);
        const apartment = response.data;
        console.log("apartment", apartment);
        setApartment(apartment);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
      
    };
    fetchData();
  }, [id]);


  const handleRentNow = () => {
    // هنا بنشيك هل فيه Token في الـ localStorage (معناه إنه عامل Login)
    const isAuthenticated = localStorage.getItem("userToken"); 

    if (isAuthenticated) 
    {
      alert("Proceeding to rent apartment: " + id);
    } else {
      alert("Please login first to rent this property!");
      navigate("/login"); 
    }
  };

  const handlePrevImage = () => {
    if (apartment.ApartmentPictures && apartment.ApartmentPictures.length > 0) {
      setSlideDirection("slideInRight");
      setMainImageIndex((prev) => (prev === 0 ? apartment.ApartmentPictures.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (apartment.ApartmentPictures && apartment.ApartmentPictures.length > 0) {
      setSlideDirection("slideInLeft");
      setMainImageIndex((prev) => (prev === apartment.ApartmentPictures.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.bentoGrid}>
        
        {/* Main Image Card with Navigation */}
        <div className={`${styles.gridItem} ${styles.mainImgCard}`}>
          {apartment.ApartmentPictures && apartment.ApartmentPictures.length > 0 ? (
            <>
              <img 
                key={mainImageIndex}
                src={apartment.ApartmentPictures[mainImageIndex]} 
                alt={`Apartment ${mainImageIndex}`}
                className={styles.mainImg}
                style={{ animation: `${slideDirection} 0.6s ease-in-out` }}
              />
              {apartment.ApartmentPictures.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className={`${styles.imgNavBtn} ${styles.imgNavBtnPrev}`}
                  >
                    ❮
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className={`${styles.imgNavBtn} ${styles.imgNavBtnNext}`}
                  >
                    ❯
                  </button>
                  <span className={styles.imgCounter}>
                    {mainImageIndex + 1} / {apartment.ApartmentPictures.length}
                  </span>
                </>
              )}
              <span className={styles.locationTag}>📍 {apartment.location}</span>
            </>
          ) : (
            <p className={styles.noImagesMsg}>No images available</p>
          )}
        </div>

        {/* City and Price Card */}
        <div className={`${styles.gridItem} ${styles.priceCard}`}>
          <p className={`${styles.label} ${styles.cityLabel}`}>City</p>
          <h3 className={styles.cityTitle}>
            {apartment.City}
          </h3>
          <p className={`${styles.label} ${styles.cityLabel}`}>Monthly Rent</p>
          <h2 className={styles.priceNumber}>
            {apartment.price} <small className={styles.currency}>EGP</small>
          </h2>
        </div>

        {/* Secondary Image or Info Card */}
        <div className={`${styles.gridItem} ${styles.subImgCard}`}>
          {apartment.ApartmentPictures && apartment.ApartmentPictures.length > 1 && (
            <img 
              src={apartment.ApartmentPictures[1]} 
              alt="Secondary view"
              className={styles.mainImg}
            />
          )}
        </div>

        {/* Property Specs Card */}
        <div className={`${styles.gridItem} ${styles.specsCard}`}>
          <div className={styles.specMini}><span>🛏️</span> {apartment.NumberOfRooms} Bedrooms</div>
          <div className={styles.specMini}><span>📏</span> {apartment.Area} m² Area</div>
          <div className={styles.specMini}><span>🌅</span> {apartment.View}</div>
        </div>

        {/* Rent Now Button */}
        <div className={styles.gridItem}>
          <button className={styles.rentBtn} onClick={handleRentNow}>
            Rent Now
          </button>
        </div>

        {/* Description Card */}
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