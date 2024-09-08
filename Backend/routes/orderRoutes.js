const express = require('express');
const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id', protect, updateOrder);
router.delete('/:id', protect, deleteOrder);

module.exports = router;
