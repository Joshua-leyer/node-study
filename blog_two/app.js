const express = require('express')
// const session = require('express-session')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const port = 5001


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



app.use(cookieParser());

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views')) 


mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, function(err) {
    if (err) {
        console.log('mongodb connect error :', err)
    }
    console.log('mongoose connect success!!!')
})


const HomeRouter = require('./routes/home')
const AdminRouter = require('./routes/admin')

app.use('/', HomeRouter)
app.use('/admin', AdminRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
