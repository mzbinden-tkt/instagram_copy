const express = require('express')
const server = express()
const router = express.Router()

server.use(express.json())

require('../routes')(server)

module.exports = server
