const expressSlowDown = require('express-slow-down');

//After 30 requests in a 2 min window, adds a subsequent response slow down of 500ms with each request.
let responseTimeLimiter = expressSlowDown({
    windowMs: 2 * 60 * 1000,
    delayAfter: 30,
    delayMs: 500
})

module.exports = responseTimeLimiter;