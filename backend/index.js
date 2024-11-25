require('dotenv').config();
const express = require('express');
const sequelize = require('./config/config');
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rateLimiter = require('./Middleware/security/rateLimiter');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const xssClean = require("xss-clean");

const app = express();

// Middleware
app.use(helmet()); // Helps set secure HTTP headers
app.use(xssClean()); // Prevents cross-site scripting (XSS) attacks
app.use(rateLimiter); // Rate limiting to prevent DDoS attacks
app.use(cookieParser());
app.use(express.json()); // Parses JSON requests
app.use(express.urlencoded({ extended: true }));


// Increase limits for body-parser to handle large requests
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));

// CORS configuration to allow frontend communication
const corsOptions = {
    origin: "http://localhost:5173", // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true, // Enable cookies and credentials sharing
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// Serve static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Sync the database with Sequelize
sequelize.sync({ force: true })
    .then(() => console.log('Database synced successfully'))
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Internal server error occurred');
});



app.get('/api', (req, res) => {

    res.json({ message: 'nukuri kwimanmdfnsdma ni danger ' });

})



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});