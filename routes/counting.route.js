const express = require('express')
const router = express.Router()

const { defaultCountingBloomController, countingBloomSearchController, countingBloomCreateController, countingBloomGetAllItemsController } = require('../controllers/countingbloom.controller')

router.get('/', defaultCountingBloomController)

router.get('/search', countingBloomSearchController)

router.post('/create', countingBloomCreateController)

router.get('/all', countingBloomGetAllItemsController)

// fallbacks:
router.get('/*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: `Invalid get request`
    })
})
router.post(`/*`, (req, res) => {
    res.status(404).json({
        status: 404,
        message: `Invalid post request`
    })
})

module.exports = router;