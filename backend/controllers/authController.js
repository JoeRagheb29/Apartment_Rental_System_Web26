const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

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
    if(user.role !== req.body.role) return res.status(400).json("Wrong role");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true });

    res.json({
        message: "Logged in successfully",
        token: token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
      });

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};
exports.ChangeProfilePicture = async (req, res) => {
  try {
    const { email, ProfilePicture } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");

    user.ProfilePicture = ProfilePicture;
    await user.save();

    res.json("Profile picture updated");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json("Logged out");
};
exports.uploadProfilePicture = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                error: "No image uploaded"
            });
        }

        const filename =
            `user-${req.user.id}-${Date.now()}.jpeg`;

        const filepath = path.join(
            __dirname,
            "../uploads/profile",
            filename
        );

        await sharp(req.file.buffer)
            .resize(300, 300)
            .jpeg({ quality: 80 })
            .toFile(filepath);

        const imageUrl =
            `/uploads/profile/${filename}`;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                ProfilePicture: imageUrl
            },
            { new: true }
        );

        res.status(200).json({
            message: "Profile picture uploaded",
            image: imageUrl,
            user
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};