const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));


app.engine('html', require('express-art-template'))

mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, function(err) {
    if (err) {
        console.log('mongodb connect error :', err)
    }
    console.log('mongoose connect success!!!')
})


const router = require('./routes.js')

app.use('/', router)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

