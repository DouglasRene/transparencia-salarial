require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const https = require('https')
const fs = require('fs')

const port = process.env.PORT

app.use(express.json())

app.use(cors({credentials: true, origin: 'https://localhost:443'}))

//Routes
const router = require('./routes/Router.js')

app.use(router)

// app.listen(port)

var server = https.createServer({
    key: fs.readFileSync('/etc/pki/nginx/private/server.key'),
    cert: fs.readFileSync('/etc/pki/nginx/server.crt')
  }, app);

server.listen(port)