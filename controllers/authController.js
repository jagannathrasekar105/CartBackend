const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  findUserByEmail,
  createUser,
  updateProfilePic,
  findUserById,
  deleteProfilePic, // Import the updateProfilePic function
} = require("../models/userModel");
const multer = require("multer"); // Import multer for file upload handling

// Register user
const register = (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  findUserByEmail(email, (err, user) => {
    if (user) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    createUser(
      { firstName, lastName, email, username, password: hashedPassword },
      (err) => {
        if (err)
          return res.status(500).json({ error: "Username already exists" });
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
};

// Login user
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  findUserByEmail(email, (err, user) => {
    if (err) {
      console.error("Error fetching user from DB:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!user) {
      return res.status(401).json({ error: "Email not found" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your_secret_key",
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, user });
  });
};

// Logout user
const logout = (req, res) => {
  res.json({ message: "Logout handled on client side" });
};

// Upload and update profile picture
const uploadProfilePic = (req, res) => {
  const userId = req.user.id;
  const profilePic = req.file?.buffer;

  if (!profilePic) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const base64Image = profilePic.toString("base64");

  // Check if profile pic already exists
  findUserById(userId, (err, user) => {
    if (err || !user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const alreadyHasProfilePic = !!user.profilePic;

    updateProfilePic(userId, base64Image, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error saving profile picture",
        });
      }

      const message = alreadyHasProfilePic
        ? "Profile picture updated successfully!"
        : "Profile picture uploaded successfully!";

      return res.status(200).json({
        success: true,
        message,
        base64Image,
      });
    });
  });
};
const removeProfilePic = (req, res) => {
  const userId = req.user.id;

  findUserById(userId, (err, user) => {
    if (err || !user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.profilePic) {
      return res
        .status(400)
        .json({ success: false, message: "No profile picture to delete" });
    }

    deleteProfilePic(userId, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete profile picture",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Profile picture deleted successfully",
      });
    });
  });
};

module.exports = {
  register,
  login,
  logout,
  uploadProfilePic,
  removeProfilePic, // Export the new profile picture upload function
};
