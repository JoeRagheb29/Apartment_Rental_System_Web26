const express = require("express");
const router = express.Router();
const Apartment = require("../Models/Apartments.Model");
const auth = require("../middleware/verifyToken");     
const role = require("../middleware/roleMiddleware"); 
/**
 * @swagger
 * tags:
 *   name: Apartments
 *   description: Apartment management APIs (Owner / Tenant system)
 */

/**
 * @swagger
 * /api/apartments:
 *   post:
 *     summary: Create a new apartment (Owner only)
 *     tags: [Apartments]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - City
 *               - NumberOfRooms
 *               - Area
 *               - View
 *               - ApartmentPictures
 *               - description
 *               - price
 *               - location
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
 *         description: Apartment created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not owner)
 */

/**
 * @swagger
 * /api/apartments:
 *   get:
 *     summary: Get all apartments (with owner & tenant populated)
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
 *         description: Apartment found
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/apartments/{id}:
 *   put:
 *     summary: Update apartment (Owner only)
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Updated successfully
 */

/**
 * @swagger
 * /api/apartments/{id}:
 *   delete:
 *     summary: Delete apartment (Owner only)
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted successfully
 */

/**
 * @swagger
 * /api/apartments/search:
 *   get:
 *     summary: Search apartments by city
 *     tags: [Apartments]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */

/**
 * @swagger
 * /api/apartments/search/rooms:
 *   get:
 *     summary: Search apartments by number of rooms
 *     tags: [Apartments]
 *     parameters:
 *       - in: query
 *         name: rooms
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Search results
 */

/**
 * @swagger
 * /api/apartments/{id}/rent:
 *   post:
 *     summary: Rent an apartment (Tenant only)
 *     tags: [Apartments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Apartment rented successfully
 *       400:
 *         description: Already rented
 *       401:
 *         description: Unauthorized
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
router.post("/", auth, role("owner"), async (req, res) => {
  try {
    const apartment = await Apartment.create({
      ...req.body,
      owner: req.user.id
    });

    res.status(201).json(apartment);
  } catch (err) {
    res.status(400).json(err.message);
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
router.post("/:id/rent", auth, role("tenant"), async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) return res.status(404).json("Not found");

    if (apartment.tenant) {
      return res.status(400).json("Already rented");
    }

    apartment.tenant = req.user.id;
    await apartment.save();

    res.json(apartment);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
router.get("/", async (req, res) => {
  const apartments = await Apartment.find()
    .populate("owner", "name email")
    .populate("tenant", "name email");

  res.json(apartments);
});

module.exports = router;