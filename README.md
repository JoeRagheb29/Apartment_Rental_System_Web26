# 🏠 Apartment Rental System

A modern, full-stack web application for browsing, filtering, and managing apartment rentals. Built with **React** on the frontend and **Express.js** with **MongoDB** on the backend.

---

## ✨ Features

### 🔐 Authentication & User Management

- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- User profiles with personalized information
- Protected routes for authenticated users only

### 🏢 Apartment Browsing & Discovery

- Browse all available apartments with detailed information
- View apartment details including:
  - Number of rooms and area size
  - Location and view type
  - Price and comprehensive descriptions
  - High-quality images
- Search and filter apartments by:
  - City/location
  - Price range
  - Number of rooms
  - Other property features

### 📋 User Dashboard

- Personalized dashboard for authenticated users
- View rental history and bookings
- Manage favorite apartments
- Quick access to profile settings

### 🎨 Modern User Interface

- Clean and intuitive design
- Responsive layout for desktop and mobile devices
- Bootstrap and Tailwind CSS styling
- Smooth navigation and user experience

---

## 🏗️ Technology Stack

### Frontend

- **React 19** - Modern UI library with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **Formik & Yup** - Form management and validation
- **Bootstrap 5** - Responsive styling
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Lightning-fast build tool

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

---

## 📁 Project Structure

```
Apartment_Rental_System_Web26_3/
├── backend/                          # Node.js/Express backend
│   ├── controllers/
│   │   └── authController.js        # Authentication logic
│   ├── middleware/
│   │   └── verifyToken.js           # JWT verification
│   ├── Models/
│   │   ├── Apartments.Model.js      # Apartment schema
│   │   └── User.js                  # User schema
│   ├── Routes/
│   │   ├── Apartment.route.js       # Apartment endpoints
│   │   └── authroutes.js            # Auth endpoints
│   ├── db.js                        # MongoDB connection
│   ├── index.js                     # Express server setup
│   └── package.json
│
├── Frontend/                         # React frontend
│   ├── src/
│   │   ├── Auth/
│   │   │   ├── Login.jsx            # Login page
│   │   │   └── Register.jsx         # Registration page
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── Footer.jsx           # Footer component
│   │   │   ├── ApartmentCard.jsx    # Apartment card display
│   │   │   ├── Filter.jsx           # Filter component
│   │   │   ├── SearchBar.jsx        # Search functionality
│   │   │   └── PrivateRoute.jsx     # Protected routes
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Apartments.jsx       # Apartments listing
│   │   │   ├── ApartmentDetails.jsx # Single apartment details
│   │   │   ├── Dashboard.jsx        # User dashboard
│   │   │   └── Profile.jsx          # User profile
│   │   ├── assets/                  # Images and icons
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── vite.config.js
│   ├── package.json
│   └── index.html
│
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas connection)

### Installation

#### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`

#### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` (or as shown in your terminal)

---

## 📡 API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user


### Apartment Routes

- `GET /api/apartments` - Get all apartments
- `GET /api/apartments/:id` - Get apartment details
- `POST /api/apartments` - Create apartment (admin)
- `PUT /api/apartments/:id` - Update apartment (admin)
- `DELETE /api/apartments/:id` - Delete apartment (admin)
- `POST /:id/rent` -Rent Apartment(Tenant)
- `POST /Rent/cancel` -Cancel Rent Apartment(Tenant)
---

## 🔄 User Workflows

### Browsing Apartments

1. User lands on the **Home** page
2. Navigates to **Apartments** page to view all listings
3. Uses **Filter** and **SearchBar** to narrow down options
4. Clicks on an apartment to view **ApartmentDetails**

### User Authentication

1. New users **Register** with email and password
2. Existing users **Login** with credentials
3. Upon successful login, JWT token is stored
4. User can now access **Dashboard** and **Profile**

### Protected Features

- Dashboard and Profile pages require authentication
- Private routes automatically redirect unauthenticated users to login

---

## 🛠️ Development

### Available Scripts

**Backend:**

```bash
npm run dev      # Start development server with nodemon
npm test         # Run tests
```

**Frontend:**

```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

---

## 📝 Features in Detail

### Authentication System

- Secure JWT-based authentication
- Password hashing with bcrypt
- Token stored in cookies for persistence
- Automatic token verification on protected routes

### Apartment Listing

- Detailed apartment information display
- Image galleries for each property
- Price and availability information
- Location and amenities details

### Search & Filter

- Filter by city/location
- Filter by price range
- Filter by number of rooms
- Real-time search results

---

## 🎯 Future Enhancements

- Booking system for apartment rentals
- Payment integration
- Reviews and ratings system
- Email notifications
- Advanced analytics dashboard
- Multi-language support

---

## 📄 License

ISC

---

## 👤 Author

Joe Ragheb

---

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Happy Renting! 🏡**
