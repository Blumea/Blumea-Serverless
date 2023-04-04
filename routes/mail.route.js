const express = require('express')
const router = express.Router()

const { generateTokenController, verifyEmailController } = require('../controllers/mail.controller')

router.post('/generate', generateTokenController)

router.get('/verify/:token', verifyEmailController)


module.exports = router;