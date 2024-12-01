const express = require('express');
const multer = require('multer');

const {
    Login,
    GetProfile,
    Logout
} = require('../../controller/Insurance_Company/Auth');
const InsuranceAuthMiddleware = require('../../Middleware/security/insurance_company');
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


router.post('/login', Login);
router.get('/profile', InsuranceAuthMiddleware, GetProfile);
router.post('/logout', InsuranceAuthMiddleware, Logout);

module.exports = router;