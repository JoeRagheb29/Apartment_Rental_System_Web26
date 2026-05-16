const dotenv = require("dotenv");
const mongoose = require('mongoose');
const Apartment = require('./Apartments.Model'); 

dotenv.config();

const apartmentsData = [
  // ----------------- الداتا القديمة (معدلة ومكتملة) -----------------
  {
    Title: "Luxury Panoramic Sea View Apartment",
    City: "Red Sea",
    NumberOfRooms: 4,
    Area: 160,
    View: "Sea View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80"
    ],
    description: "A spacious luxury apartment with panoramic sea views, minutes from the beach. Features modern amenities and a stunning balcony.",
    price: 4200,
    location: "Barceloneta, Red Sea",
    owner: "69f7c1546ebbb037a166da0f", 
    tenant: null,
    floorNumber: 3,
    totalFloors: 10,
    amenities: ["WiFi", "Balcony", "Air Conditioning", "Pool"],
    petFriendly: true
  },
  {
    Title: "Modern Marina View Suite",
    City: "Marsa Matrooh",
    NumberOfRooms: 3,
    Area: 140,
    View: "Marina View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-160066753190-17f0baa2a6c3?w=800&q=80"
    ],
    description: "A sleek modern apartment overlooking the Marina with floor-to-ceiling windows and high-end finishes.",
    price: 5000,
    location: "Marina, Marsa Matrooh",
    owner: "69f7c9ae1b036b725075e0b5",
    tenant: "69f8b6d74bd25f21383991c7", 
    floorNumber: 5,
    totalFloors: 12,
    amenities: ["WiFi", "Gym", "Parking", "Security"],
    petFriendly: false
  },
  {
    Title: "Cozy Minimalist Mountain View",
    City: "Cairo",
    NumberOfRooms: 2,
    Area: 75,
    View: "Mountain View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443864aa7a?w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80"
    ],
    description: "A cozy minimalist apartment in Cairo with stunning mountain views, quiet neighborhood, and natural light.",
    price: 2200,
    location: "6th of October, Cairo",
    owner: "69fdd9229edb2c89b6c6b203",
    tenant: null,
    floorNumber: 2,
    totalFloors: 5,
    amenities: ["WiFi", "Heating", "Equipped Kitchen"],
    petFriendly: true
  },
  {
    Title: "Pyramids View Spacious Apartment",
    City: "Giza",
    NumberOfRooms: 3,
    Area: 230,
    View: "Pyramids View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1502672260266-1c1b661ee758?w=800&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      "https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=800&q=80"
    ],
    description: "An incredibly spacious apartment offering a direct, breathtaking view of the Great Pyramids. Perfect for families.",
    price: 15000,
    location: "El Haram street, Giza",
    owner: "69fe6d90337682ec8fccb142",
    tenant: null,
    floorNumber: 8,
    totalFloors: 15,
    amenities: ["Elevator", "Balcony", "Security", "Air Conditioning"],
    petFriendly: false
  },
  {
    Title: "Stunning City View Studio",
    City: "Cairo",
    NumberOfRooms: 3,
    Area: 120,
    View: "City View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
    ],
    description: "A stunning modern apartment in the heart of the city with breathtaking night views and smart home features.",
    price: 3500,
    location: "Helwan, Cairo",
    owner: "69fe6db4337682ec8fccb143",
    tenant: "69fa77a3b40abd2b161c677d",
    floorNumber: 12,
    totalFloors: 20,
    amenities: ["WiFi", "Smart Home", "Gym", "Elevator"],
    petFriendly: false
  },
  {
    Title: "Charming Sea View Retreat",
    City: "Alexandria",
    NumberOfRooms: 2,
    Area: 85,
    View: "Sea View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80"
    ],
    description: "A charming Sea view apartment with elegant décor surrounded by lush gardens. Ideal for a summer getaway.",
    price: 2800,
    location: "Le Marais, Alexandria",
    owner: "69fd4865081607f5700b00d7",
    tenant: null,
    floorNumber: 4,
    totalFloors: 6,
    amenities: ["Balcony", "Furnished", "WiFi"],
    petFriendly: true
  },

  // ----------------- الداتا الجديدة (وهمية ببيانات متناسقة) -----------------
  {
    Title: "Luxury Penthouse with Rooftop",
    City: "Cairo",
    NumberOfRooms: 5,
    Area: 350,
    View: "City View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
    ],
    description: "Ultra-luxury penthouse featuring a private rooftop pool, smart home integration, and premium Italian furniture.",
    price: 25000,
    location: "Zamalek, Cairo",
    owner: "69f7c9ae1b036b725075e0b5",
    tenant: null,
    floorNumber: 15,
    totalFloors: 15,
    amenities: ["Private Pool", "Rooftop", "Smart Home", "Security 24/7", "Gym"],
    petFriendly: true
  },
  {
    Title: "Elegant Garden Duplex",
    City: "Giza",
    NumberOfRooms: 4,
    Area: 280,
    View: "Garden View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443864aa7a?w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80"
    ],
    description: "A beautiful duplex with a private entrance and a lush green garden. Perfect for families looking for peace and quiet.",
    price: 12000,
    location: "Sheikh Zayed City, Giza",
    owner: "69fdd9229edb2c89b6c6b203",
    tenant: "69f8b6d74bd25f21383991c7",
    floorNumber: 1,
    totalFloors: 4,
    amenities: ["Private Garden", "Parking", "Pet Friendly", "BBQ Area"],
    petFriendly: true
  },
  {
    Title: "Boho Chic Beachfront Condo",
    City: "Red Sea",
    NumberOfRooms: 2,
    Area: 90,
    View: "Sea View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80"
    ],
    description: "Wake up to the sound of waves in this boho-chic condo. Direct access to the beach and fully equipped for kite surfers.",
    price: 6000,
    location: "El Gouna, Red Sea",
    owner: "69fe6d90337682ec8fccb142",
    tenant: null,
    floorNumber: 2,
    totalFloors: 3,
    amenities: ["Beach Access", "Pool", "WiFi", "Air Conditioning"],
    petFriendly: false
  },
  {
    Title: "Urban Loft with High Ceilings",
    City: "Cairo",
    NumberOfRooms: 1,
    Area: 110,
    View: "Street View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1502672260266-1c1b661ee758?w=800&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      "https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=800&q=80"
    ],
    description: "Industrial style urban loft featuring exposed brick walls, massive windows, and a fully equipped modern kitchen.",
    price: 4500,
    location: "Maadi, Cairo",
    owner: "69fe6db4337682ec8fccb143",
    tenant: "69fa77a3b40abd2b161c677d",
    floorNumber: 4,
    totalFloors: 8,
    amenities: ["Elevator", "WiFi", "Heating", "Workspace"],
    petFriendly: true
  },
  {
    Title: "Classic Heritage Apartment",
    City: "Alexandria",
    NumberOfRooms: 3,
    Area: 150,
    View: "City View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
    ],
    description: "Experience the history of Alexandria in this beautifully restored heritage apartment with high ceilings and antique furniture.",
    price: 3200,
    location: "Roushdy, Alexandria",
    owner: "69f7c1546ebbb037a166da0f",
    tenant: null,
    floorNumber: 3,
    totalFloors: 5,
    amenities: ["Balcony", "Antique Furniture", "Air Conditioning"],
    petFriendly: false
  },
  {
    Title: "Oasis Villa Apartment",
    City: "South Sinai",
    NumberOfRooms: 2,
    Area: 100,
    View: "Mountain View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443864aa7a?w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80"
    ],
    description: "A peaceful retreat surrounded by mountains. Features a shared pool, yoga area, and rustic wooden interiors.",
    price: 2500,
    location: "Dahab, South Sinai",
    owner: "69f7c9ae1b036b725075e0b5",
    tenant: null,
    floorNumber: 1,
    totalFloors: 2,
    amenities: ["Pool", "Yoga Space", "WiFi", "Pet Friendly"],
    petFriendly: true
  },
  {
    Title: "Sunny Executive Flat",
    City: "Cairo",
    NumberOfRooms: 2,
    Area: 130,
    View: "City View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
    ],
    description: "Ideal for business travelers. Fast WiFi, dedicated workspace, and located near major corporate hubs.",
    price: 8000,
    location: "New Cairo, Cairo",
    owner: "69fd4865081607f5700b00d7",
    tenant: "69f8b6d74bd25f21383991c7",
    floorNumber: 6,
    totalFloors: 10,
    amenities: ["WiFi", "Workspace", "Gym", "Parking", "Security"],
    petFriendly: false
  },
  {
    Title: "Cozy Family Home",
    City: "Giza",
    NumberOfRooms: 3,
    Area: 145,
    View: "Street View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1502672260266-1c1b661ee758?w=800&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      "https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=800&q=80"
    ],
    description: "A warm and inviting home perfectly suited for a mid-sized family. Close to schools, malls, and public transport.",
    price: 4000,
    location: "Dokki, Giza",
    owner: "69fe6d90337682ec8fccb142",
    tenant: null,
    floorNumber: 5,
    totalFloors: 8,
    amenities: ["Elevator", "Balcony", "Furnished"],
    petFriendly: true
  },
  {
    Title: "Premium Seaview Chalet",
    City: "North Coast",
    NumberOfRooms: 3,
    Area: 180,
    View: "Sea View",
    ApartmentPictures: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80"
    ],
    description: "A highly demanded chalet in the North Coast. Overlooks the Mediterranean sea with a massive terrace.",
    price: 15000,
    location: "Sidi Abdel Rahman, North Coast",
    owner: "69fe6db4337682ec8fccb143",
    tenant: null,
    floorNumber: 1,
    totalFloors: 3,
    amenities: ["Terrace", "Sea View", "Pool", "Clubhouse Access"],
    petFriendly: false
  }
];

const MONGO_URI = "mongodb+srv://yousifhassan631_db_user:EMMyD2Mj45TBqm73@rental-apartment.siccmzs.mongodb.net/?appName=Rental-ApartmentMONGO_URI=mongodb+srv://yousifhassan631_db_user:EMMyD2Mj45TBqm73@rental-apartment.siccmzs.mongodb.net/?appName=Rental-Apartment";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas... 🔌");
    
    // تشغيل الإدخال المجمع
    return Apartment.insertMany(apartmentsData);
  })
  .then(() => {
    console.log("All 15 apartments inserted successfully! 🚀");
    mongoose.connection.close(); // اقفل الاتصال بعد ما يخلص
  })
  .catch(err => {
    console.error("Error:", err);
    mongoose.connection.close();
  });
