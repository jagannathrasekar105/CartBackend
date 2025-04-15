const db = require("../config/db");

const findUserByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    callback(err, results[0]);
  });
};

const createUser = (userData, callback) => {
  const { firstName, lastName, email, username, password } = userData;
  db.query(
    "INSERT INTO users (firstName, lastName, email, username, password, profilePic) VALUES (?, ?, ?, ?, ?, ?)",
    [firstName, lastName, email, username, password, null],
    callback
  );
};

// Function to update the profile picture for the user
const updateProfilePic = (userId, profilePic, callback) => {
  db.query(
    "UPDATE users SET profilePic = ? WHERE id = ?",
    [profilePic, userId],
    callback
  );
};
const findUserById = (id, callback) => {
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return callback(err, null);
    if (results.length > 0) return callback(null, results[0]);
    return callback(null, null);
  });
};
const deleteProfilePic = (userId, callback) => {
  db.query(
    "UPDATE users SET profilePic = NULL WHERE id = ?",
    [userId],
    callback
  );
};
module.exports = {
  findUserByEmail,
  createUser,
  updateProfilePic,
  findUserById,
  deleteProfilePic, // Export the function
};
