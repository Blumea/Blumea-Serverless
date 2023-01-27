const express = require('express')
const router = express.Router()

const { defaultClassicalBloomController, classicalBloomSearchController, classicalBloomCreateController } = require('../controllers/classicalbloom.controller')

router.get('/', defaultClassicalBloomController)

router.get('/search', classicalBloomSearchController)

router.get('/create', classicalBloomCreateController)

module.exports = router;