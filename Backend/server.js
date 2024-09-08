const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const restauarants = require('./routes/restaurant')
const orders = require('./routes/orderRoutes')
const cors = require('cors');
const cart = require('./routes/cart');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error(`MongoDB connection error: ${error.message}`));

app.use('/api', authRoutes);
app.use('/res', restauarants);
app.use('/order', orders);
console.log("hehehe")
app.use('/cart', cart);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});