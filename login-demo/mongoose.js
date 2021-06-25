const mongoose = require('mongoose');

const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

/*
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

//创建模型 设计数据库
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });

kitty.save().then(() => console.log('meow'));

*/

var blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{body: String, date: Date}],
    date: {type: Date, default: Date.now},
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }

})

//设计文档结构,
var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
})

// 文档结构发布成模型
// 返回的是一个 模型,一个构造函数
// 第一个参数, 传入一个单词 , 第一个是大写
//                  mongoose 会自动吧大写名词字符串 => 小写的复数
//     命令行那边(回头拿数据的时候), 通过 show collections 命令查看的就是小写复数
// 第二个参数, 结构 Schema


var User = mongoose.model('User', userSchema)


/*
// 实例化一条数据
var one = new User({
    username: 'admin',
    password: '123',
    email: 'joshua@1532.com'
})

one.save(function(err, ret) {
    if (err) throw console.log('err')
    console.log(ret)
})

*/


User.find( function(err, ret) {
    if (err) throw err
    console.log(ret)
})


// User.remove({
//     username: '1234'
// }, function(err, ret) {
//     if (err) throw err
//     console.log(ret)
// })



// User.find({
//     username: '333'
// }, function(err, ret) {
//     if (err) throw err
//     console.log(ret)
// })

User.fondOne({
    username: '333',
    email: 'joahsu'
}, function(err, ret) {
    if (err) throw err
    console.log(ret)
})