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
    configs = require('./configs/config'),
    rateLimiter = require('./middlewares/rateLimiter'),
    responseTimeLimiter = require('./middlewares/responseTimeLimiter'),
    { validateAccess, validateMailAccess } = require('./middlewares/auth')

dotenv.config()
const app = express()
const HOST = configs.HOST
const PORT = configs.PORT
const NODE_ENV = configs.NODE_ENV

// imports:
const home = require("./routes/home.route")
const feedbackService = require("./routes/feedback.route")
const mailService = require('./routes/mail.route')

const classicalBloom = require('./routes/classical.route')
const partitionedBloom = require('./routes/partitioned.route')
const countingBloom = require('./routes/counting.route')
const scalableBloom = require('./routes/scalable.route')
const cuckooBloom = require('./routes/cuckoo.route')

// server logs:
// let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// app.use(morgan('combined', (NODE_ENV === 'development') ? { stream: accessLogStream } : null));

// middlewares
app.use(cors())
app.use(express.json())
app.use(rateLimiter)
app.use(responseTimeLimiter)

app.use('/api/mail', mailService);
app.use('/api/home', validateAccess, home)
app.use('/api/feedback', validateAccess, feedbackService)
app.use("/api/classical", validateAccess, classicalBloom)
app.use("/api/partitioned", validateAccess, partitionedBloom)
app.use("/api/counting", validateAccess, countingBloom)
app.use("/api/scalable", validateAccess, scalableBloom)
app.use("/api/cuckoo", validateAccess, cuckooBloom)


// routes
app.get('/', (req, res) => {
    res.json({ status: 200, message: 'Welcome to Blumea APIs' })
})

// fallbacks:
app.use('/api*', (req, res) => {
    res.redirect('/api/home')
})

app.get('/*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: `Invalid get request`
    })
})
app.post(`/*`, (req, res) => {
    res.status(404).json({
        status: 404,
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