const Order = require('../models/order');
const {Restaurant} = require('../models/Restaurant'); 
const User = require('../models/userModel'); 
const Cart = require('../models/cart')
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
    const { eatables, totalPrice, user, paymentMethod, razorpayPaymentId } = req.body;

    try {
      const userExists = await User.findById(user);
      if (!userExists) {
        return res.status(404).json({ message: 'User not found' });
      }
      let restaurantId;
      for (const item of eatables) {
        const restaurant = await Restaurant.findById(item.menuId).populate('eatables'); // Get the restaurant with eatables populated
        if (!restaurant) {
          return res.status(404).json({ message: `Restaurant with ID ${item.menuId} not found` });
        }
        restaurantId = restaurant._id;
        const eatable = restaurant.eatables.find(e => e._id.toString() === item.eatableId);
        if (!eatable) {
          return res.status(404).json({ message: `Eatable with ID ${item.eatableId} not found in restaurant ${item.menuId}` });
        }
      }
      if (!restaurantId) {
        return res.status(400).json({ message: 'Restaurant ID is required' });
      }
      const order = new Order({
        restaurant: restaurantId, 
        eatables,
        totalPrice,
        user,
        paymentMethod,
        razorpayPaymentId,
        status: 'Pending'
      });
       
      await order.save();
      const userId = mongoose.Types.ObjectId(user);
      await Cart.deleteMany({ user: userId});
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Error creating order' });
    }
  };
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('restaurant', 'name') 
      .populate('eatables.eatableId', 'name price') 
      .populate('user', 'username email'); 
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant', 'name')
      .populate('eatables.eatableId', 'name price')
      .populate('user', 'username email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
};
exports.updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Error updating order' });
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order' });
  }
};
