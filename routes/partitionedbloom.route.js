const express = require('express')
const router = express.Router()

const { defaultPartitionedBloomController, partitionedBloomSearchController, partitionedBloomCreateController } = require('../controllers/partitionedbloom.controller')

router.get('/', defaultPartitionedBloomController)

router.get('/search', partitionedBloomSearchController)

router.get('/create', partitionedBloomCreateController)


module.exports = router;