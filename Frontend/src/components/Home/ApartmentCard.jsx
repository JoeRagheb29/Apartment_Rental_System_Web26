import { useNavigate } from "react-router-dom";

const ApartmentCard = ({ apartment }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card h-100 shadow-sm"
      onClick={() => navigate(`/apartments/${apartment._id}`)}
    >
      <img
        src={apartment.ApartmentPictures[0]}
        className="card-img-top"
        alt="apartment"
        style={{ height: "200px", objectFit: "cover" }}
      />

      <div className="card-body">
        <h5 className="text-primary">
          ${apartment.price} / month
        </h5>

        <h6>{apartment.title}</h6>

        <p>{apartment.location}</p>

        <p>
          {apartment.beds} | {apartment.baths} | {apartment.size}
        </p>
      </div>
    </div>
  );
};

export default ApartmentCard;