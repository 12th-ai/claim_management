const jwt = require('jsonwebtoken');

const LossAccessorAuthMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Adjust token extraction logic as necessary

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.accessor = decoded; // Attach user info to request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = LossAccessorAuthMiddleware;