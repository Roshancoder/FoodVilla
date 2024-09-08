const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurant: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Restaurant', 
      required: true 
    },
    eatables: [{
      eatableId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Eatables', 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true 
      }
    }],
    totalPrice: { 
      type: Number, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], 
      default: 'Pending' 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  });
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;