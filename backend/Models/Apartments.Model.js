const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
    City: { type: String, required: true },
    NumberOfRooms: { type: Number, required: true },
    Area: { type: Number, required: true },
    View: { type: String, required: true },
    ApartmentPictures: [String, { required: true }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true }
});
const Apartment = mongoose.model("Apartment", apartmentSchema);

module.exports = Apartment;