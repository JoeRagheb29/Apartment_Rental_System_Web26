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
        interval: 1500,
        ride: "carousel",
      });
    }
  }, []);

  return (
    <div>
      <div id="homeCarousel" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div
            className="carousel-item active hero-slide"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${img1})`,
            }}
          ></div>

          <div
            className="carousel-item hero-slide"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${img2})`,
            }}
          ></div>

          <div
            className="carousel-item hero-slide"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${img3})`,
            }}
          ></div>
        </div>

        <div className="hero-content text-white text-center">
          <h1 className="fw-bold display-3">Find Your Dream Apartment</h1>

          <p className="lead mt-3 mb-4">
            Discover modern apartments in the best locations in Egypt
          </p>

          <button
            className="btn btn-lg px-4 py-2 hero-btn"
            onClick={() => navigate("/apartments")}
          >
            Browse Apartments
          </button>
        </div>
      </div>

      <div className="container section-space">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Featured Apartments</h2>

          <button
            className="btn btn-outline-dark"
            onClick={() => navigate("/apartments")}
          >
            View All
          </button>
        </div>

        <div className="row g-4">
          {featuredApartments.map((apt) => (
            <div key={apt.id} className="col-md-4">
              <ApartmentCard apartment={apt} />
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Popular Locations</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm overflow-hidden">
              <img
                src={img1}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h5 className="fw-bold">New Cairo</h5>
                <p className="text-muted">Modern apartments and compounds</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm overflow-hidden">
              <img
                src={img2}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h5 className="fw-bold">Zamalek</h5>
                <p className="text-muted">
                  Luxury living in the heart of Cairo
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm overflow-hidden">
              <img
                src={img3}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h5 className="fw-bold">Maadi</h5>
                <p className="text-muted">
                  Quiet neighborhoods and green streets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container section-space">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <img
              src={img2}
              alt="Apartment"
              className="img-fluid rounded shadow"
            />
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold mb-4">Find Apartments Easily</h2>

            <p className="text-muted mb-4">
              Browse apartments in different locations with modern designs,
              affordable prices, and comfortable living spaces.
            </p>

            <div className="mb-3">
              <h5>✔ Modern Apartments</h5>
            </div>

            <div className="mb-3">
              <h5>✔ Affordable Prices</h5>
            </div>

            <div className="mb-3">
              <h5>✔ Best Locations</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
