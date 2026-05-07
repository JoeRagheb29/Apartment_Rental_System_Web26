import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApartmentCard from "../components/ApartmentCard";
import './../App.css'
import Carousel from "bootstrap/js/dist/carousel";

import img1 from "../assets/apt1.jpeg";
import img2 from "../assets/apt2.jpeg";
import img3 from "../assets/apt3.jpeg";

function Home() {
  const navigate = useNavigate();
  const [apartments, setApartments] = useState([]);

  const Axios = axios.create({
    baseURL: "http://localhost:5000/",
    timeout: 5000,
  });

  useEffect(() => {

    const carouselElement = document.querySelector("#homeCarousel");

    if (carouselElement) {
      new Carousel(carouselElement, {
        interval: 1500,
        ride: "carousel",
      });
    }

    const fetchData = async () => {
      try 
      {
        const response = await Axios.get("/api/apartments/");
        const Apartments = await response.data;
        console.log(Apartments);
        setApartments(Apartments);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
      
    };

    fetchData();
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
          {apartments.map((apt) => (
            <div key={apt._id} className="col-md-4">
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
