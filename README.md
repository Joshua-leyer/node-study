# other home 

- 博客园的一个文章 : [https://www.cnblogs.com/peiyu1988/p/8032982.html]

[https://www.cnblogs.com/peiyu1988/p/8192066.html]

[https://www.cnblogs.com/peiyu1988/tag/nodejs/]

- 关于libuv 的一个gitbook [http://luohaha.github.io/Chinese-uvbook/source/introduction.html]


# express 

mongoose : https://www.cnblogs.com/aaronjs/p/4489354.html

# learning log

mongoose :

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


- 假如注册了同名的用户了. 数据校验在mongoose unique来完成。最终数据库的错误如何捕获,并对错误识别.返回给前端.?


- ？？？ app路由和router路由的区别,权限级别

done > 一般教程使用router的时候,tmd

直接就是app.use(router); 草了他妈。。本来这个函数还有别功能,他直接这样讲,
等于少了多少知识.草. 

a = app.Router()
a.get('put', function(){ })

看上面的和这样用. app.use('/admin', a)

加上上面的问题， 有没有一点理解. 根本上router确实是官网讲的,中间件.

等于app use使用了router来解析第一个参数的路径

不知道那些b教程为啥从来都不讲.

`
app.use(path,callback)中的callback既可以是router对象又可以是函数

app.get(path,callback)中的callback只能是函数,不能是引入的

`


//注意这种拦截器作用的 中间件的 code的位置很关键.
```js
serve.use('*', function(req, res, next) {
    console.log('use my router middleware')
    res.send('router use ok!')
})
```



昨天的问题, 今天闲了才解决. 
router.get('art/', function(){})

router.get('art/:id, functoin(){})

我把第二个router 当做是req,params 里面那参数了.理解错了

!!! 这里需要去了解一下req.params 和req.body  、 req.query 区别.

1.req.params   get

所对应的url长这个样子 http://localhost:3000/10


2.req.query    get

所对应的url长这个样子http://localhost:3000/?id=10

app.get("/",function (req,res) {
    res.send(req.query["id"]);
});


3.req.body   是post请求的拿到的方法

req.body.name , req.body.age


[https://blog.csdn.net/weixin_40522523/article/details/97190796]




# metratial


[https://blog.csdn.net/weixin_40522523/article/details/97190796]