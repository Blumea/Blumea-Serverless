const express = require('express')
const router = express.Router()

router.post(
    '/feedback', (req, res) => {
        const feedback = req.body.feedback
        console.log(feedback)
        res.json({
            'feedback': feedback
        });
    }
);

module.exports = router;