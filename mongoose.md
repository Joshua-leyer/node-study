
#### Learning Log

- MongoDB 基本命令
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

- mongoose 的理解目前在 OneNote 笔记本上有详细

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
    const itemAdd = async (req, res, next) => { // 简化演示一个请求路由回调函数，后面都省略这一外部包裹
        const result = Model.create({name: 'xxx'})
         // 通过 await 获得 Promise 的返回值
        const doc = await Model.create(req.body)
        console.log(doc) // 返回被成功保存的这条数据
    }

```

[mongoose 系列之三 create 创建文档](https://segmentfault.com/a/1190000021076280)



