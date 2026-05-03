const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
connectDB();

app.listen(5000, () => console.log("Server running"));
