const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Admin = require('../../../models/Admin/Admin');


require('dotenv').config();

const Register = async(req, res) => {



    const { username, email, password, phoneNumber } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    try {


        const existingAdmin = await Admin.findOne({ where: { email } });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Email is already exist' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.create({ username, email, password: hashedPassword, profileImage, phoneNumber })

        return res.status(201).json({ message: 'Account created successfully!' });
    } catch (err) {
        console.error('Error during registration:', err);

        // Handle specific error responses based on the type of error
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'The email address is already registered.' });
        }

        // General server error
        res.status(500).json({ message: 'Registration failed. Please try again later.' });

    }
}


const Login = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(404).json({ message: 'Email not found.' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password incorrect.' });
        }

        const token = jwt.sign({
                id: admin.id,
                email: admin.email,
                username: admin.username,
                phoneNumber: admin.phoneNumber,
                profileImage: admin.profileImage,
            },
            process.env.JWT_SECRET, { expiresIn: '3h' }
        );

        const tokens = admin.tokens || [];
        tokens.push(token);

        // Update Admin table instead of Client
        await Admin.update({ tokens }, { where: { id: admin.id } });

        res.cookie('token', token, {
            httpOnly: true, // Makes sure the cookie is not accessible from JavaScript
            secure: process.env.NODE_ENV === 'production', // If in production, use HTTPS
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Use 'None' in production (HTTPS), 'Lax' for local development (HTTP)


            maxAge: 3600000, // Token expiry time (1 hour)
        });
        res.status(200).json({
            message: 'Login successful.',
            user: {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                profileImage: admin.profileImage,
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
        const { id } = req.admin;
        const admin = await Admin.findByPk(id); // Find the admin by ID

        if (!admin) return res.status(404).send('Admin not found');

        res.status(200).json({
            id: admin.id,
            username: admin.username,
            email: admin.email,
            profileImage: admin.profileImage,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// Logout Client
const Logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};
































module.exports = {
    Register,
    Login,
    GetProfile,
    Logout,

}