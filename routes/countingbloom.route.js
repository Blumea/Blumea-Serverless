const express = require('express')
const router = express.Router()

const { defaultCountingBloomController, countingBloomSearchController, countingBloomCreateController } = require('../controllers/countingbloom.controller')

router.get('/', defaultCountingBloomController)

router.get('/search', countingBloomSearchController)

router.get('/create', countingBloomCreateController)

module.exports = router;