const db = require("../config/db");

const addToCart = (userId, productId, quantity) => {
  return new Promise((resolve, reject) => {
    // First, check if item already exists in the cart
    const checkQuery = `
      SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?
    `;

    db.query(checkQuery, [userId, productId], (err, results) => {
      if (err) return reject(err);

      if (results.length > 0) {
        // Item exists → update quantity
        const newQuantity = results[0].quantity + quantity;
        const updateQuery = `
          UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?
        `;
        db.query(
          updateQuery,
          [newQuantity, userId, productId],
          (err, result) => {
            if (err) return reject(err);
            resolve({ message: "Cart updated", updated: true });
          }
        );
      } else {
        // Item doesn't exist → insert new
        const insertQuery = `
          INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)
        `;
        db.query(insertQuery, [userId, productId, quantity], (err, result) => {
          if (err) return reject(err);
          resolve({ message: "Item added to cart", updated: false });
        });
      }
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
      resolve({ message: "Quantity updated", result });
    });
  });
};

module.exports = {
  addToCart,
  updateCartItem,
};
