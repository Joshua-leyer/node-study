# [官网](http://mongoosejs.net/docs/documents.html)



## other home


http://www.nodeclass.com/api/mongoose.html

[Mongoose学习参考文档](https://cnodejs.org/topic/504b4924e2b84515770103dd)

[Mongoose教程翻译](https://www.jianshu.com/p/594a1b73e54a)

=============================

# learning log


### 基本命令

- 基本操作

  启动 >>>  
  mongod  命令以前先创建db的文件夹   

  修改默认的存储路径:
  mongod --dbpah=路径

  停止 >>>
  ctrl + c

  连接 : 
  mongo 

  关闭连接 : 
  exit

  基本命令
    show dbs    查看所有的数据库(如果新建的数据库,里面没有内容,就看不到)
    db    当前正在操作的数据库
    use 数据库名字    
    show collections 查看通过new Schema({}) 设计的文档结构 目录 比如输出>> cat
    db.cats.find()




$ mongo
$ show dbs;
$ use nodejs-blog
$ db.createCollection('articles')
$ show collections;
$ db.articles.insert({ title: "Article One", author: "rails365", body: "This is article one" });
$ db.articles.find();
$ db.articles.insert({ title: "Article Two", author: "rails365", body: "This is article two" });
$ db.articles.find().pretty();




npm i mongoose

在login-demo1 里面练习 mongoose.js

这是官网首页的示例代码
```js 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

```

在另一个教程看到有一个人这样写 >

```js

const UserSchema = new mongoose.Schema({
    // username: String, 简写
    username: {type: String, unique: true},
    password: {
        type: String,
        //存储的时候设置一下  根据传进来的值进行处理 ,存储返回值
        set(val){   
            return require('bcrypt').hashSync(val, 10)
            // return val
        }
    }
})

const User = mongoose.model('User', UserSchema)


User.create({
        username: req.body.username,
        password: req.body.password
})

? >　不明白具体什么情况用什么
done > http://www.mongoosejs.net/docs/models.html ,在官网看model实例对象的时候看到了 官网给出的两种写法, 效果是一样的。看个人习惯

? > 不明白连接服务器的时候 传递的对象参数是什么意思
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

```


```js
上面的问题 官网代码> 
var Tank = mongoose.model('Tank', yourSchema);

var small = new Tank({ size: 'small' });
small.save(function (err) {
  if (err) return handleError(err);
  // saved!
})

// or

Tank.create({ size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
})

? > handleError() 试一下回头

```


## 通用模板

```js
  const mongoose = require('mongoose')

  mongoose.connect('mongodb://localhost/blogdemo1', {
      useMongoClient: true,
      useCreateIndex: true
  })

  var Schema = mongoose.Schema

  // 用户管理

  var UserSchema = new Schema({
      username: {
          type: String,
          required: true, // 必须接受到
          nuique: true  // 唯一性
      }
  })


  // module.exports = mongoose.model('User', userSchema)

  const User = mongoose.model('User', UserSchema)
  //那边接受的时候可以用解构的方式
  module.exports = { User } 

```



http://www.mongoosejs.net/docs/guide.html
对着官网文档写
`Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成。`
看这句话,想起一个文章
https://www.cnblogs.com/xiaohuochai/p/7215067.html

Schema、Model、Entity三者之间的关系

模型Model是根据Schema编译出的构造器，或者称为类，通过Model可以实例化出文档对象document.文档document的创建和检索都需要通过模型Model来处理


总体来说一个数据从头到尾的步骤就是三个阶段
Schema 类似加工厂, 看做是一个类  
相关的内容[官网](http://www.mongoosejs.net/docs/schematypes.html),
这里自己在写的时候注意到,一个知识点关于 关键词Schema Type选项
除了要设定type 属性 还有别的官网上面有.




在没有实例化模板 以及进行保存操作 数据库不会存储 设计的文档结构的

在没用通过mongodb 命令开启服务器,运行mongoose.js 会报错。里面的
```js

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

```
会连接不到服务器


关于CRUD 操作 官网是都放进mudels 模型那一个小结里面了, 因为所有这种操作的方式都是在模型(集合,本子，这是作者自己理解的一种方法)上操作的
http://www.mongoosejs.net/docs/models.html


关于查询  mongoose CRUD内容和mongodb一样, 看菜鸟上面简单案例

```js

是在model 上面操作的,而不是实例化的具体数据,最开始我就差点想错了
User.find(function(err, ret) {
    if (err) throw err
    console.log(ret)
})


User.find({
    username: '333'
}, function(err, ret) {
    if (err) throw err
    console.log(ret)
})

```


删除
```js

// User.remove({
//     username: '1234'
// }, function(err, ret) {
//     if (err) throw err
//     console.log(ret)
// })



Tank.remove({ size: 'large' }, function (err) {
  if (err) return handleError(err);
  // removed!
});
```


## mongoodb > :

[关于mongodb入手要了解的文章](https://jzleung.github.io/2016/08/13/mongoose-guide/)






