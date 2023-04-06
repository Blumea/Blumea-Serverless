const express = require('express')
const router = express.Router()

/* Template API route */
router.get('/', (req, res) => {
    res.json({
        statusCode: 200,
        message: 'Welcome to Blumea APIs!',
        data: {
            apis: [
                feedbackService = [`POST /api/feedback`],
                mailService = [
                    generation = 'POST /api/mail/generate',
                    verification = `GET /api/mail/verify/:token`,
                ],
                classicalBloom = [
                    create = `GET /classicalbloom/create?item=`,
                    search = `GET /classicalbloom/search?item=`
                ],
                partitionedBloom = [
                    create = `GET /partitionedbloom/create?item=`,
                    search = `GET /partitionedbloom/search?item=`
                ],
                countingBloom = [
                    create = `GET /countingbloom/create?item=`,
                    search = `GET /countingbloom/search?item=`
                ],
                cuckooBloom = [
                    create = `GET /cuckoobloom/create?item=`,
                    search = `GET /cuckoobloom/search?item=`
                ]
            ]
        }
    })
}
)
module.exports = router;