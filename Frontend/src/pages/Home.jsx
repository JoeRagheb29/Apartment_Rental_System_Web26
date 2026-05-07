import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "bootstrap";
import ApartmentCard from "../components/ApartmentCard";
import "./../App.css";
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
  useEffect(() => {
    const carouselElement = document.querySelector("#homeCarousel");

    if (carouselElement) {
      new Carousel(carouselElement, {
        interval: 3000,
        ride: "carousel",
      });
    }
  }, []);

  return (
    <div>
      <div id="homeCarousel" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="hero-slide d-flex align-items-center justify-content-center text-center text-white"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${img1})`,
              }}
            >
              <div>
                <h1 className="fw-bold">Find Your Dream Apartment</h1>
                <p className="lead">
                  Discover the best apartments for rent in Egypt
                </p>

                <button
                  className="btn btn-lg mt-3 text-white"
                  style={{ backgroundColor: "var(--primary-color)" }}
                  onClick={() => navigate("/apartments")}
                >
                  Browse Apartments
                </button>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div
              className="hero-slide d-flex align-items-center justify-content-center text-center text-white"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${img2})`,
              }}
            >
              <div>
                <h1 className="fw-bold">Luxury Apartments</h1>
                <p className="lead">Modern apartments in premium locations</p>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div
              className="hero-slide d-flex align-items-center justify-content-center text-center text-white"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${img3})`,
              }}
            >
              <div>
                <h1 className="fw-bold">Affordable Prices</h1>
                <p className="lead">Apartments for every budget</p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
      <div className="container section-space">
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
      <div className="container section-space">
        <h2 className="text-center mb-5">What Our Clients Say</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100">
              <h5>Ahmed</h5>
              <p>Great apartments and very easy to use website.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100">
              <h5>Sara</h5>
              <p>I found my apartment quickly and easily.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100">
              <h5>Omar</h5>
              <p>Clean design and smooth browsing experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
