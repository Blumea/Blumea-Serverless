const express = require('express');
const app = express();
const port = process.env.PORT || 5001

app.post(
    '/api/support', (req, res) => {
        var query = req.body.query
        console.log(query)
        res.json({ status: 200, message: 'Feedback Sent' })
    }
)
app.listen(port, err => {
    if (err) {
        return console.log("Error", err);
    }
    console.log(`Listening on port ${port}`);
});
