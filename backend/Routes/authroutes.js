const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout
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

module.exports = router;