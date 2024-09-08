const mongoose = require('mongoose');
const eatableSchema = new mongoose.Schema({
  id: { type: Number, required: true ,unique: true},
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String }
});
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  eatables: [eatableSchema]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Eatables = mongoose.model('Eatables', eatableSchema);

module.exports = {Restaurant,Eatables};