require('dotenv').config({ path: __dirname + '/../.env' });
const { log, warn } = require('console');


const validateAccess = (req, res, next) => {

    try {
        const key = req.headers['x-api-key'];
        if (!key || key !== process.env.MASTER_ACCESS_APIKEY) {
            warn('API Key invalid or missing, Access blocked.');
            return res.status(401).json({
                status: 401,
                message: key ? 'Access denied - Invalid API Key' : 'Access Denied - No API Key provided',
                data: null
            })
        } else {
            // log('API Key validation success, access granted');
            next();
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error: API Key Validation failed.',
            data: {
                error: error.message
            }
        })
    }
}

const validateMailAccess = (req, res, next) => {
    try {
        const key = req.headers['x-api-key'];
        if (!key || key !== process.env.MAIL_ACCESS_APIKEY) {
            warn('Blumea Mail API Access Key invalid or missing, Access blocked.');
            return res.status(401).json({
                status: 401,
                message: key ? 'Access denied - Invalid API Key' : 'Access Denied - No API Key provided',
                data: null
            })
        } else {
            log('API Key validation success, access granted');
            next();
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error: API Key Validation failed.',
            data: {
                error: error.message
            }
        })
    }
}

module.exports = { validateAccess, validateMailAccess };