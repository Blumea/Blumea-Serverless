const express = require('express')
const router = express.Router()

const { bloomFilterBasic } = require('blumea');
var filter;

router.get('/', (req, res) => {
    const itemCount = req.query.itemcount || 10000;  // 10,000 users or items
    const fpRate = req.query.fprate || 0.01;         //1% false positive rate

    try {
        filter = new bloomFilterBasic(itemCount, fpRate);
        res.status(200).json({
            'status': 200,
            'message': 'Bloom Filter (Basic) API. Filter Instance creation success.' + `[Item: ${itemCount}, Rate: ${fpRate}]`
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Bloom Filter (Basic) could not be initiated. Internal Server Error.'
        })
    }

})

router.get('/checkusername', (req, res) => {
    try {
        if (filter === undefined || filter === null || filter === null) {
            return res.status(403).json({
                status: 403,
                message: 'Client Error. Bloom filter instance was not created. Create instance at /bloomfilter'
            })
        }
        const username = req.query.username || req.params.username || null;
        if (username === null || username === undefined) {
            res.status(400).json({
                status: 400,
                message: 'Bad Request (400). No username provided with the request.'
            })
        } else if (username && filter.find(username)) {
            res.status(200).json({
                status: 200,
                message: `Username @${username} already exists.`
            })
        } else {
            res.status(200).json({
                status: 200,
                message: `Username @${username} is available.`
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong. Internal Server Error.'
        })
    }
})

router.get('/createusername', (req, res) => {
    try {
        if (filter === undefined || filter === null || filter === null) {
            return res.status(403).json({
                status: 403,
                message: 'Client Error. Bloom filter instance was not created. Create instance at /bloomfilter'
            })
        }
        const username = req.query.username || req.params.username || null
        if (username === null || username === undefined || username === '')
            throw new Error('username could not be created');

        filter.insert(username);
        res.status(203).json({
            status: 203,
            message: `username @${username} was created.`
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong. Internal Server Error. [username could not be created]'
        })
    }
})

module.exports = router;