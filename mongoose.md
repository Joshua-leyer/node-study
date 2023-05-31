# [官网](http://mongoosejs.net/docs/documents.html)



## other home


=============================

# Learning Log

##### mongoDB 基本命令

- 基本命令
```js
$ mongo
$ show dbs;
$ use nodejs-blog
$ db.createCollection('articles')
$ show collections;
$ db.articles.insert({ title: "Article One", author: "rails365", body: "This is article one" });
$ db.articles.find();
$ db.articles.insert({ title: "Article Two", author: "rails365", body: "This is article two" });
$ db.articles.find().pretty();
```


- 安装 npm i mongoose

href : [https://www.jianshu.com/p/d40f083a4735]

- 实例化保存文档操作
```js
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

    // ?? 尝试用 promise 或者 async 的写法来写. 

```

href : [https://segmentfault.com/a/1190000021076280]


这是官网首页的示例代码
```js 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

```

另一个写法 >

```js

const UserSchema = new mongoose.Schema({
    // username: String, 简写
    username: {type: String, unique: true},
    password: {
        type: String,
        // 存储的时候设置一下  根据传进来的值进行处理 ,存储返回值
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
done > http://www.mongoosejs.net/docs/models.html ,在官网看 model 实例对象的时候看到了 官网给出的两种写法, 效果是一样的。看个人习惯




关于 CRUD 操作 官网是都放进 mudels 模型那一个小结里面了, 因为所有这种操作的方式都是在模型(集合,本子，这是作者自己理解的一种方法)上操作的
http://www.mongoosejs.net/docs/models.html


