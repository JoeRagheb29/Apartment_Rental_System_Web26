const express = require("express");
const upload =require("../middleware/uploadProfilePicture");
const {
    uploadProfilePicture
} = require("../controllers/authController");
const auth = require("../middleware/verifyToken");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *           example: 665b43f23d5fbb13f8b9d111
 *         Name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           example: password123
 *         role:
 *           type: string
 *           enum: [owner, tenant]
 *           example: tenant
 *         ProfilePicture:
 *           type: string
 *           example: https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png
 */
/**

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [owner, tenant]
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in
 *       400:
 *         description: Wrong credentials
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out
 */
const {
  register,
  login,
  logout,
  ChangeProfilePicture,
} = require("../controllers/authController");

router.route("/register")
  .post(register)
  .get((req, res) => {
    res.status(400).json("GET not allowed on /register");
  });

router.route("/login")
  .post(login)
  .get((req, res) => {
    res.status(400).json("GET not allowed on /login");
  });
router.route("/logout")
.post(logout)
.get((req,res)=>{
  res.status(400).json("GET not allowed on /logout");
})
// router.route("/profilePicture")
// .post(ChangeProfilePicture)
// .get((req,res)=>{
//   res.status(400).json("GET not allowed on /profilePicture");
// });
/**
 * @swagger
 * /api/auth/upload-profile-picture:
 *   post:
 *     summary: Upload profile photo
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Profile picture uploaded
 *       400:
 *         description: Bad request
 */
router.post(
    "/upload-profile-picture",
    auth,
    upload.single("image"),
    uploadProfilePicture
);
module.exports = router;