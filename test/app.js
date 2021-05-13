const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const server = express()

// const router = express.Router()



server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, function(err) {
    if (err) {
        console.log('mongodb connect error :', err)
    }
    console.log('mongoose connect success!!!')
})



server.get('/', function(req, res) {
    // res.send('joshua')
    // var new_student = new Student({name:'joshua'})
    res.send('ok index')
})


const webRouter = require('./router/web')
const articleRouter = require('./router/admin')


server.use('/', webRouter)
server.use('/articles', articleRouter)

// server.use('/', AdminRouter)
// server.use('/articles', AdminRouter)


server.listen(3000, () => {

    console.log('http://localhost:3000')
})



