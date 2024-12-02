const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/config');
require('dotenv').config();

// router declaration
const AdminAuth = require('./router/Admin/Auth');
const Module = require('./router/Admin/module');
const AdminCompany = require('./router/Admin/Company');
const Permission = require('./router/Admin/permission');



// insurance company routers declaration 

const CompanyAuth = require('./router/insurance_company/Auth');
const CompanyAccessor = require('./router/insurance_company/Loss_accessor');
const Company_Quotation = require('./router/insurance_company/Quotation');


const AccessorAuth = require('./router/LossAccessor/Auth');
const Accessor_Quotation = require('./router/LossAccessor/Quotation');


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
app.use(cookieParser());
app.use(express.json({ limit: '100mb' })); // for JSON requests
app.use(express.urlencoded({ extended: true, limit: '100mb' })); // for URL-encoded requests

const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true); // Allow all origins
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true, // Allow cookies
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// Serve static files with CORS headers
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, path) => {
        res.set('Access-Control-Allow-Origin', '*'); // Allow all origins to access static files
        res.set('Access-Control-Allow-Methods', 'GET'); // Allow only GET requests
        res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    }
}));

// Router usage
app.use('/api/admin/auth', AdminAuth);
app.use('/api/admin/module', Module);
app.use('/api/admin/company', AdminCompany);
app.use('/api/admin/permission', Permission);



// insurance company routers usage

app.use('/api/company/auth', CompanyAuth);
app.use('/api/company/loss-accessor', CompanyAccessor);
app.use('/api/company/quotation', Company_Quotation);



// Loss Accessor company routers usage

app.use('/api/LossAccessor/auth', AccessorAuth);

app.use('/api/LossAccessor/quotation', Accessor_Quotation);



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