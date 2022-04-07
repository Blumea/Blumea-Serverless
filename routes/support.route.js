const express = require('express')
const router = express.Router()


router.post(
    '/support', (req, res) => {
        var query = req.body.query
        console.log(query)
        res.json({ status: 200, message: 'Feedback Sent' })
    }
)

module.exports = router;
