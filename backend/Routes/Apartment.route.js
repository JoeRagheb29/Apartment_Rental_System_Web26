const express = require("express");
const router = express.Router();
const Apartment = require("../Models/Apartments.Model");

/**
 * @swagger
 * tags:
 *   name: Apartments
 *   description: Apartment APIs
 */

/**
 * @swagger
 * /api/apartments:
 *   post:
 *     summary: Create apartment
 *     tags: [Apartments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               City:
 *                 type: string
 *               NumberOfRooms:
 *                 type: number
 *               Area:
 *                 type: number
 *               View:
 *                 type: string
 *               ApartmentPictures:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Apartment created
 */

/**
 * @swagger
 * /api/apartments:
 *   get:
 *     summary: Get all apartments
 *     tags: [Apartments]
 *     responses:
 *       200:
 *         description: List of apartments
 */

/**
 * @swagger
 * /api/apartments/{id}:
 *   get:
 *     summary: Get apartment by ID
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Apartment data
 */

/**
 * @swagger
 * /api/apartments/{id}:
 *   put:
 *     summary: Update apartment
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @swagger
 * /api/apartments/{id}:
 *   delete:
 *     summary: Delete apartment
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted
 */

/**
 * @swagger
 * /api/apartments/search:
 *   get:
 *     summary: Search by city
 *     tags: [Apartments]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Results
 */

/**
 * @swagger
 * /api/apartments/search/rooms:
 *   get:
 *     summary: Search by rooms
 *     tags: [Apartments]
 *     parameters:
 *       - in: query
 *         name: rooms
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Results
 */
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