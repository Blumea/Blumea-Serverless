const express = require('express')
const router = express.Router()

const { defaultCountingBloomController, countingBloomSearchController, countingBloomCreateController } = require('../controllers/countingbloom.controller')

router.get('/', defaultCountingBloomController)

router.get('/search', countingBloomSearchController)

router.post('/create', countingBloomCreateController)

// fallbacks:
router.get('/*', (req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: `Invalid get request`
    })
})
router.post(`/*`, (req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: `Invalid post request`
    })
})

module.exports = router;