const express = require('express')
const router = express.Router()


router.get(
    '/search?:searchParam', (req, res) => {
        var searchParam = req.params.searchParam;
        res.send(searchParam);
        console.log(searchParam);
        res.json({ status: 200, message: 'Searching ... ' })
    }
)


module.exports = router;