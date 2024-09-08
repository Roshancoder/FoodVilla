const express = require('express');
const router = express.Router();
const {Restaurant} = require('../models/Restaurant');

router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({})
      res.json(restaurants);
  } catch (err) {
      res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});
router.get('/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;