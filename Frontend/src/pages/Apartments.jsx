import ApartmentCard from "../components/Home/ApartmentCard";
import { useState , useEffect } from "react";
import axios from "axios";

function Apartments() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [apartments, setApartments] = useState([]);

  const Axios = axios.create({
    baseURL: "http://localhost:5000/",
    timeout: 5000,
  });

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

  const filteredApartments = apartments.filter((apt) => {
    return (
      apt.location.toLowerCase().includes(search.toLowerCase()) &&
      (minPrice === "" || apt.price >= Number(minPrice)) &&
      (maxPrice === "" || apt.price <= Number(maxPrice))
    );
  });



  return (
    <div className="container mt-4 pb-5">
      <h2 className="mb-4 text-center">Find Your Perfect Apartment</h2>

      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search by location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <input type="number" className="form-control"
            placeholder="Min Price" value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input type="number" className="form-control"
            placeholder="Max Price" value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredApartments.map((apt) => (
          <div key={apt._id} className="col-md-4 mb-4">
            <ApartmentCard apartment={apt} />
          </div>
        ))}
      </div>

      {filteredApartments.length === 0 && (
        <p className="text-center">No apartments found</p>
      )}
    </div>
  );
}

export default Apartments;
