const expressLimit = require('express-rate-limit');

let rateLimiter = expressLimit({
    windowMs: 60 * 1000, // 1min window
    max: 40, // Limit each IP to 40 requests per window.
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = rateLimiter;