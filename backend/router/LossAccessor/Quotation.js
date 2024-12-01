const express = require("express");
const multer = require('multer');
const {
    createQuotation,
    getQuotations,
    getQuotationById,
    Get_Quotation_Report
} = require("../../controller/loss_Accessor/Quotation");
const LossAccessorAuthMiddleware = require('../../Middleware/security/Loss_Accessor'); // Middleware for security
const router = express.Router();

// Multer configuration for file uploads (quotationFile and supportingDocuments)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Saving to uploads directory:', file.originalname);
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        console.log('Generating filename:', file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({ storage });

// Apply InsuranceAuthMiddleware before the route handler for additional security
router.use(LossAccessorAuthMiddleware);


// Adjust the `upload.fields()` to accept file arrays (supporting documents, supporting images)
router.post('/',
    upload.fields([
        { name: 'supportingDocuments', maxCount: 20 },
        { name: 'supportingImages', maxCount: 20 },
        { name: 'salvageImages', maxCount: 40 },
    ]),
    (req, res, next) => {
        console.log('Files:', req.files); // Log uploaded files
        console.log('Body:', req.body); // Log form data
        next();
    },
    createQuotation
);



// Get all quotations
router.get("/", LossAccessorAuthMiddleware, getQuotations);
router.get("/report/:id", LossAccessorAuthMiddleware, Get_Quotation_Report);

// Get a single quotation by ID
router.get("/:id", LossAccessorAuthMiddleware, getQuotationById);


module.exports = router;