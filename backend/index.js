const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const cors = require("cors");
const dotenv = require("dotenv");
const apartmentRoutes = require("./Routes/Apartment.route");
const authRoutes = require("./Routes/authroutes");
const userRoutes = require('./Routes/userRoutes');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const path = require("path");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/user', userRoutes);
app.use("/api/apartments", apartmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads",express.static(path.join(__dirname, "uploads")));
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

app.get("/", (req, res) => {
  res.send(`API is running...
    End points:
    - /api/auth/register
    - /api/auth/login
    - /api/auth/logout
    `);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(5000, () =>
    console.log("Server running on http://localhost:5000")
  );
}

module.exports = app;