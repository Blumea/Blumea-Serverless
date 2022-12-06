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
    path = require('path'),
    configs = require('./configs/config')

dotenv.config()
const app = express()
const HOST = configs.HOST
const PORT = configs.PORT
const NODE_ENV = configs.NODE_ENV

// imports:
const home = require("./routes/home.route")
const feedbackService = require("./routes/feedbackservice.route")

const classicalBloomService = require('./routes/classicalbloomservice.route')
const countingBloomService = require('./routes/countingbloomservice.route.js')

// server logs:
// let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// app.use(morgan('combined', (NODE_ENV === 'development') ? { stream: accessLogStream } : null));

// middlewares
app.use(cors());
app.use(express.json())
app.use("/api", home,feedbackService)
app.use("/bloomfilter", classicalBloomService)
app.use("/countingbloomfilter", countingBloomService)


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
app.listen(PORT, HOST, () => {
    const DEVELOPMENT_LOG = {
        STATUS: 'Live',
        NODE_ENV,
        HOST,
        PORT,
        BASE_URL: `http://${HOST}:${PORT}/`
    }
    if (process.env.NODE_ENV !== 'production')
        console.table(DEVELOPMENT_LOG);
})