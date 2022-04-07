const express = require('express');
const app = express();
const port = process.env.PORT || 5002
app.get('/a', (req, res) =>{
    res.json({message: 'ge'})
})
app.post(
    '/api/feedback', (req, res) => {
        const feedback = req.body.feedback
        console.log(feedback)
        res.json({
            'feedback': feedback
        });
    }
);
app.listen(port, err => {
    if (err) {
        return console.log("Error", err);
    }
    console.log(`Listening on port ${port}`);
});
