const express = require('express')
const router = express.Router()

const { defaultPartitionedBloomController, partitionedBloomSearchController, partitionedBloomCreateController } = require('../controllers/partitionedbloom.controller')

router.get('/', defaultPartitionedBloomController)

router.get('/search', partitionedBloomSearchController)

router.get('/create', partitionedBloomCreateController)

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