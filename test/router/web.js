const express = require('express')
const { Article } = require('./mongo')

const WebRouter = express.Router()


WebRouter.get('/', function(req, res) {
    res.send('index. hml')
})

WebRouter.get('/:id', function(req, res) {
    res.send('webrouter /id path')
})


module.exports = { WebRouter }
