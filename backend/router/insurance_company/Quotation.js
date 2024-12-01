const express = require("express");
const multer = require('multer');
const {
    createQuotation,
    getQuotations,
    getQuotationById
} = require("../../controller/Insurance_Company/Quotation");
const InsuranceAuthMiddleware = require('../../Middleware/security/insurance_company'); // Middleware for security
const router = express.Router();

// Multer configuration for file uploads (quotationFile and supportingDocuments)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save uploaded files in 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`); // Add timestamp to avoid filename collisions
    }
});

const upload = multer({ storage });

// Apply InsuranceAuthMiddleware before the route handler for additional security
router.use(InsuranceAuthMiddleware);

// Create a new quotation (with files for quotationFile and supportingDocuments)
router.post('/', InsuranceAuthMiddleware, upload.fields([
    { name: 'quotationFile', maxCount: 1 }, // For the main quotation file (PDF)
    { name: 'supportingDocuments', maxCount: 5 } // For multiple supporting document files (PDFs)
]), createQuotation);

// Get all quotations
router.get("/", InsuranceAuthMiddleware, getQuotations);

// Get a single quotation by ID
router.get("/:id", InsuranceAuthMiddleware, getQuotationById);

module.exports = router;