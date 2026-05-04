const express = require("express");
const connectDB = require("./db");
const apartmentRoutes = require("./Routes/Apartment.route");

const app = express();

connectDB();

app.use(express.json());
app.use("/api/apartments", apartmentRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});