import { useParams, useNavigate } from "react-router-dom";
import styles from './ApartmentDetails.module.css';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import toast from "react-hot-toast";

const ApartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState({});
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("fadeIn");
  const { isLoggedIn, user } = useContext(AuthContext);
  
  const API = axios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 10000
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`apartments/${id}`);
        const apartment = response.data;
        console.log("apartment", apartment);
        setApartment(apartment);
      } catch (error) {
        console.error("Error fetching apartments:", error);
        toast.error("Failed to load apartment details");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleRentNow = async () => {
    if (!isLoggedIn) {
      toast.error("You need to be logged in to rent an apartment.");
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };

      const response = await API.post(`apartments/${id}/rent`, {}, config);
      if (response.status === 200) {
        toast.success("🎉 Apartment rented successfully!");
        setApartment(response.data);
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      }
    } catch (error) {
      console.error('Error renting apartment:', error);
      if (error.response?.status === 400) {
        toast.error(error.response.data.message || "This apartment is already rented");
      } else {
        toast.error('Failed to rent apartment');
      }
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
          <p className={`${styles.label} ${styles.cityLabel}`}>Title</p>
          <h3 className={styles.cityTitle}>
            {apartment.Title}
          </h3>
          <p className={`${styles.label} ${styles.cityLabel}`} style={{ marginTop: '1rem' }}>Monthly Rent</p>
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
          <div className={styles.specMini}><span>🏙️</span> {apartment.City}</div>
          <div className={styles.specMini}><span>🛏️</span> {apartment.NumberOfRooms} Bedrooms</div>
          <div className={styles.specMini}><span>📏</span> {apartment.Area} m²</div>
          <div className={styles.specMini}><span>🌅</span> {apartment.View}</div>
        </div>

        {/* Rent Now Button */}
        <div className={styles.gridItem}>
          <button 
            className={styles.rentBtn} 
            onClick={handleRentNow}
            disabled={apartment.tenant || !isLoggedIn || (user?.role === 'owner')}
            style={{
              opacity: (apartment.tenant || !isLoggedIn || (user?.role === 'owner')) ? 0.6 : 1,
              cursor: (apartment.tenant || !isLoggedIn || (user?.role === 'owner')) ? 'not-allowed' : 'pointer'
            }}
          >
            {apartment.tenant ? '❌ Already Rented' : isLoggedIn && user?.role === 'owner' ? '🚫 Owners Cannot Rent' : 'Rent Now'}
          </button>
        </div>

        {/* Description Card */}
        <div className={`${styles.gridItem} ${styles.descCard}`}>
          <h4 className={styles.sectionTitle}>Property Highlights</h4>
          <p className={styles.descriptionText}>{apartment.description}</p>
          <button className={styles.bookBtn}>Contact Agent</button>
        </div>

        {/* Additional Details Card */}
        <div className={`${styles.gridItem} ${styles.descCard}`}>
          <h4 className={styles.sectionTitle}>Additional Details</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Floor Number</p>
              <p>{apartment.floorNumber}</p>
            </div>
            <div>
              <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Total Floors</p>
              <p>{apartment.totalFloors}</p>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Pet Friendly</p>
            <p>{apartment.petFriendly ? '✅ Yes' : '❌ No'}</p>
          </div>
          {apartment.amenities && apartment.amenities.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Amenities</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {apartment.amenities.map((amenity, idx) => (
                  <span key={idx} style={{
                    backgroundColor: '#e0e7ff',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem'
                  }}>
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Owner Info Card */}
        <div className={`${styles.gridItem} ${styles.descCard}`}>
          <h4 className={styles.sectionTitle}>Property Owner</h4>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px'
          }}>
            <img
              src={apartment.owner?.ProfilePicture || 'https://api.dicebear.com/9.x/adventurer/svg?seed=Emery'}
              alt={apartment.owner?.name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
                {apartment.owner?.name}
              </p>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
                📧 {apartment.owner?.email}
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#999' }}>
                Property Owner
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ApartmentDetails;