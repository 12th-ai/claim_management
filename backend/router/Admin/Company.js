const express = require("express");

const multer = require('multer');

const {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} = require("../../controller/Admin/module/company");
const router = express.Router();


// Multer configuration for file uploads (profile images)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


// Create a new company
router.post('/', upload.single('companyLogo'), createCompany);

// Get all companies
router.get("/", getCompanies);

// Get a single company by ID
router.get("/:id", getCompanyById);

// Update a company
router.put("/:id", upload.single('companyLogo'), updateCompany);

// Delete a company
router.delete("/:id", deleteCompany);

module.exports = router;