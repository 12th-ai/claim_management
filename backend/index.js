const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const cookieParser = require('cookie-parser');
const rateLimiter = require('./Middleware/security/rateLimiter');
const sequelize = require('./config/config');
require('dotenv').config();

// router declaration
const AdminAuth = require('./router/Admin/Auth');
const Module = require('./router/Admin/module');
const AdminCompany = require('./router/Admin/Company');
const Permission = require('./router/Admin/permission');


// Multer configuration for file uploads (profile images)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    }
});

// Increase file upload limit to 50MB (or any size suitable for your app)
const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit for uploads
});

const app = express();

// Middleware
app.use(helmet());
app.use(xssClean());
app.use(rateLimiter);
app.use(cookieParser());
app.use(express.json({ limit: '100mb' })); // for JSON requests
app.use(express.urlencoded({ extended: true, limit: '100mb' })); // for URL-encoded requests

// CORS configuration
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Router usage
app.use('/api/admin/auth', AdminAuth);
app.use('/api/admin/module', Module);
app.use('/api/admin/company', AdminCompany);
app.use('/api/admin/permission', Permission);

// Sync the database with Sequelize
sequelize.sync({ alter: true })
    .then(() => console.log('Database synced successfully'))
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Internal server error occurred');
});

// Basic route
app.get('/api', (req, res) => {
    res.json({ message: 'hello welcome to my api' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});