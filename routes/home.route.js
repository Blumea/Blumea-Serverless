const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
        res.json({ 
            statusCode: 200,
            message: 'Welcome to Blumea APIs!',
            routes: {
                support: `POST /api/support`,
                feedback: `POST /api/feedback`,
                search: `GET /api/search?query=` 
            } 
        })
    }
)
module.exports = router;