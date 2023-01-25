const expressSlowDown = require('express-slow-down');

//After 15 requests in a 2min window, adds a subsequent response slow down of 500ms with each request.
let responseTimeLimiter = expressSlowDown({
    windowMs: 2 * 60 * 1000,
    delayAfter: 15,
    delayMs: 500
})

module.exports = responseTimeLimiter;