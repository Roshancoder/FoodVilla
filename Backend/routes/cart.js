const express = require('express');
const Cart = require('../models/cart');  
const router = express.Router();
const {Restaurant} = require('../models/Restaurant');

console.log("hihihihi")
router.post('/add', async (req, res) => {
    const { userId, itemId, menuId } = req.body;
    if (!userId || !itemId) {
        return res.status(400).json({ message: 'User ID and Item ID are required' });
    }
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ itemId , menuId}],
            });
        } else {
            const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({ itemId , menuId });
            }
        }
        await cart.save();
        return res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const itemIds = cart.items.map(item => item.itemId.toString());
        
        const restaurants = await Restaurant.find({ 'eatables._id': { $in: itemIds } });
        const eatableMap = {};
        restaurants.forEach(restaurant => {
            restaurant.eatables.forEach(eatable => {
                if (itemIds.includes(eatable._id.toString())) {
                    console.log(eatable)
                    eatableMap[eatable._id] = eatable;
                }
            });
        });
        console.log(eatableMap)
        const cartItems = cart.items.map(item => {
            const itemId = item.itemId ? item.itemId.toString() : null;
            const details = itemId ? eatableMap[itemId] : {}; 

            return {
                ...item.toObject(),
                details
            };
        });

        return res.status(200).json({
            message: 'Cart items retrieved successfully',
            cart: {
                ...cart.toObject(),
                items: cartItems
            }
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.delete("/:userId/item/:itemId", async (req, res) => {
    const { userId, itemId } = req.params;
    
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
    //   console.log(cart)
      cart.items = cart.items.filter((item) => item.itemId.toString() !== itemId);
    //   console.log(cart)
      await cart.save();
      return res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });


  router.put("/:userId/item/:itemId/increment", async (req, res) => {
    const { userId, itemId } = req.params;
  
    try {
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const item = cart.items.find((item) => item.itemId.toString() === itemId);
  
      if (!item) {
        return res.status(404).json({ message: "Item not found in cart" });
      }
      item.quantity += 1;
  
      await cart.save();
  
      return res.status(200).json({ message: "Item quantity incremented", cart });
    } catch (error) {
      console.error("Error incrementing item quantity:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  router.put("/:userId/item/:itemId/decrement", async (req, res) => {
    const { userId, itemId } = req.params;
  
    try {
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const item = cart.items.find((item) => item.itemId.toString() === itemId);
      if (!item) {
        return res.status(404).json({ message: "Item not found in cart" });
      }
      if (item.quantity > 1) {
        item.quantity -= 1;
        await cart.save();
        return res.status(200).json({ message: "Item quantity decremented", cart });
      } else {
        return res.status(400).json({ message: "Quantity cannot be less than 1" });
      }
    } catch (error) {
      console.error("Error decrementing item quantity:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
module.exports = router;
