const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");


exports.register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        message: "Name is required"
      });
    }

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required"
      });
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Remove password from response
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };

    return res.status(201).json(userResponse);

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });

  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {

  try {

    const { email, password, role } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password"
      });
    }

    // Check role
    if (role && user.role !== role) {
      return res.status(400).json({
        message: "Wrong role"
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    // Save token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    return res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });

  }
};


exports.logout = async (req, res) => {

  try {

    res.clearCookie("token");

    return res.status(200).json({
      message: "Logged out successfully"
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });

  }

};

exports.ChangeProfilePicture = async (req, res) => {

  try {

    const { email, ProfilePicture } = req.body;

    if (!email || !ProfilePicture) {
      return res.status(400).json({
        message: "Email and ProfilePicture are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.ProfilePicture = ProfilePicture;

    await user.save();

    return res.status(200).json({
      message: "Profile picture updated",
      user
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });

  }

};

exports.uploadProfilePicture = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded"
      });
    }

    const uploadDir = path.join(
      __dirname,
      "../uploads/profile"
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename =
      `user-${req.user.id}-${Date.now()}.jpeg`;

    const filepath = path.join(
      uploadDir,
      filename
    );

    await sharp(req.file.buffer)
      .resize(300, 300)
      .jpeg({ quality: 80 })
      .toFile(filepath);

    const imageUrl =
      `/uploads/profile/${filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        ProfilePicture: imageUrl
      },
      {
        new: true
      }
    ).select("-password");

    return res.status(200).json({
      message: "Profile picture uploaded successfully",
      image: imageUrl,
      user: updatedUser
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });

  }

};