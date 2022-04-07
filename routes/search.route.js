const express = require('express');
const app = express();
const port = process.env.PORT || 5003

app.get(
    '/api/search?:searchParam', (req, res) => {
        var searchParam = req.params.searchParam;
        res.send(searchParam);
        console.log(searchParam);
        res.json({ status: 200, message: 'Searching ... ' })
    }
)
app.listen(port, err => {
    if (err) {
        return console.log("Error", err);
    }
    console.log(`Listening on port ${port}`);
});
