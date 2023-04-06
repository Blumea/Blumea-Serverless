const express = require('express')
const router = express.Router()

const { generateTokenController, verifyEmailController } = require('../controllers/mail.controller')

const { validateAccess } = require('../middlewares/auth')

router.post('/generate', validateAccess, generateTokenController)

router.get('/verify/:token', verifyEmailController)


// fallbacks:
router.get('*', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Welcome to Blumea Mail Service!',
        data: {
            apis: [
                generate = 'POST: /api/mail/generate',
                verify = 'GET: /api/mail/verify/:token'
            ]
        }
    })
})


module.exports = router;