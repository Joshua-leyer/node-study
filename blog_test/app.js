const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000


// 解析 application/json
app.use(bodyParser.json()); 
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

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

