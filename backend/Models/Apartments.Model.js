const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
    City: { type: String, required: true },
    NumberOfRooms: { type: Number, required: true },
    Area: { type: Number, required: true },
    View: { type: String, required: true },
    ApartmentPictures: {type: [String],required: true,validate: v => v.length > 0},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    floorNumber: { type: Number, required: true },
    totalFloors: { type: Number, required: true },
    amenities: [{ type: String }],
    petFriendly: { type: Boolean, default: false },
});

const Apartment = mongoose.model("Apartment", apartmentSchema);

module.exports = Apartment;