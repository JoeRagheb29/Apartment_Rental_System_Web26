const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authroutes");
const cors = require("cors");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
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

app.get("/", (req, res) => {
  res.send(`API is running...
    End points:
    - /api/auth/register
    - /api/auth/login
    - /api/auth/logout
    `);
});

app.listen(5000, () => console.log("Server running in http://localhost:5000"));
