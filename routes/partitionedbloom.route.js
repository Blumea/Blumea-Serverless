const express = require('express')
const router = express.Router()

const { defaultPartitionedBloomController, partitionedBloomSearchController, partitionedBloomCreateController, partitionedBloomGetAllItemsController } = require('../controllers/partitionedbloom.controller')

router.get('/', defaultPartitionedBloomController)

router.get('/search', partitionedBloomSearchController)

router.post('/create', partitionedBloomCreateController)

router.get('/all', partitionedBloomGetAllItemsController)

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