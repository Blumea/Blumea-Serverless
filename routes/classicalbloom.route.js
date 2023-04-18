const express = require('express')
const router = express.Router()

const { defaultClassicalBloomController, classicalBloomSearchController, classicalBloomCreateController, classicalBloomGetAllItemsController } = require('../controllers/classicalbloom.controller')

router.get('/', defaultClassicalBloomController)

router.get('/search', classicalBloomSearchController)

router.post('/create', classicalBloomCreateController)

router.get('/all', classicalBloomGetAllItemsController)

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