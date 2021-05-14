# lerning log




## 配置静态文件

记得引入path
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

验证静态服务是否正确使用了 http://localhost:5000/about.html



## 拿到参数

/path/:id,参数在req.params.id中
/path?id=xx,参数在req.query.id中

用json body 或者form 表单传参时参数在req.body中



## mongoose crud操作


-关于更新操作
[这里去官网看到一些讲解](http://mongoosejs.net/docs/documents.html)
findByIdAndUpdate()


## express delete 请求


app.delete()

-express delete路由的知识点

? > 这里想到一个问题, jquery是如何实现 success 的判断的
```js
$.ajax({
    type: 'delete',
    url: '/article/' + id,
    success: function() {
        alert('Deleted article')
        window.location.href = '/'
    },
    error: function(err) {
        console.log(err)
    }

})

app.js >>>

app.delete('/article/:id', function(req, res) {
    let query = {_id: req.params.id}
    Article.remove(query, function(err) {
        if (err) throw err
        res.send('随便发送过去信息')
    })
})

```


## 关于flash 信息

keyWord : express 添加flash信息

基于 session 来实现跳转页面还能保留一些信息

npm i express-sesion

npm i express-messages   这个库需要 connect-flash 

npm i connect-flash 

## 表单验证方面

有一个 express-validator 


## 加密保存

https://github.com/kelektiv/node.bcrypt.js/

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

对上面代码的理解 > saltRounds 是一个类似密码种子一样, 这个是我们随便设定的, 
根据种子得到一个salt然后根据salt 和我们的明文密码 得到Hash 这个就可以当做最终密码用了
```js
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) throw err
        user.password = hash
    })
})
```

# ??

## 模板从前端拿到的数据渲染数据格式


bug ? > 从mongo里面拿到的数据log出来的每个文章id是字符串不带引号的.而发送到前端,　art 输出的时候就是带双引号的字符串,不知道那一个环节有问题.
```js 
    Article.find({}, function(err, articles) {
        if (err) throw err
        // 输出的所有Article 表的所有文章.
        console.log(articles)
    })
    
```
后端的内容拿到后发给前端模板引擎 , 显示出来就是 : "12sadi902134j"
本来想要的输出是 : 字符串格式就行了,可是一同吧双引号也输出出来了.
```html 
    <h3> {{ $index }} - <a href="article/{{ value._id }}">{{ value.title }}</a> </h3>
```
[别人类似的问题](https://segmentfault.com/a/1190000007818969)
总的来说是mongoose 返回数据类型的问题

done : 
前端 渲染时候{{ `${value.id}` }}  模板引擎写成这样 字符串的双引号就没有了 具体不清楚为什么
后端     item._id = item._id.toString() , toString() 一下


### 关于登录验证中间函数

在服务器返回响应时用return， 避免出现一次请求后，返回两次响应
在中间件写重定向的时候我直接next() , 忘记return 了 . 应该是return next()
但是我看别的教程以及官网的案例都是没有return . 具体的不清楚了。done...
刚才去看了一下官网,发现官网的中间件案例都挂到服务器上的所以直接next()就可以
而我
```js
function auth(req, res, next) {
    //核心是判断当前是否登录了
    if (req.session.user){
        return next()
    }
    res.redirect('/users/login')
}
```
把一个函数当做中间件,当然要return, 否则可能都不能完成这个函数,出不来。




# code
