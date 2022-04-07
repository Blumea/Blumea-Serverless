/**
 * copyright: @github.com/Blumea  
 * authors: @akashchouhan16 @singhtaran1005
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

// Server logs:
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', (NODE_ENV === 'development')? {stream:  accessLogStream}: null));

// middlewares
app.use(cors());
app.use(express.json())

// routes
app.get('/', (req,res)=>{
    res.json({status: 200, message: 'Welcome to Blumea APIs'})
})

const supportRoute = require("./routes/support.route")
const homeRoute = require("./routes/home.route")
const searchRoute = require("./routes/search.route")
const feedbackRoute = require("./routes/feedback.route")

app.use("/api",supportRoute) 
app.use("/api",homeRoute) 
app.use("/api",searchRoute) 
app.use("/api",feedbackRoute) 


// Server listen
app.listen(PORT, ()=>{
    const DEVELOPMENT_LOG = {
        status: 'Live',
        base_url: `http://localhost:${PORT}/`
    }
    if(process.env.NODE_ENV !== 'production')
        console.table(DEVELOPMENT_LOG);  
})