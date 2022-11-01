/*******************************************
 * copyright: @github.com/Blumea  
 * authors: @akashchouhan16 @singhtaran1005
 * *****************************************
*/

const cors = require('cors'),
    dotenv = require('dotenv'),
    express = require('express'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'development'

// imports:
const supportRoute = require("./routes/support.route")
const homeRoute = require("./routes/home.route")
const searchRoute = require("./routes/search.route")
const feedbackRoute = require("./routes/feedback.route")

const bloomFilter = require('./routes/filters/bloomfilter.basic.route')

// server logs:
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', (NODE_ENV === 'development') ? { stream: accessLogStream } : null));

// middlewares
app.use(cors());
app.use(express.json())
app.use("/api", supportRoute, homeRoute, searchRoute, feedbackRoute)
app.use("/bloomfilter", bloomFilter)


// routes
app.get('/', (req, res) => {
    res.json({ statusCode: 200, message: 'Welcome to Blumea APIs' })
})

// fallbacks:
app.get('/*', (req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: `Invalid get request`
    })
})
app.post(`/*`, (req, res) => {
    res.statusCode(404).json({
        statusCode: 404,
        message: `Invalid post request`
    })
})



// server listen
app.listen(PORT, () => {
    const DEVELOPMENT_LOG = {
        status: 'Live',
        base_url: `http://localhost:${PORT}/`
    }
    if (process.env.NODE_ENV !== 'production')
        console.table(DEVELOPMENT_LOG);
})