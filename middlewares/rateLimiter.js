const expressLimit = require('express-rate-limit');

let rateLimiter = expressLimit({
    windowMs: 30 * 1000, // window size in ms
    max: 5, // Limit each IP to 5 requests per window of 30sec.
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = rateLimiter;