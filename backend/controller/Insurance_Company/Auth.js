const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported
const Company = require('../../models/Admin/Company'); // Use Company model
const Permission = require("../../models/Admin/Permission");
const Module = require("../../models/Admin/Module");

require('dotenv').config();

// Login Function
const Login = async(req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Find company by email
        const company = await Company.findOne({ where: { email } });
        if (!company) {
            return res.status(404).json({ message: 'Email not found.' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password incorrect.' });
        }

        // Generate JWT
        const token = jwt.sign({
                id: company.id,
                email: company.email,
                username: company.companyName, // Change username to name if relevant
                phoneNumber: company.phoneNumber,
                password: company.password,

            },
            process.env.JWT_SECRET, { expiresIn: '3h' }
        );

        // Update tokens in the database
        const tokens = company.tokens || [];
        tokens.push(token);

        await Company.update({ tokens }, { where: { id: company.id } });

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true, // Makes sure the cookie is not accessible from JavaScript
            secure: process.env.NODE_ENV === 'production', // If in production, use HTTPS
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Use 'None' in production (HTTPS), 'Lax' for local development (HTTP)
            maxAge: 3600000, // Token expiry time (1 hour)
        });

        // Respond with success
        res.status(200).json({
            message: 'Login successful.',
            user: {
                id: company.id,
                username: company.companyName, // Adjust field names as per Company schema
                email: company.email,
                profileImage: company.companyLogo,
                password: company.password,
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



const GetProfile = async(req, res) => {
    try {
        const { id } = req.company; // Ensure this uses the correct "company" identifier

        // Fetch the company with associated modules through the Permission table
        const company = await Company.findOne({
            where: { id }, // Use 'where' to specify the condition for the 'id'
            include: [{
                model: Module, // Join with Module
                through: {
                    attributes: [], // Exclude join table attributes if not needed
                },
                attributes: ['id', 'module_name', 'isActive'], // Fetch specific module attributes
                required: false, // Ensures only related records are included
                where: { '$Modules->Permission.accessGranted$': true }, // Filter by accessGranted
            }, ],
        });

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        res.status(200).json({
            id: company.id,
            username: company.companyName,
            email: company.email,
            profileImage: company.companyLogo,
            modules: company.Modules || [], // Include modules array
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