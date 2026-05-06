import { useState } from "react";
import ApartmentCard from "../components/ApartmentCard";
import img1 from "../assets/apt1.jpeg";
import img2 from "../assets/apt2.jpeg";
import img3 from "../assets/apt3.jpeg";
import img4 from "../assets/apt4.jpeg";
import img5 from "../assets/apt5.jpeg";
import img6 from "../assets/apt6.jpeg";

const apartments = [
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
  {
    id: 4,
    title: "Apartment with Nile View",
    price: 25000,
    location: "Garden City",
    beds: 3,
    baths: 2,
    size: 180,
    image: img4,
  },
  {
    id: 5,
    title: "Affordable Apartment",
    price: 6000,
    location: "Nasr City",
    beds: 2,
    baths: 1,
    size: 100,
    image: img5,
  },
  {
    id: 6,
    title: "Premium Apartment in Sheikh Zayed",
    price: 18000,
    location: "Sheikh Zayed",
    beds: 3,
    baths: 3,
    size: 200,
    image: img6,
  },
];

function Apartments() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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
          <input
            type="number"
            className="form-control"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredApartments.map((apt) => (
          <div key={apt.id} className="col-md-4 mb-4">
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
