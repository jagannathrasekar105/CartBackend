const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../models/userModel");

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

const login = (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  findUserByEmail(email, (err, user) => {
    if (err) {
      console.error("Error fetching user from DB:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // If user is not found (wrong email/username)
    if (!user) {
      return res.status(401).json({ error: "Email not found" });
    }

    // If password is incorrect
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate JWT if everything is fine
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your_secret_key",
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, user });
  });
};

const logout = (req, res) => {
  res.json({ message: "Logout handled on client side" });
};

module.exports = {
  register,
  login,
  logout,
};
