const express = require('express');
const app = express();
const port = process.env.PORT || 5004

app.get(
    '/api', (req, res) => {
        res.json({ status: 200, message: 'Welcome to Blumea Home Page!' })
    }
)
app.listen(port, err => {
    if (err) {
        return console.log("Error", err);
    }
    console.log(`Listening on port ${port}`);
});
