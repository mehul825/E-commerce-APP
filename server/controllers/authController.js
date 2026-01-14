const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token (Auto-Register if not exists)
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        // User exists, check password
        if (await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                wishlist: user.wishlist
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } else {
        // User DOES NOT exist, Auto-Register
        try {
            // Create a simple name from email
            const name = email.split('@')[0];

            user = await User.create({
                name: name,
                email: email,
                password: password,
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id),
                    wishlist: user.wishlist
                });
            } else {
                res.status(400).json({ message: 'Invalid user data during auto-registration' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server Error during auto-registration' });
        }
    }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            wishlist: user.wishlist
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            wishlist: user.wishlist
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { authUser, registerUser, getUserProfile, logoutUser };
