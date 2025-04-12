const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Import the controller
const {
  getProductCategoriesAndAllProducts,
  getProductDetailsById, // Import the new function
} = require("../controllers/productController");

// Get top selling products
router.get("/top-selling", (req, res) => {
  db.query(
    "SELECT * FROM products WHERE is_top_selling = true",
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json(result);
    }
  );
});

// ✅ Use the imported controller here
router.get("/products-with-categories", getProductCategoriesAndAllProducts);

// ✅ New route to get product details by ID
router.get("/:id", getProductDetailsById);

module.exports = router;
