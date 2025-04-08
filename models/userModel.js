const db = require("../config/db");

const findUserByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    callback(err, results[0]);
  });
};

const createUser = (userData, callback) => {
  const { firstName, lastName, email, username, password } = userData;
  db.query(
    "INSERT INTO users (firstName, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)",
    [firstName, lastName, email, username, password],
    callback
  );
};

module.exports = {
  findUserByEmail,
  createUser,
};
