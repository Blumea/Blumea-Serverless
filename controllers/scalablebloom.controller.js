const { ScalableBloomFilter } = require('blumea');
const { v4: uuidv4 } = require('uuid');
const { log, warn } = require('console');
const { calculateSizeInBits, getTimeStamp } = require('../utils/index');

var filter;
const defaultConfig = {
    itemCount: 10000,
    fpRate: 0.01
}
// TODO: Update the List storage to Redis or MongoDB Atlas 
let itemList = [
    /**
     * itemId: string (guid)
     * item: string
     * size: Byte as String
     * created: Date
     * ttl: ms (milliseconds) - this will require a cron job to update ttl and delete item.
     * */
];

const validateInputs = (_itemCount, _fpRate) => {
    let updatedCount = Number(_itemCount);
    let updateRate = Number(_fpRate);

    log(`Pre-validation itemCount: ${updatedCount}, fpRate: ${updateRate}`);
    if (updatedCount < 1 || updatedCount >= 999999) {
        updatedCount = defaultConfig.itemCount;
    }
    if (updateRate < 0.001 || updateRate >= 0.999) {
        updateRate = defaultConfig.fpRate;
    }

    log(`Post-validation itemCount: ${updatedCount}, fpRate: ${updateRate}`);
    return { updatedCount, updateRate }
}

const createDefaultFilterInstance = (_itemCount, _fpRate) => {
    try {
        const { updatedCount, updateRate } = validateInputs(_itemCount, _fpRate);

        const itemCount = updatedCount || defaultConfig.itemCount; // 10K items
        const fpRate = updateRate || defaultConfig.fpRate; // 1% false positive rate

        const maxItemCount = Math.ceil(-1 * (itemCount * Math.log(fpRate)) / Math.pow(Math.log(2), 2));
        const adjustedFpRate = itemCount > maxItemCount ? fpRate * 2 : fpRate;

        log('Creating BloomFilter instance (Item, rate): ' + maxItemCount + ', ' + adjustedFpRate);
        return new ScalableBloomFilter(maxItemCount, adjustedFpRate);
    } catch (err) {
        warn(err);
        return null;
    }
}

const defaultScalableBloomController = (req, res) => {

    try {
        let itemCount = defaultConfig.itemCount, fpRate = defaultConfig.fpRate;
        if (req.query.itemcount || req.query.fprate) {
            itemCount = req.query.itemcount ? Number(req.query.itemcount) : itemCount;
            fpRate = req.query.fprate ? Number(req.query.fprate) : fpRate;
        }
        filter = createDefaultFilterInstance(itemCount, fpRate);
        if (!filter) {
            throw new Error('Bloom Filter instance could not be created.');
        }

        return res.status(200).json({
            status: 200,
            message: 'Bloom Filter (Scalable) API. Optimal Filter Instance creation success.',
            data: {
                instance: 'scalableBloomFilter',
                itemcount: filter.items_count,
                falsepositiverate: filter.false_positive,
                requiredcount: itemCount,
                requiredrate: fpRate
            }
        })
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: {
                error: err.message
            }
        })
    }
}

const scalableBloomSearchController = (req, res) => {
    try {
        const item = req.query.item || req.params.item || null;

        if (!filter) {
            let itemCount = defaultConfig.itemCount, fpRate = defaultConfig.fpRate;
            if (req.query.itemcount || req.query.fprate) {
                itemCount = req.query.itemcount ? Number(req.query.itemcount) : itemCount;
                fpRate = req.query.fprate ? Number(req.query.fprate) : fpRate;
            }
            filter = createDefaultFilterInstance(itemCount, fpRate);
            //if the instance created is yet again null.
            if (!filter) {
                throw new Error('Bloom Filter instance could not be created.');
            }
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
            message: 'Internal Server Error',
            data: {
                isfound: false,
                error: err.message
            }
        })
    }
}

const scalableBloomCreateController = (req, res) => {
    try {
        if (!filter) {
            let itemCount = defaultConfig.itemCount, fpRate = defaultConfig.fpRate;
            if (req.body.itemcount || req.body.fprate) {
                itemCount = req.body.itemcount ? Number(req.body.itemcount) : itemCount;
                fpRate = req.body.fprate ? Number(req.body.fprate) : fpRate;
            }
            filter = createDefaultFilterInstance(itemCount, fpRate);
            //if the instance created is yet again null.
            if (!filter) {
                throw new Error('Bloom Filter instance could not be created.');
            }
        }
        const item = req.body.item || req.query.item || null
        if (item === null || item === undefined || item === '') {
            return res.status(400).json({
                status: 400,
                message: 'Client Error. No item provided with the request.',
                data: {}
            })
        }

        if (filter.find(item) === false) {
            filter.insert(item);

            let itemObject = {
                _id: uuidv4(),
                item: item,
                type: typeof item,
                size: calculateSizeInBits(item) + ' B',
                created: getTimeStamp()
            }
            itemList.push(itemObject);

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
            message: 'Internal Server Error',
            data: {
                iscreated: false,
                error: err.message
            }
        })
    }
}

const scalableBloomGetAllItemsController = (req, res) => {
    res.status(200).json({
        status: 200,
        message: `Bloom Filter (Scalable) API - Item List`,
        data: {
            itemList
        }
    })
}

module.exports = { defaultScalableBloomController, scalableBloomSearchController, scalableBloomCreateController, scalableBloomGetAllItemsController }