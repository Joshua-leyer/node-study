const express = require('express')
const session = require('express-session')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(cookieParser());

/* 这里是不使用express-messages */
const flash = require('connect-flash')
app.use(flash())

app.use(function (req, res, next) {
    res.locals.errors = req.flash('error').toString();
    res.locals.infos = req.flash('info').toString();
    next();
});


// app.use(require('connect-flash')());
// app.use(function (req, res, next) {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views')) 

// console.log('path is ', path.join(__dirname, './views'))

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

