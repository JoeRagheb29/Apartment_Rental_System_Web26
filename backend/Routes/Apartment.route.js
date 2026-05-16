const express = require("express");
const router = express.Router();

const Apartment = require("../Models/Apartments.Model");
const auth = require("../middleware/verifyToken");
const role = require("../middleware/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Apartments
 *   description: Apartment management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Apartment:
 *       type: object
 *       required:
 *         - City
 *         - NumberOfRooms
 *         - Area
 *         - View
 *         - ApartmentPictures
 *         - description
 *         - price
 *         - location
 *       properties:
 *         _id:
 *           type: string
 *           example: 665b43f23d5fbb13f8b9d111
 *         City:
 *           type: string
 *           example: Cairo
 *         NumberOfRooms:
 *           type: number
 *           example: 3
 *         Area:
 *           type: number
 *           example: 120
 *         View:
 *           type: string
 *           example: Nile View
 *         ApartmentPictures:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - img1.jpg
 *             - img2.jpg
 *         description:
 *           type: string
 *           example: Luxury apartment in Zamalek
 *         price:
 *           type: number
 *           example: 5000
 *         location:
 *           type: string
 *           example: Zamalek, Cairo
 *         owner:
 *           type: string
 *           example: 665b43f23d5fbb13f8b9d222
 *         tenant:
 *           type: string
 *           nullable: true
 *           example: 665b43f23d5fbb13f8b9d333
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
 *         required: true
 *         schema:
 *           type: string
 *         example: Cairo
 *     responses:
 *       200:
 *         description: Apartments found successfully
 *       500:
 *         description: Server error
 */
router.get("/search", async (req, res) => {
    try {

        const { city } = req.query;

        const apartments = await Apartment.find({
            City: city
        });

        res.status(200).json(apartments);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

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
 *         required: true
 *         schema:
 *           type: number
 *         example: 3
 *     responses:
 *       200:
 *         description: Apartments found successfully
 *       500:
 *         description: Server error
 */
router.get("/search/rooms", async (req, res) => {
    try {

        const { rooms } = req.query;

        const apartments = await Apartment.find({
            NumberOfRooms: Number(rooms)
        });

        res.status(200).json(apartments);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
});

/**
 * @swagger
 * /api/apartments/profile/my-listings:
 *   get:
 *     summary: Get all apartments owned by logged-in owner
 *     tags: [Apartments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Apartments retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.get(
    "/profile/my-listings",
    auth,
    role("owner"),
    async (req, res) => {

        try {

            const apartments = await Apartment.find({
                owner: req.user.id
            }).populate("tenant", "name email");

            res.status(200).json(apartments);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }
    }
);

/**
 * @swagger
 * /api/apartments/profile/my-rentals:
 *   get:
 *     summary: Get apartments rented by logged-in tenant
 *     tags: [Apartments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Apartments retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.get(
    "/profile/my-rentals",
    auth,
    role("tenant"),
    async (req, res) => {

        try {

            const apartments = await Apartment.find({
                tenant: req.user.id
            }).populate("owner", "name email");

            res.status(200).json(apartments);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }
    }
);

/**
 * @swagger
 * /api/apartments:
 *   post:
 *     summary: Create apartment (Owner only)
 *     tags: [Apartments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Apartment'
 *     responses:
 *       201:
 *         description: Apartment created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/", auth, role("owner"), async (req, res) => {

    try {

        const apartment = await Apartment.create({
            ...req.body,
            owner: req.user.id
        });

        res.status(201).json(apartment);

    } catch (err) {

        res.status(400).json({
            error: err.message
        });

    }
});

/**
 * @swagger
 * /api/apartments:
 *   get:
 *     summary: Get all apartments
 *     tags: [Apartments]
 *     responses:
 *       200:
 *         description: Apartments fetched successfully
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {

    try {

        const apartments = await Apartment.find()
            .populate("owner", "name email")
            .populate("tenant", "name email");

        res.status(200).json(apartments);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
});

/**
 * @swagger
 * /api/apartments/{id}/rent:
 *   post:
 *     summary: Rent apartment (Tenant only)
 *     tags: [Apartments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Apartment rented successfully
 *       400:
 *         description: Already rented or owner trying to rent own apartment
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Apartment not found
 */
router.post("/:id/rent", auth, role("tenant"), async (req, res) => {

    try {

        const apartment = await Apartment.findById(req.params.id);

        if (!apartment) {
            return res.status(404).json("Apartment not found");
        }

        if (apartment.tenant) {
            return res.status(400).json("Already rented");
        }

        if (apartment.owner.toString() === req.user.id) {
            return res.status(400).json("Owner cannot rent own apartment");
        }

        apartment.tenant = req.user.id;

        await apartment.save();

        res.status(200).json(apartment);

    } catch (err) {

        res.status(500).json({
            error: err.message
            
        });
        console.error(err);

    }
});

/**
 * @swagger
 * /api/apartments/{id}/rent:
 *   delete:
 *     summary: Cancel apartment rental
 *     tags: [Apartments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rental cancelled successfully
 *       400:
 *         description: Apartment not rented
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Apartment not found
 */
router.delete("/:id/rent", auth, role("tenant"), async (req, res) => {

    try {

        const apartment = await Apartment.findById(req.params.id);

        if (!apartment) {
            return res.status(404).json({
                error: "Apartment not found"
            });
        }

        if (!apartment.tenant) {
            return res.status(400).json({
                error: "Apartment is not currently rented"
            });
        }

        if (apartment.tenant.toString() !== req.user.id) {
            return res.status(403).json({
                error: "You can only cancel your own rentals"
            });
        }

        apartment.tenant = null;

        await apartment.save();

        res.status(200).json({
            message: "Rental cancelled successfully",
            apartment
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

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
 *         description: Apartment not found
 *       500:
 *         description: Server error
 */
router.get("/:id", async (req, res) => {

    try {

        const apartment = await Apartment.findById(req.params.id);

        if (!apartment) {

            return res.status(404).json({
                error: "Apartment not found"
            });

        }

        res.status(200).json(apartment);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
});

/**
 * @swagger
 * /api/apartments/{id}:
 *   put:
 *     summary: Update apartment (Owner only)
 *     tags: [Apartments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Apartment'
 *     responses:
 *       200:
 *         description: Apartment updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Apartment not found
 */
router.put("/:id", auth, role("owner"), async (req, res) => {

    try {

        const apartment = await Apartment.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user.id
            },
            req.body,
            {
                new: true
            }
        );

        if (!apartment) {

            return res.status(404).json({
                error: "Apartment not found"
            });

        }

        res.status(200).json(apartment);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
});

/**
 * @swagger
 * /api/apartments/{id}:
 *   delete:
 *     summary: Delete apartment (Owner only)
 *     tags: [Apartments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Apartment deleted successfully
 *       404:
 *         description: Apartment not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth, role("owner"), async (req, res) => {

    try {

        const apartment = await Apartment.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!apartment) {

            return res.status(404).json({
                error: "Apartment not found"
            });

        }

        res.status(200).json({
            message: "Apartment deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
});

module.exports = router;