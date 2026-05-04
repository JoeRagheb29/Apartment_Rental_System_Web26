const express = require("express");
const router = express.Router();
const Apartment = require("../Models/Apartments.Model");


// SEARCH - Search apartments by city
router.get("/search", async (req, res) => {
    try {
        const { city } = req.query;
        const apartments = await Apartment.find({ City: city });
        res.status(200).json(apartments);
    }   catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Search apartments by number of rooms
router.get("/search/rooms", async (req, res) => {
    try {
        const { rooms } = req.query;
        const apartments = await Apartment.find({ NumberOfRooms: Number(rooms) });
        res.status(200).json(apartments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE - Add a new apartment
router.post("/", async (req, res) => {
    try {
        const apartment = new Apartment(req.body);
        await apartment.save();
        res.status(201).json(apartment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ - Get all apartments
router.get("/", async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.status(200).json(apartments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ - Get one apartment by ID
router.get("/:id", async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id);
        if (!apartment) return res.status(404).json({ error: "Apartment not found" });
        res.status(200).json(apartment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE - Update an apartment by ID
router.put("/:id", async (req, res) => {
    try {
        const apartment = await Apartment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!apartment) return res.status(404).json({ error: "Apartment not found" });
        res.status(200).json(apartment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Delete an apartment by ID
router.delete("/:id", async (req, res) => {
    try {
        const apartment = await Apartment.findByIdAndDelete(req.params.id);
        if (!apartment) return res.status(404).json({ error: "Apartment not found" });
        res.status(200).json({ message: "Apartment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;