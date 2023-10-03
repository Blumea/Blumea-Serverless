const express = require('express')
const router = express.Router()

const { defaultCuckooBloomController, cuckooBloomSearchController, cuckooBloomCreateController, cuckooBloomGetAllItemsController } = require('../controllers/cuckoobloom.controller')

router.get('/', defaultCuckooBloomController)

router.get('/search', cuckooBloomSearchController)

router.post('/create', cuckooBloomCreateController)

router.get('/all', cuckooBloomGetAllItemsController)

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