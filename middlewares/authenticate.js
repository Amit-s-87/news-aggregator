const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../configs/env.config");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Missing Auth Header!" });
    }

    const token = authHeader?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticate };
