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
// UPDATE - Update an apartment by ID
router.put("/:id",auth, role("owner"), async (req, res) => {
    try {
        const apartment = await Apartment.findOneAndUpdate(
              {
                 _id: req.params.id,
                 owner: req.user.id
             },
             req.body,
             {
               returnDocument: "after"
         }
    );
        if (!apartment) return res.status(404).json({ error: "Apartment not found" });
        res.status(200).json(apartment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
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
// DELETE - Delete an apartment by ID
router.delete("/:id", auth, role("owner"),async (req, res) => {
    try {
        const apartment = await Apartment.findOneAndDelete({
            _id: req.params.id,
             owner: req.user.id
        });
        if (!apartment) return res.status(404).json({ error: "Apartment not found" });
        res.status(200).json({ message: "Apartment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
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
//Rent an apartment (Tenant only)
router.post("/:id/rent", auth, role("tenant"), async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    
    if (!apartment) return res.status(404).json("Not found");

    if (apartment.tenant) {
      return res.status(400).json("Already rented");
    }
    if (apartment.owner.toString() === req.user.id) {
         return res.status(400).json("Owner cannot rent own apartment");
    }
    apartment.tenant = req.user.id;
    await apartment.save();

    res.json(apartment);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
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
router.get("/", async (req, res) => {
    try {
        const apartments = await Apartment.find()
            .populate("owner", "name email")
            .populate("tenant", "name email");
        res.json(apartments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/apartments/{id}/rent:
 *   delete:
 *     summary: Cancel apartment rental (Tenant only)
 *     tags: [Apartments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Rental cancelled successfully
 *       400:
 *         description: Apartment is not currently rented
 *       403:
 *         description: You can only cancel your own rentals
 *       404:
 *         description: Apartment not found
 */

router.delete("/:id/rent", auth, role("tenant"), async (req, res) => {
    try {
        const { id } = req.params;
        const apartment = await Apartment.findById(id);
        if (!apartment){
            return res.status(404).json({ error: "Apartment not found"});
        }
        if (!apartment.tenant) {
            return res.status(400).json({ error: "Apartment is not currently rented" });
        }
        if (apartment.tenant.toString() !== req.user.id) {
            return res.status(403).json({ error: "You can only cancel your own rentals" });
        }
        else {
            apartment.tenant = null;
            await apartment.save();
            res.json({ message: "Rental cancelled successfully", apartment });
        }
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;