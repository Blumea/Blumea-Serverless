const express = require('express')
const router = express.Router()


router.get('/search?:query', (req, res) => {
    try{
        const search_query = req.query.query;
        if(search_query === undefined || search_query === '')   
            throw new Error('undefined search query')

        console.log(search_query);
        res.json({ statusCode: 200, message: `Searching ... ${search_query}` })
    }catch(error){
        res.status(500).json({
            statusCode: 500,
            message: `Something went wrong. :(`,
            error: error.message
        })
    }
  }
)


module.exports = router;