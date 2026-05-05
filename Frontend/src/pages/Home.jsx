import { useNavigate } from "react-router-dom";
import ApartmentCard from "../components/ApartmentCard";
import img1 from "../assets/apt1.jpeg";
import img2 from "../assets/apt2.jpeg";
import img3 from "../assets/apt3.jpeg";

const featuredApartments = [
  {
    id: 1,
    title: "Modern Apartment in New Cairo",
    price: 12000,
    location: "New Cairo",
    beds: 3,
    baths: 2,
    size: 150,
    image: img1,
  },
  {
    id: 2,
    title: "Luxury Flat in Zamalek",
    price: 20000,
    location: "Zamalek",
    beds: 4,
    baths: 3,
    size: 220,
    image: img2,
  },
  {
    id: 3,
    title: "Cozy Studio in Maadi",
    price: 8000,
    location: "Maadi",
    beds: 1,
    baths: 1,
    size: 80,
    image: img3,
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="d-flex align-items-center justify-content-center text-center text-white"
        style={{
          height: "60vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <div>
          <h1 className="fw-bold">Find Your Dream Apartment</h1>
          <p className="lead">Discover the best apartments for rent in Egypt</p>

          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={() => navigate("/apartments")}
          >
            Browse Apartments
          </button>
        </div>
      </div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Featured Apartments</h2>

        <div className="row g-4">
          {featuredApartments.map((apt) => (
            <div key={apt.id} className="col-md-4">
              <ApartmentCard apartment={apt} />
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4">Why Choose Us?</h2>

        <div className="row text-center">
          <div className="col-md-4">
            <h5>🏡 Wide Variety</h5>
            <p>Choose from hundreds of apartments across Egypt</p>
          </div>

          <div className="col-md-4">
            <h5>💰 Best Prices</h5>
            <p>Affordable options for every budget</p>
          </div>

          <div className="col-md-4">
            <h5>⚡ Easy Booking</h5>
            <p>Quick and simple process to find your home</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
