const express = require('express');
const multer = require('multer');

const {

    Register,
    Login,
    GetProfile,
    Logout


} = require('../../controller/Admin/Auth/Auth');
const authMiddleware = require('../../Middleware/security/AdminAuth');
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



router.post('/register', upload.single('profileImage'), Register);

router.post('/login', Login);
router.get('/profile', authMiddleware, GetProfile);
router.post('/logout', authMiddleware, Logout);

module.exports = router;