const db = require("../config/db");

// Get Categories and All Products
exports.getProductCategoriesAndAllProducts = (req, res) => {
  const sql = `
    SELECT DISTINCT c.id, c.name 
    FROM categories c
    INNER JOIN products p ON c.id = p.category_id;

    SELECT * FROM products;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // MySQL returns an array of result sets when using multiple queries
    const [categories, products] = results;

    res.json({
      categories,
      products,
    });
  });
};

// Get Product Details by Product ID
// New function to get product details by product_id
exports.getProductDetailsById = (req, res) => {
  const { id } = req.params; // Capture product_id from the request params

  const sql = `
    SELECT p.id, p.name, p.description, p.price, p.discount, p.final_price, p.image_url, p.category_id, c.name AS category, p.brand, p.stock_quantity, p.shipping_cost, p.is_featured, p.rating, p.created_at, p.updated_at, p.is_top_selling
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error fetching product details:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result[0]); // Return the product details as JSON
  });
};
