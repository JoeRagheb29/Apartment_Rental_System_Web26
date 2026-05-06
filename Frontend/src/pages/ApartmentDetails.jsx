import { useParams, useNavigate } from "react-router-dom"; // ضيفنا useNavigate
import styles from './ApartmentDetails.module.css';
import { useEffect, useState } from "react";
import axios from "axios";

const ApartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState({});
  
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

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.bentoGrid}>
        
        <div className={`${styles.gridItem} ${styles.mainImgCard}`}>
         {apartment.ApartmentPictures  ? 
          apartment.ApartmentPictures.map((picture, index) => (
           <img key={index} src={picture} alt={`Apartment ${index}`} />
         )) : (
           <p>No images available</p>
         )}
        </div>

        <div className={`${styles.gridItem} ${styles.priceCard}`}>
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

        <div className={`${styles.gridItem} ${styles.specsCard}`}>
          <div className={styles.specMini}><span>🛏️</span> {apartment.NumberOfRooms} Bedrooms</div>
          <div className={styles.specMini}><span>�</span> {apartment.Area} m² Area</div>
          <div className={styles.specMini}><span>🌅</span> {apartment.View}</div>
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


//api_scema = tenant	null
// _id	"69fb521d464eeeb7e9482ee1"
// City	"Red Sea"
// NumberOfRooms	4
// Area	160
// View	"Sea View"
// ApartmentPictures	[…]
// description	"A spacious luxury apartment with panoramic sea views, minutes from the beach and Red sea's vibrant city center."
// price	4200
// location	"Barceloneta, Red Sea"
// __v	0


// const apartment = {
//   price: "15,000",
//   location: "Maadi, Cairo",
//   description: "This apartment is located in a prime area, featuring a modern design and high-end finishes. Perfect for families looking for comfort and accessibility.",
//   specs: { beds: 3, baths: 2, area: 120 },
//   images: [
//     "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
//     "https://images.unsplash.com/photo-1484154218962-a197022b5858",
//     "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6"
//   ]
// };