//对 中间件的理解 练习
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

// app.use(myLogger);

app.get('/', myLogger, function (req, res) {
  res.send('Hello World!');
});

app.get('/a', function(req, res) {
    res.send('no mylogger')
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
});