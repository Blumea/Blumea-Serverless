const express = require('express')
const router = express.Router()

const { bloomFilterBasic } = require('blumea');
var filter;

const createDefaultFilterInstance = (_itemCount = null, _fpRate = null) => {
    try {
        console.log('Creating BloomFilter instance (Item, rate): ' + _itemCount + ', ' + _fpRate);
        const itemCount = _itemCount || 10000; //10K items
        const fpRate = _fpRate || 0.01; //1% false positive rate
        return new bloomFilterBasic(itemCount, fpRate);
    } catch (err) {
        console.warn(err);
        return null;
    }
}

router.get('/', (req, res) => {

    try {
        filter = createDefaultFilterInstance(req.query.itemcount, req.query.fprate);
        res.status(200).json({
            status: 200,
            message: 'Bloom Filter (Classic) API. Filter Instance creation success.',
            data: {
                instance: 'BloomFilter - Classic',
                itemcount: itemCount,
                falsepositiverate: fpRate
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Bloom Filter (Basic) could not be initiated. Internal Server Error.',
            data: {}
        })
    }

})

router.get('/search', (req, res) => {
    try {
        const item = req.query.item || req.params.item || null;

        if (filter === undefined || filter === null || filter === null) {
            filter = createDefaultFilterInstance(req.query.itemcount, req.query.fprate);
        }

        if (item === null || item === undefined) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request (400). No item provided with the request.',
                data: {}
            })
        } else if (item && filter.find(item)) {
            res.status(200).json({
                status: 200,
                message: `item @${item} exists.`,
                data: {
                    isfound: true,
                    error: null
                }
            })
        } else {
            res.status(200).json({
                status: 200,
                message: `item @${item} was not found.`,
                data: {
                    isfound: false,
                    error: null
                }
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong. Internal Server Error.',
            data: {
                isfound: false,
                error: err
            }
        })
    }
})

router.get('/create', (req, res) => {
    try {
        if (filter === undefined || filter === null || filter === null) {
            filter = createDefaultFilterInstance(req.query.itemcount, req.query.fprate);
        }
        const item = req.query.item || req.params.item || null
        if (item === null || item === undefined || item === '') {
            res.status(400).json({
                status: 400,
                message: 'Client Error. No item provided with the request.',
                data: {}
            })
        }

        if (filter.find(item) === false) {
            filter.insert(item);
            res.status(201).json({
                status: 201,
                message: `Item @${item} created.`,
                data: {
                    iscreated: true,
                    error: null
                }
            })
        } else {
            res.status(403).json({
                status: 403,
                message: `Item @${item} cannot be created.`,
                data: {
                    iscreated: false,
                    error: `${item} already exits.`
                }
            })
        }

    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong. Internal Server Error. [item could not be created]',
            data: {
                iscreated: false,
                error: err
            }
        })
    }
})

module.exports = router;