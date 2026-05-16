import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ApartmentCard = ({ apartment }) => {
  const navigate = useNavigate();
  const isRented = apartment.tenant ? true : false;
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageError = () => {
    // محاولة الصورة التالية عند فشل التحميل
    if (apartment.ApartmentPictures && imageIndex < apartment.ApartmentPictures.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  const getDisplayImage = () => {
    if (!apartment.ApartmentPictures || apartment.ApartmentPictures.length === 0) {
      return null;
    }
    return apartment.ApartmentPictures[imageIndex];
  };

  return (
    <div
      className="card h-100 shadow-sm"
      onClick={() => navigate(`/apartments/${apartment._id}`)}
      style={{ position: 'relative', opacity: isRented ? 0.85 : 1 }}
    >
      {isRented && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#ef4444',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          zIndex: 10
        }}>
          RENTED
        </div>
      )}

      {getDisplayImage() ? (
        <img
          src={getDisplayImage()}
          className="card-img-top"
          alt="apartment"
          style={{ height: "200px", objectFit: "cover" }}
          onError={handleImageError}
        />
      ) : (
        <div
          className="card-img-top"
          style={{
            height: "200px",
            backgroundColor: '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999'
          }}
        >
          📷 No Images Available
        </div>
      )}

      <div className="card-body">
        <h5 className="text-primary">
          ${apartment.price} / month
        </h5>

        <h6>{apartment.Title}</h6>

        <p>📍 {apartment.City} - {apartment.location}</p>

        <p>
          🛏️ {apartment.NumberOfRooms} | 📏 {apartment.Area}m² | 🌅 {apartment.View}
        </p>

        {/* Owner Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <img
            src={apartment.owner?.ProfilePicture || 'https://api.dicebear.com/9.x/adventurer/svg?seed=Emery'}
            alt={apartment.owner?.name}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold' }}>
              {apartment.owner?.name}
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>
              Owner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;