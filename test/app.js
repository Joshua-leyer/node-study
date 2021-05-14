const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const serve = express()

const router = express.Router()


// 解析 application/json
serve.use(bodyParser.json()); 
// 解析 application/x-www-form-urlencoded
serve.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, function(err) {
    if (err) {
        console.log('mongodb connect error :', err)
    }
    console.log('mongoose connect success!!!')
})


const { Student } = require('./mongo')

// let db = mongoose.connection
// db.once('open', function(){
//     console.log('connected successed')
// })

// db.on('error', function(err) {
//     console.log(err)
// })


serve.get('/', function(req, res) {
    // res.send('joshua')
    // var new_student = new Student({name:'joshua'})
    res.send('ok index')
})


const { Article } = require('./mongo.js')
serve.post('/articles/add', function(req, res) {
    //实例化操作
    var one = new Article({
        title: 'Felyne',
        author: 'joshua',
        body: 'jasdiofpasdj'
    });

    one.save(function(err, doc) {
        if (err) throw err;
        console.log('save success : ', doc)
    });

    // 上面 new , save 两个函数相当于一个 create
    // const itemAdd = async (req, res, next) => { // 简化演示一个请求路由回调函数，后面都省略这一外部包裹
    //     const result = Model.create({name: 'xxx'})
    //     console.log(result instanceof Promise) // true
    //      // 通过 await 获得 Promise 的返回值
    //     const doc = await Model.create(req.body)
    //     console.log(doc) // 返回被成功保存的这条数据
    // }

        // Student.create({name:'joshau'}, function(err, data) {
        //     if (err) return err;
        //     console.log(data)
        // })


    // ?? 尝试用 promise 或者 async 的写法来写. 


})

serve.get('/articles', function(req, res) {
    Article.find({}, function(err, data) {
        if (err) throw err;
        console.log('find data is : ', data)
        res.send(data)
    })
})

serve.post('/articles/create', function(req, res) {

    // let article = new Article(req.body) , 在保证数据格式一致的情况可以
    console.log(req.body.title)
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err, data) {
        if (err) throw err;
        console.log('save data is', data)
        res.send(data)
    })
})


serve.get('/articles/:id', function(req, res) {

})

serve.listen(3000, () => {
    console.log('http://localhost:3000')
})



