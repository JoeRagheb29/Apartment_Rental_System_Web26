const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email){
      return res.status(400).json("Email is required");
    }
    else if (!name){
      return res.status(400).json("Name is required");
    }
    else if (!password){
      return res.status(400).json("Password is required");
    }

    const user = await User.findOne({ email });
    if(user)return res.status(400).json("Email must be unique");
    const hashedPassword = await bcrypt.hash(password, 10);

    const userHashed = await User.create({
      name,
      email,
      password: hashedPassword,
      role 
    });

    res.status(201).json(userHashed);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Wrong password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true });

    res.json("Logged in");

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json("Logged out");
};