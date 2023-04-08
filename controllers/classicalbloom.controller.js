const { BloomFilter } = require('blumea');
const { log, warn } = require('console');
var filter;
const defaultConfig = {
    itemCount: 10000,
    fpRate: 0.01
}

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
        return new BloomFilter(maxItemCount, adjustedFpRate);
    } catch (err) {
        warn(err);
        return null;
    }
}

const defaultClassicalBloomController = (req, res) => {

    try {
        let itemCount = defaultConfig.itemCount, fpRate = defaultConfig.fpRate;
        if (req.query.itemcount && req.query.fprate) {
            itemCount = req.query.itemcount;
            fpRate = req.query.fprate;
        }
        filter = createDefaultFilterInstance(itemCount, fpRate);
        if (!filter) {
            throw new Error('Bloom Filter instance could not be created.');
        }

        return res.status(200).json({
            status: 200,
            message: 'Bloom Filter (Classic) API. Optimal Filter Instance creation success.',
            data: {
                instance: 'classicalBloomFilter',
                itemcount: filter.items_count,
                falsepositiverate: filter.false_positive
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

const classicalBloomSearchController = (req, res) => {
    try {
        const item = req.query.item || req.params.item || null;

        if (!filter) {
            let itemCount = defaultConfig.itemCount, fpRate = defaultConfig.fpRate;
            if (req.query.itemcount && req.query.fprate) {
                itemCount = req.query.itemcount;
                fpRate = req.query.fprate;
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

const classicalBloomCreateController = (req, res) => {
    try {
        if (!filter) {
            let itemCount = defaultConfig.itemCount, fpRate = defaultConfig.fpRate;
            if (req.query.itemcount && req.query.fprate) {
                itemCount = req.query.itemcount;
                fpRate = req.query.fprate;
            }
            filter = createDefaultFilterInstance(itemCount, fpRate);
            //if the instance created is yet again null.
            if (!filter) {
                throw new Error('Bloom Filter instance could not be created.');
            }
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
            message: 'Internal Server Error',
            data: {
                iscreated: false,
                error: err.message
            }
        })
    }
}

module.exports = { defaultClassicalBloomController, classicalBloomSearchController, classicalBloomCreateController }