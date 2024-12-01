const express = require('express');
const multer = require('multer');

const {
    Login,
    GetProfile,
    Logout
} = require('../../controller/Loss_Accessor/Auth');
const LossAccessorAuthMiddleware = require('../../Middleware/security/Loss_Accessor');
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
router.get('/profile', LossAccessorAuthMiddleware, GetProfile);
router.post('/logout', LossAccessorAuthMiddleware, Logout);

module.exports = router;