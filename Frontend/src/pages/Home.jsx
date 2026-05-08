import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApartmentCard from "../components/ApartmentCard";
import './../App.css'

import img1 from "../assets/apt1.jpeg";
import img2 from "../assets/apt2.jpeg";
import img3 from "../assets/apt3.jpeg";
import Slider from "../components/Slider";


function Home() {
  const navigate = useNavigate();
  const [apartments, setApartments] = useState([]);
  // const [currentSlide, setCurrentSlide] = useState(0);

  const Axios = axios.create({
    baseURL: "http://localhost:5000/",
    timeout: 5000,
  });

  const slides = [img1, img2, img3];


  useEffect(() => {
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
      <Slider slides={slides} />      
      <div className="container section-space">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Featured Apartments</h2>
          <button className="btn btn-outline-dark" onClick={() => navigate("/apartments")}>
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
