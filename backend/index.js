const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const cors = require("cors");
const dotenv = require("dotenv");
const apartmentRoutes = require("./Routes/Apartment.route");
const authRoutes = require("./Routes/authroutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/apartments", apartmentRoutes);
app.use("/api/auth", authRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send(`API is running...
    End points:
    - /api/auth/register
    - /api/auth/login
    - /api/auth/logout
    `);
});

app.listen(5000, () => console.log("Server running in http://localhost:5000"));

module.exports = app;