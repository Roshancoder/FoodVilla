const express = require('express');
const { registerUser, loginUser, getProfile , contact } = require('../controllers/authcontroller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.post('/contact', contact);

module.exports = router;