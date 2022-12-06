const express = require('express')
const router = express.Router()

/* Template API route */ 
router.get('/', (req, res) => {
        res.json({ 
            statusCode: 200,
            message: 'Welcome to Blumea APIs!',
            services: {
                classicalBloom: {
                    createService: `GET /bloomfilter/create?item=`,
                    searchService: `GET /bloomfilter/search?item=`
                },
                countingBloom:{
                    createService: `GET /countingbloomfilter/create?item=`,
                    searchService: `GET /countingbloomfilter/search?item=`
                },
                feedbackService: `WIP /api/feedback`,
                mailService: 'WIP /api/blumea-mail'
            } 
        })
    }
)
module.exports = router;