const Company = require("../../../models/Admin/Company");
const Permission = require("../../../models/Admin/Permission");
const Module = require("../../../models/Admin/Module");
const bcrypt = require('bcryptjs');

const createCompany = async(req, res) => {
    const { companyName, email, phoneNumber, password, socialMedia, branches } = req.body;
    const companyLogo = req.file ? req.file.filename : null;

    // Log the received data for debugging
    console.log("Received data:", {
        companyName,
        email,
        phoneNumber,
        password,
        socialMedia,
        branches,
        companyLogo
    });

    const parsedSocialMedia = socialMedia ? JSON.parse(socialMedia) : [];
    const parsedBranches = branches ? JSON.parse(branches) : [];

    try {
        const existingCompany = await Company.findOne({ where: { companyName } });

        if (existingCompany) {
            return res.status(400).json({ message: "Company already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Company.create({
            companyName,
            email,
            phoneNumber,
            password: hashedPassword,
            companyLogo, // Save the logo file path
            socialMedia: parsedSocialMedia,
            branches: parsedBranches
        });

        res.status(201).json({ message: "Company created successfully!" });
    } catch (err) {
        console.error("Error creating company:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Get all companies
const getCompanies = async(req, res) => {
    try {
        const companies = await Company.findAll();
        res.status(200).json(companies);
    } catch (err) {
        console.error("Error fetching companies:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getCompanyById = async(req, res) => {
    try {
        const { id } = req.params;
        console.log('Searching for company with ID:', id);

        // Fetch the company with associated modules through the Permission table
        const company = await Company.findOne({
            where: { id }, // Use 'where' to specify the condition for the 'id'
            include: [{
                model: Module,
                through: {
                    attributes: [], // Exclude join table attributes if not needed
                },
                required: false, // Ensures only related records are included
                where: { '$Modules->Permission.accessGranted$': true }, // Filter by accessGranted
            }],
        });

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        res.status(200).json(company);
    } catch (err) {
        console.error("Error fetching company:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


const updateCompany = async(req, res) => {
    try {
        const { id } = req.params; // Get the company ID from the request params
        const { companyName, email, phoneNumber, password, socialMedia, branches } = req.body;

        // Handle logo file update (if provided)
        const companyLogo = req.file ? req.file.filename : null;

        // Find the company by its primary key
        const company = await Company.findByPk(id);

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        // Update fields dynamically if provided in the request
        company.companyName = companyName || company.companyName;
        company.email = email || company.email;
        company.phoneNumber = phoneNumber || company.phoneNumber;
        company.password = password ? await bcrypt.hash(password, 10) : company.password; // Hash password if updated
        company.socialMedia = socialMedia || company.socialMedia;
        company.branches = branches || company.branches;

        // Always update the logo if a new one is uploaded
        if (companyLogo) {
            company.logo = companyLogo;
        }

        // Save changes to the database
        await company.save();

        res.status(200).json({ message: "Company updated successfully!" });
    } catch (err) {
        console.error("Error updating company:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Delete a company
const deleteCompany = async(req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findByPk(id);

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        await company.destroy();
        res.status(200).json({ message: "Company deleted successfully!" });
    } catch (err) {
        console.error("Error deleting company:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
};