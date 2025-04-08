const cartModel = require("../models/cartModel");
const db = require("../config/db");

const addToCart = (userId, productId, quantity) => {
  return new Promise((resolve, reject) => {
    // Check if the product already exists in the user's cart
    const checkQuery = `
      SELECT * FROM cart_items 
      WHERE user_id = ? AND product_id = ?
    `;

    db.query(checkQuery, [userId, productId], (err, results) => {
      if (err) return reject(err);

      if (results.length > 0) {
        // Product exists, update quantity
        const newQuantity = results[0].quantity + quantity;
        const updateQuery = `
          UPDATE cart_items 
          SET quantity = ? 
          WHERE user_id = ? AND product_id = ?
        `;
        db.query(
          updateQuery,
          [newQuantity, userId, productId],
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
      } else {
        // Product not in cart, insert new
        const insertQuery = `
          INSERT INTO cart_items (user_id, product_id, quantity) 
          VALUES (?, ?, ?)
        `;
        db.query(insertQuery, [userId, productId, quantity], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      }
    });
  });
};

const getCartItems = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT c.id AS cartItemId, c.quantity, p.*
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `;
    db.query(query, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const removeCartItem = (userId, productId) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM cart_items WHERE user_id = ? AND product_id = ?`;
    db.query(query, [userId, productId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const updateCartItem = (userId, productId, quantity) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE cart_items 
      SET quantity = ? 
      WHERE user_id = ? AND product_id = ?
    `;
    db.query(query, [quantity, userId, productId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem,
  updateCartItem,
};
