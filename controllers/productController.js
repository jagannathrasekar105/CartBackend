const db = require("../config/db");

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
