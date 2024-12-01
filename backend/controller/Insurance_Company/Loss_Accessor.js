const LossAccessor = require("../../models/loss_Accessors/LossAccessor");
const bcrypt = require('bcryptjs');

// Create a new loss accessor with logo
const createLossAccessor = async(req, res) => {

    const { lossAccessorName, email, phoneNumber, password, contactCode, address } = req.body;
    const employeeId = req.company.id; // Assuming company ID is attached to the request (e.g., via middleware)

    // Get the logo file path from the request (multer will add the file path)
    const lossAccessorLogo = req.file ? req.file.filename : null;

    try {

        // Check if loss accessor already exists
        const existingLossAccessor = await LossAccessor.findOne({ where: { email } });

        if (existingLossAccessor) {
            return res.status(400).json({ message: "Loss Accessor already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new loss accessor record
        await LossAccessor.create({
            lossAccessorName,
            email,
            phoneNumber,
            password: hashedPassword,
            contactCode,
            address, // Save the address
            lossAccessorLogo, // Save the logo file path
            employee: employeeId // Link to the company by employee ID
        });

        res.status(201).json({ message: "Loss Accessor created successfully!" });
    } catch (err) {
        console.error("Error creating loss accessor:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all loss accessors
const getLossAccessors = async(req, res) => {
    try {
        const lossAccessors = await LossAccessor.findAll();
        res.status(200).json(lossAccessors);
    } catch (err) {
        console.error("Error fetching loss accessors:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get a single loss accessor by ID
const getLossAccessorById = async(req, res) => {
    try {
        const { id } = req.params;

        // Fetch the loss accessor by ID
        const lossAccessor = await LossAccessor.findOne({
            where: { id },
        });

        if (!lossAccessor) {
            return res.status(404).json({ message: "Loss Accessor not found" });
        }

        res.status(200).json(lossAccessor);
    } catch (err) {
        console.error("Error fetching loss accessor:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a loss accessor
const updateLossAccessor = async(req, res) => {
    try {
        const { id } = req.params; // Get the loss accessor ID from the request params
        const { lossAccessorName, email, phoneNumber, password, contactCode, address } = req.body;

        // Handle logo file update (if provided)
        const lossAccessorLogo = req.file ? req.file.filename : null;

        // Find the loss accessor by its primary key
        const lossAccessor = await LossAccessor.findByPk(id);

        if (!lossAccessor) {
            return res.status(404).json({ message: "Loss Accessor not found" });
        }

        // Update fields dynamically if provided in the request
        lossAccessor.lossAccessorName = lossAccessorName || lossAccessor.lossAccessorName;
        lossAccessor.email = email || lossAccessor.email;
        lossAccessor.phoneNumber = phoneNumber || lossAccessor.phoneNumber;
        lossAccessor.password = password ? await bcrypt.hash(password, 10) : lossAccessor.password; // Hash password if updated
        lossAccessor.contactCode = contactCode || lossAccessor.contactCode;
        lossAccessor.address = address || lossAccessor.address;

        // Always update the logo if a new one is uploaded
        if (lossAccessorLogo) {
            lossAccessor.lossAccessorLogo = lossAccessorLogo;
        }

        // Save changes to the database
        await lossAccessor.save();

        res.status(200).json({ message: "Loss Accessor updated successfully!" });
    } catch (err) {
        console.error("Error updating loss accessor:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a loss accessor
const deleteLossAccessor = async(req, res) => {
    try {
        const { id } = req.params;
        const lossAccessor = await LossAccessor.findByPk(id);

        if (!lossAccessor) {
            return res.status(404).json({ message: "Loss Accessor not found" });
        }

        await lossAccessor.destroy();
        res.status(200).json({ message: "Loss Accessor deleted successfully!" });
    } catch (err) {
        console.error("Error deleting loss accessor:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createLossAccessor,
    getLossAccessors,
    getLossAccessorById,
    updateLossAccessor,
    deleteLossAccessor
};