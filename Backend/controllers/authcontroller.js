const User = require('../models/userModel');
const Contact = require('../models/contact');
const jwt = require('jsonwebtoken');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ username, email, password });
    res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
    });
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
    });
};
exports.getProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
    });
};
exports.contact = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });
        await newContact.save();
        res.status(200).json({ message: 'Message saved successfully' });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ message: 'Error saving message' });
    }
};