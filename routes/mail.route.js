const express = require('express')
const router = express.Router()

const { generateTokenController, verifyEmailController } = require('../controllers/mail.controller')

const { validateAccess } = require('../middlewares/auth')

router.post('/generate', validateAccess, generateTokenController)

router.get('/verify/:token', verifyEmailController)


// fallbacks:
router.get('/*', (req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: `Invalid get request`,
        data: {
            apis: [
                generate = 'POST: /api/mail/generate',
                verify = 'GET: /api/mail/verify/:token'
            ]
        }
    })
})
router.post(`/*`, (req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: `Invalid post request`,
        data: {
            apis: [
                generate = 'POST: /api/mail/generate',
                verify = 'GET: /api/mail/verify/:token'
            ]
        }
    })
})


module.exports = router;