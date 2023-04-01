const { CountingBloomFilter } = require('blumea');
var filter;
const defaultConfig = {
    itemCount: 10000,
    fpRate: 0.01
}

const createDefaultFilterInstance = (_itemCount, _fpRate) => {
    try {

        const itemCount = _itemCount ? _itemCount : defaultConfig.itemCount; //10K items
        const fpRate = _fpRate ? _fpRate : defaultConfig.fpRate; //1% false positive rate
        console.log('Creating CountingBloomFilter instance (Item, rate): ' + itemCount + ', ' + fpRate);
        return new CountingBloomFilter(itemCount, fpRate);
    } catch (err) {
        console.warn(err);
        return null;
    }
}

const defaultCountingBloomController = (req, res) => {

    try {
        let itemCount = defaultConfig.itemCount, fpRate = defaultConfig.fpRate;
        if (req.query.itemcount && req.query.fprate) {
            itemCount = req.query.itemcount;
            fpRate = req.query.fprate;
        }
        filter = createDefaultFilterInstance(itemCount, fpRate);
        return res.status(200).json({
            status: 200,
            message: 'Bloom Filter (Counting) API. Filter Instance creation success.',
            data: {
                instance: 'BloomFilter - Counting',
                itemcount: itemCount,
                falsepositiverate: fpRate
            }
        })
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Bloom Filter (Counting) could not be initiated. Internal Server Error.',
            data: {}
        })
    }

}
const countingBloomSearchController = (req, res) => {
    try {
        const item = req.query.item || req.params.item || null;

        if (!filter) {
            let itemCount = defaultConfig.itemCount, fpRate = defaultConfig.fpRate;
            if (req.query.itemcount && req.query.fprate) {
                itemCount = req.query.itemcount;
                fpRate = req.query.fprate;
            }
            filter = createDefaultFilterInstance(itemCount, fpRate);
        }

        if (item === null || item === undefined) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request (400). No item provided with the request.',
                data: {}
            })
        } else if (item && filter.find(item)) {
            return res.status(200).json({
                status: 200,
                message: `item @${item} exists.`,
                data: {
                    isfound: true,
                    error: null
                }
            })
        } else {
            return res.status(200).json({
                status: 200,
                message: `item @${item} was not found.`,
                data: {
                    isfound: false,
                    error: null
                }
            })
        }
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Internal Server Error.',
            data: {
                isfound: false,
                error: err
            }
        })
    }
}
const countingBloomCreateController = (req, res) => {
    try {
        if (!filter) {
            let itemCount = defaultConfig.itemCount, fpRate = defaultConfig.fpRate;
            if (req.query.itemcount && req.query.fprate) {
                itemCount = req.query.itemcount;
                fpRate = req.query.fprate;
            }
            filter = createDefaultFilterInstance(itemCount, fpRate);
        }
        const item = req.query.item || req.params.item || null
        if (item === null || item === undefined || item === '') {
            return res.status(400).json({
                status: 400,
                message: 'Client Error. No item provided with the request.',
                data: {}
            })
        }

        if (filter.find(item) === false) {
            filter.insert(item);
            return res.status(201).json({
                status: 201,
                message: `Item @${item} created.`,
                data: {
                    iscreated: true,
                    error: null
                }
            })
        } else {
            return res.status(403).json({
                status: 403,
                message: `Item @${item} cannot be created.`,
                data: {
                    iscreated: false,
                    error: `${item} already exits.`
                }
            })
        }

    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Internal Server Error. [item could not be created]',
            data: {
                iscreated: false,
                error: err
            }
        })
    }
}
module.exports = { defaultCountingBloomController, countingBloomSearchController, countingBloomCreateController }