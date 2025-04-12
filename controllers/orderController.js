const db = require("../config/db");

// Save Order (without getConnection, using simple db.query)
exports.saveOrder = (req, res) => {
  const {
    user_id,
    name,
    mobile,
    address,
    city,
    pincode,
    payment_method,
    total_amount,
    items,
  } = req.body;

  // Validate required fields
  if (
    !user_id ||
    !name ||
    !mobile ||
    !address ||
    !city ||
    !pincode ||
    !payment_method ||
    !total_amount ||
    !Array.isArray(items)
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Insert into orders table
  const orderQuery = `
    INSERT INTO orders 
    (user_id, name, mobile, address, city, pincode, payment_method, total_amount) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const orderValues = [
    user_id,
    name,
    mobile,
    address,
    city,
    pincode,
    payment_method,
    total_amount,
  ];

  db.query(orderQuery, orderValues, (err, orderResult) => {
    if (err) {
      console.error("Error saving order:", err);
      return res.status(500).json({ error: "Failed to place order" });
    }

    const orderId = orderResult.insertId;

    const itemValues = items.map((item) => [
      orderId,
      item.product_id,
      item.quantity,
      item.price,
    ]);

    db.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
      [itemValues],
      (err2) => {
        if (err2) {
          console.error("Error saving order items:", err2);
          return res.status(500).json({ error: "Failed to add order items" });
        }

        res.json({ message: "Order placed successfully", order_id: orderId });
      }
    );
  });
};

// Get Orders by User
exports.getOrdersByUser = (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT 
      o.id as order_id,
      o.order_date,
      o.total_amount,
      o.status,
      o.name,
      o.mobile,
      o.address,
      o.city,
      o.pincode,
      o.payment_method,
      oi.product_id,
      oi.quantity,
      oi.price,
      p.name AS product_name,
      p.image_url
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE o.user_id = ?
    ORDER BY o.order_date DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ error: "Failed to fetch order history" });
    }

    const grouped = {};
    results.forEach((row) => {
      const orderId = row.order_id;
      if (!grouped[orderId]) {
        grouped[orderId] = {
          order_id: orderId,
          order_date: row.order_date,
          total_amount: row.total_amount,
          status: row.status,
          name: row.name,
          mobile: row.mobile,
          address: row.address,
          city: row.city,
          pincode: row.pincode,
          payment_method: row.payment_method,
          items: [],
        };
      }

      grouped[orderId].items.push({
        product_id: row.product_id,
        name: row.product_name,
        image_url: row.image_url,
        quantity: row.quantity,
        price: row.price,
      });
    });

    res.json(Object.values(grouped));
  });
};
