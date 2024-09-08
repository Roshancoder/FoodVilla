const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User',  
    },
    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Eatable',  
            },
            menuId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Restaurant',
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
});

module.exports = mongoose.model('Cart', CartSchema);
