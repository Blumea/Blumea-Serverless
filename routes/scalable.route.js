const express = require('express')
const router = express.Router()

const { defaultScalableBloomController, scalableBloomSearchController, scalableBloomCreateController, scalableBloomGetAllItemsController } = require('../controllers/scalablebloom.controller')

router.get('/', defaultScalableBloomController)

router.get('/search', scalableBloomSearchController)

router.post('/create', scalableBloomCreateController)

router.get('/all', scalableBloomGetAllItemsController)

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