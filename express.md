
# Material

[bilibili的一个黑马的教程] https://www.bilibili.com/video/BV1Ns411N7HU?from=search&seid=15274980466092256358

[bilibili,1小时搞定NodeJs(Express)的用户注册、登录和授权] https://www.bilibili.com/video/BV1Nb411j7AC?from=search&seid=4522291517950492672

[求知网的一个node方面的教程] https://www.qiuzhi99.com/playlists?q%5Bnode_id_eq%5D=2


[mooc的一个教]  "Node.js 从零开发web server博客项目"

[易百网站的一个系列文章] https://www.yiibai.com/nodejs/nodejs_express_framework.html


[b站一个人自己发的教程] https://www.bilibili.com/video/BV1HV41127db?p=47

[一个人的实战视频] https://www.bilibili.com/video/BV1T7411g73H?p=62


https://www.bilibili.com/video/BV1ca4y1n7u3?p=95


[一个人的博客文章](https://www.cnblogs.com/500m/category/1477365.html)

[知乎一个文章讲, express核心原理](https://zhuanlan.zhihu.com/p/56947560)


Vue + Node 前后端商城项目  [https://www.bilibili.com/video/BV1vJ411s7dR?p=148]






# Q_A

- ? > express 中的ues()函数作用



- app.use(express.json()) 失效的bug

    app2.js 测试失效问题, 没解决,最后用了中间件 require('body-parser')

## 模板从前端拿到的数据渲染数据格式


- bug ? > 从mongo里面拿到的数据log出来的每个文章id是字符串不带引号的.而发送到前端,　art 输出的时候就是带双引号的字符串,不知道那一个环节有问题.

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




# Learning Log start

### 项目初始化

```js
 npm init 
```



### 常规拿参数的知识点

/path/:id,参数在req.params.id中
/path?id=xx,参数在req.query.id中

用json body 或者form 表单传参时参数在req.body中



### express delete 请求


app.delete()

- express delete路由的知识点

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



###  其中 * express路由中间件 *

[官网提供的Router 件](https://expressjs.com/zh-cn/guide/using-middleware.html#middleware.router)
没有太多的讲解。看router.js 


### ? > * app.render(view, [locals], callback) * 知识点

后端发往前端的数据本质全部都是字符串, 在不使用静态资源功能的情况下直接使用最原始的 node 的fs模块
拿到html文件, 解析出来的是字符串, 发送给前端的是html格式的字符串.但是这样代码写起来很麻烦
```js 
app.get('/', (req, res) =>{
    fs.readFile('public/views/index.html', (err, data) => {
        if (err) return res.send(`500 服务器发生错误`)
        // Node读取文件的时候都是Buffer的数据是node特有的一种方便他们读写数据更快之类的优势
        // 所以用node拿数据的时候 要转换一下数据 或者readFile 添加一些参数也能做到,
        res.send(toString(data))
    })
})

而且这种 读取文件的操作还会出现异步 同步的问题, 7day 黑马教程有讲 done > 现在对异步有了新的理解了。这个问题不存在了。

```


## 配置静态文件 * express.static *

[官网](https://expressjs.com/zh-cn/starter/static-files.html)

```js
server.use(express.static(path.join(__dirname, 'public')))
使用这种简写的配置静态文件, url那边直接 : http://127.0.0.1:3000/index.html 
就可以访问到页面
```

记得引入path

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static(path.join(__dirname, 'node_modules')))

验证静态服务是否正确使用了 http://localhost:5000/about.html




### 关于路径的一个小坑

```js
const path = require('path')
```

? > done > 这里有个坑, 是node 读取文件的时候凡是路径, 大概会遇到绝对路径和相对路径的坑,和app.js运行的时候cmd当前的路径有关系(似乎).解决办法就是使用绝对路径 path模块 

### 配置模板引擎

```js
    - 这样写,render的时候需要加后缀
    app.engine('html', require('express-art-template'))

```

### ? > done > 需要配置模板引擎才能用 app.render() , 否则就没有render这个函数来使用

[别人的文章](https://www.cnblogs.com/chyingp/p/express-render-engine.html)

[别人关于模板引擎的文章](https://www.cnblogs.com/500m/p/10980332.html)

安装art-template模板引擎

npm i art-template && express-art-template

配置 >　
``` js
    //当渲染的文件是 以.html 后缀名的 使用express-art-template引擎
    app.engine('html', require('express-art-template'))
    //修改 views默认的存储目录
    server.set('views', path.join(__dirname, './public/views/')) 
    // 默认就是 ./views 目录

```


### 常用代码关于注册功能的函数

### ? >  mongoose方面如何实例化Schema (类), 保存

```js 
有一个是这样写的. 
app.post('/api/register', async (req, res) => {
    console.log(req.body)
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    // 也可以,但是不安全
    // const user = User.create(req.body)
    res.send(user)
    console.log(user)
})

另外一个人这样
router.post('/register', function (req, res, next) {
  // 1. 获取表单提交的数据
  //    req.body
  // 2. 操作数据库
  //    判断改用户是否存在
  //    如果已存在，不允许注册
  //    如果不存在，注册新建用户
  // 3. 发送响应
  var body = req.body
  User.findOne({
    $or: [{
        email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  }, function (err, data) {
    if (err) {
      // return res.status(500).json({
      //   success: false,
      //   message: '服务端错误'
      // })
      return next(err)
    }
    // console.log(data)
    if (data) {
      // 邮箱或者昵称已存在
      return res.status(200).json({
        err_code: 1,
        message: 'Email or nickname aleady exists.'
      })
      return res.send(`邮箱或者密码已存在，请重试`)
    }

    // 对密码进行 md5 重复加密
    body.password = md5(md5(body.password))

    new User(body).save(function (err, user) {
      if (err) {
        return next(err)
      }

      // 注册成功，使用 Session 记录用户的登陆状态
      req.session.user = user

      // Express 提供了一个响应方法：json
      // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })

      // 服务端重定向只针对同步请求才有效，异步请求无效
      // res.redirect('/')
    })
  })
})

```









### 使用　body-parser 方便拿到表单数据





### session 方面:

https://wiki.jikexueyuan.com/project/node-lessons/cookie-session.html

cookie session token:

https://segmentfault.com/a/1190000039303557?utm_source=sf-related

https://www.cnblogs.com/JamesWang1993/p/8593494.html


? > express 的 app.locals 与res.locals是什么，有什么用？
https://cnodejs.org/topic/579ab34af0d4b46026ba55eb



### router方面

/**
 * https://expressjs.com/zh-cn/guide/using-middleware.html
 * 
 * 其实最开始看官网并不能看出其中的妙处.
 * 
 * app.get 可以看做是特殊的app.use() ,因为它的特殊,限定了方法,所以,中间件函数的必须放进去一个函数进去
 * 而不是想use那种可以用一个router实例来接受处理.
 * 
 * 
 */

### 中间件

app.use('/admin', adminRouter)  
// app.use() 可以用来当做路由拦截一样的东西,门, 当解析到有/admin就走这里面的路由

app.use(function(req, res, next) {
    //注意这里的位置关系.如果我把这里写到被截取的路由后面了.那在解析到这一行之后就已经被别的中间件
    // 拦截了.这一行也不会被执行.
    console.log('* route')
    next()
})



### 一个简单的通用模板

```js

// 通用模板

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

// app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

// 配置模板引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './public/views/')) 


//配置表单的中间件,方便拿数据
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/registerPage', function(req, res) {
    //再次确定不是form表单的问题 , 我TM 了. 怎么就拿不到前端的数据呢？
    res.render('register.html')
})

app.post('/register', (req, res) => {
    // 在服务器，可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据
    // 默认情况下，如果不配置解析表单数据中间件，则 req.body 默认等于 undefined
    console.log(req.body)
    res.send('ok')
})

app.listen(4000, () => {
    console.log('running http://127.0.0.1:4000/')
})

```   

### 关于flash 信息

keyWord : express 添加flash信息

基于 session 来实现跳转页面还能保留一些信息

npm i express-session

npm i connect-flash 

npm i express-messages   这个库需要 connect-flash 

这里 express-messages 基于 express-session 和 connect-flash 中间件上的.最好不要用了。搞不明白.



# end 
User.db.dropCollection('users')