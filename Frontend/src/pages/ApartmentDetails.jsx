import styles from './ApartmentDetails.module.css';
import { useParams } from "react-router-dom";

const ApartmentDetails = () => {
  const { id } = useParams();
  return (
    <div className="container mt-4">
      <h2>Apartment Details</h2>
      <p>Apartment ID: {id}</p>
    </div>
  );
};

export default ApartmentDetails;