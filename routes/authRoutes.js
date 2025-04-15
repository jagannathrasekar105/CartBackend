const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const upload = multer(); // memory storage

const {
  register,
  login,
  logout,
  uploadProfilePic,
  removeProfilePic,
} = require("../controllers/authController");

// Middleware to verify JWT and set req.user
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected route for uploading profile picture
router.post(
  "/upload-profile-pic",
  authenticate,
  upload.single("profilePic"),
  uploadProfilePic
);
router.delete("/reomve-profile-pic", authenticate, removeProfilePic);

module.exports = router;
