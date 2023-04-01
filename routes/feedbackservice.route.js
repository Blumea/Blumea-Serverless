const express = require('express')
const router = express.Router()

/* ToDo - Feedback Service for Blumea client */
router.get(
    '/', (req, res) => {
        res.status(200).json({
            status: 200,
            message: 'Blumea - Feedback service WIP'
        })
    }
)
router.post(
    '/', (req, res) => {
        const feedback = req.body.feedback
        console.log(feedback)
        res.json({
            'feedback': feedback
        });
    }
);

module.exports = router;