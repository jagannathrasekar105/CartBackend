const db = require("../config/db");

exports.addToWishlist = (req, res) => {
  const { userId, productId } = req.body;
  db.query(
    "SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?",
    [userId, productId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Server error" });
      if (results.length > 0)
        return res.json({ success: false, message: "Already in wishlist" });

      db.query(
        "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)",
        [userId, productId],
        (err) => {
          if (err) return res.status(500).json({ error: "Failed to add" });
          res.json({ success: true, message: "Added to wishlist" });
        }
      );
    }
  );
};

exports.getWishlist = (req, res) => {
  const { userId } = req.params;
  db.query(
    `SELECT p.* FROM wishlist w JOIN products p ON w.product_id = p.id WHERE w.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Failed to fetch" });
      res.json(results);
    }
  );
};

exports.removeFromWishlist = (req, res) => {
  const { userId, productId } = req.body;

  db.query(
    "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?",
    [userId, productId],
    (err) => {
      if (err) return res.status(500).json({ error: "Failed to remove" });
      res.json({ success: true, message: "Removed from wishlist" });
    }
  );
};
