const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported
const Accessor = require('../../models/loss_Accessors/LossAccessor'); // Use Accessor model instead of Company


require('dotenv').config();

// Login Function
const Login = async(req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Find accessor by email
        const accessor = await Accessor.findOne({ where: { email } });
        if (!accessor) {
            return res.status(404).json({ message: 'Email nojhdwejwet found.' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, accessor.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password incorrect.' });
        }

        // Generate JWT
        const token = jwt.sign({
            id: accessor.id,
            email: accessor.email,
            username: accessor.lossAccessorName, // Assuming the accessor has a username
            phoneNumber: accessor.phoneNumber,
            password: accessor.password,
        }, process.env.JWT_SECRET, { expiresIn: '3h' });

        // Update tokens in the database
        const tokens = accessor.tokens || [];
        tokens.push(token);

        await Accessor.update({ tokens }, { where: { id: accessor.id } });

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000, // 1 hour
        });

        // Respond with success
        res.status(200).json({
            message: 'Login successful.',
            user: {
                id: accessor.id,
                username: accessor.username, // Adjust field names as per Accessor schema
                email: accessor.email,
                profileImage: accessor.profileImage, // Assuming accessor has profileImage field
                token,
            },
        });
    } catch (err) {
        console.error('Error during login:', {
            message: err.message,
            stack: err.stack,
        });
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

// GetProfile Function
const GetProfile = async(req, res) => {
    try {
        const { id } = req.accessor; // Ensure this uses the correct "accessor" identifier

        // Fetch the accessor with associated modules through the Permission table
        const accessor = await Accessor.findByPk(id);

        if (!accessor) {
            return res.status(404).json({ message: "Accessor not found" });
        }

        res.status(200).json({
            id: accessor.id,
            username: accessor.lossAccessorName,
            email: accessor.email,
            profileImage: accessor.lossAccessorLogo,
        });
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Logout Function
const Logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
    Login,
    GetProfile,
    Logout,
};