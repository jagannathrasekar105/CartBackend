const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  removeCartItem,
  updateCartItem,
} = require("../controllers/cartController");

// POST /api/cart
router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    await addToCart(userId, productId, quantity);
    res.json({ message: "Item added to cart", userId, productId, quantity });
  } catch (error) {
    console.error("Error adding to cart:", error); // Log to console
    res
      .status(500)
      .json({ message: "Failed to add to cart", error: error.message });
  }
});

router.put("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity == null) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await updateCartItem(userId, productId, quantity);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET /api/cart/:userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const items = await getCartItems(userId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart items", error });
  }
});

// DELETE /api/cart/:userId/:productId
router.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  try {
    await removeCartItem(userId, productId);
    res.json({ message: "Item removed from cart", userId, productId });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove cart item", error });
  }
});

module.exports = router;
