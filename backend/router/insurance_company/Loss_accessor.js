const express = require("express");
const multer = require('multer');

const {
    createLossAccessor,
    getLossAccessors,
    getLossAccessorById,
    updateLossAccessor,
    deleteLossAccessor
} = require("../../controller/Insurance_Company/Loss_Accessor");
const InsuranceAuthMiddleware = require('../../Middleware/security/insurance_company'); // Middleware for security
const router = express.Router();

// Multer configuration for file uploads (lossAccessorLogo)
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

// Create a new loss accessor (with logo upload)
router.post('/', InsuranceAuthMiddleware, upload.single('lossAccessorLogo'), createLossAccessor);

// Get all loss accessors
router.get("/", InsuranceAuthMiddleware, getLossAccessors);

// Get a single loss accessor by ID
router.get("/:id", InsuranceAuthMiddleware, getLossAccessorById);

// Update a loss accessor (with logo upload)
router.put("/:id", InsuranceAuthMiddleware, upload.single('lossAccessorLogo'), updateLossAccessor);

// Delete a loss accessor
router.delete("/:id", InsuranceAuthMiddleware, deleteLossAccessor);

module.exports = router;