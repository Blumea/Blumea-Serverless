const express = require('express')
const router = express.Router()

router.get('/support', (req,res)=>{
    res.status(200).redirect('/api')
})
router.post(
    '/support', (req, res) => {
        const query = req.body.query
        console.log(query)
        res.status(200).json({
             statusCode: 200,
             message: 'Feedback Sent'
       })
    }
)

module.exports = router;
