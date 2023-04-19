const express = require('express')
const router = express.Router()

/* Template API route */
router.get('/', (req, res) => {
    res.json({
        status: 200,
        message: 'Welcome to Blumea APIs!',
        data: {
            apis: {
                feedbackService: {
                    feedback: `POST /api/feedback`
                },
                mailService: {
                    generation: 'POST /api/mail/generate',
                    verification: `GET /api/mail/verify/:token`,
                },
                classicalBloom: {
                    create: `POST /classical/create`,
                    search: `GET /classical/search?item=`
                },
                partitionedBloom: {
                    create: `POST /partitioned/create`,
                    search: `GET /partitioned/search?item=`
                },
                countingBloom: {
                    create: `POST /counting/create`,
                    search: `GET /counting/search?item=`
                },
                cuckooBloom: {
                    create: `POST /cuckoo/create wip`,
                    search: `GET /cuckoo/search?item= wip`
                },
                scalableBloom: {
                    create: `POST /scalable/create wip`,
                    search: `GET /scalable/search?item= wip`
                }
            }
        }
    })
}
)
// fallbacks:
router.get('/*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: `Invalid get request`
    })
})
router.post(`/*`, (req, res) => {
    res.status(404).json({
        status: 404,
        message: `Invalid post request`
    })
})

module.exports = router;