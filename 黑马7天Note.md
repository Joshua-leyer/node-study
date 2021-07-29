

# day1

+ 核心模块

* require('./b.js') 来引用


node作用域 
没有全局作用域, 只有模块作用域, 各个文件之间,默认是封闭的
模块之间的通信:

 congole.log(exports) >  {}

- exports 默认是个空对象, 暴露给外面的文件需要挂在到exports对象上面
  var age = 18

  module.exports = car


- ip地址和端口号
理解端口号, 需要点计算机操作系统的知识


> 响应的内容只能是二进制数据和字符串

编码格式的确定
``` js
server.on('request', (req, res)=>{
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')

})
```

发送文件中的数据以及Content-Type 的内容类型


# 留言板



# day2 

- 初步实现apache功能

重定向: >
方式一:
res.statusCode = 302
res.setHeader('Location', '/')
方式二:
res.redirect('/')

word key: node.js 重定向

- npm install art-template   一个模板引擎

服务器渲染和客户端渲染区别
+ 客户端不利于ESO搜索引擎的优化
+ 服务端渲染可以被爬虫抓取到, 异步渲染的比较麻烦
+ 


- url 模块 ,方便我们解析url路径的
- node.js 自带http模块重定向方法


# day 3
- 模块系统
  + 核心模块
  + 第三方模块
- npm
- package.json
- Express
- MongoDB


CommonJS 模块规范
- 模块作用域 
- require加载  exports抛出
  + var 自定义名字 = require('模块名')
  + ```
    导出多个成员 >
      exports.a = 123
      exports.b = 'hello' 
    导出单个成员, 写多了会覆盖 >  
      module.exports = '对象名'
  + ```
module.exports = add

- 模块引用的原理
  
  +  每个模块都有自己的module对象,对象中有一个exports对象,默认是空对象
  ``` js
    var module = {
     exports: {
    
     }
    }
   
  console.log(exports === module.exports)

  exports.foo = 'bar'
  // 等价于
  module.exports.foo = 'bar'


  exports = {}  //这句话写出来, 会断开引用, 其实就是自己搞了个对象, 跟module里面的exports对象没有关系
  // eg:
  /*

  export.a = 123
  export = {}
  export.foo = 'jos'
  module.exports.b = 345

  */
  //log is   [123, 345]

  //  exports = module.exports  //这样就又重新建立关系了

  ```





- npm 
  npm init > 命令完了以后会有一个初始化package.json文件

  + npm 常用命令
  
- express 

初始化项目命令 npm init -y

cmd 命令: > mkdir '目录名'

//公开指定目录(提供静态资源)
app.use('/public/', express.static('./public/'))


## day3 下午总结
- jQuery 的each 和原生js each区别
-  301 302
-  module.exports 和exports的区别
-  require加载规则
  + 优先从缓存加载
  + 核心模块
  + 路径形成的模块
  + 第三方模块
    * node_modules
- package.json 包描述
- npm 常用命令
- express开个头



# day 4 
- 文件操作路径和模块路径
  模块加载的相对路径的./ 不能省略  ; 文件加载的相对路径./可以

- 继续express
  exp_v1文件夹里面

  npm init --yes  (npm来初始化项目)
  npm i -S express (在项目文件下安装需要的东西)

// express 建立一个服务器基本模板代码
```js
var express = require('express')


var app = express()
app.get('/', function(req, res) {  //我本来用了箭头函数,发现nodemon 来启动项目就报错了
    res.send('joshua \' hello1')
})
app.listen(3000, () => {
    console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
})

```

- 修改代码服务器自动重启的工具 nodemon
  npm install --global nodemon
  启动服务器命令从 node app.js >> nodemon app.js


- 路由和静态文件服务 
  路由器 : 请求方法 ,　请求路径, 处理函数

? > 静态资源加载,路径问题. 这一块老是因为路径问题出错

  ``` js
    app.get('/', (req, res) => {
      res.send('hello')
    })

  ```
  静态服务
  // 当以/public/ 开头时候，去./public/目录中拿到对应(/资源名字)资源
  app.ues('./public/', express.static('./public/'))
  
  下面省略第一个参数, 这回导致url路径的变化,好处就是可以省略url路径中的/public/字符串
  app.ues(express.static('public'))
  浏览器访问的时候就直接/文件名就行了
  * 三种方式: 
    app.ues('./public/', express.static('./public/'))   //访问 : /public/**
    app.use(express.static('./public/'))          //访问 : /** (不写./也可以)
    app.ues('/a/', express.static('public'))  // 访问时候 : /a/public/**  

  例如上面第二种方法,也是express官网给的案例用的方式, 如果第一个参数省略了,
  html文件中获取资源的链接就不用写/public/了。直接 href="css/main.css"
  ``` html
    <link rel="stylesheet" href="css/main.css">
  ```
  [官网链接](https://www.expressjs.com.cn/starter/static-files.html)

? > bug > 这里有个小bug,原因还是因为先对路径和绝对路径的原因 > 
// 我自己这样试了，不能访问到资源。
// app.use(express.static('./public/'))
// -------------------------
// 网上查了这种方法,就可以了。自己猜,还是学node.js时候的老问题。不能设定相对路径
app.use(express.static(path.join(__dirname, 'public')))
// ------------------------------------





- 使用air-template模板引擎  
  npm install --save art-template  
  npm install --save express-art-template

  js 文件 
  app.engine('html', require('express-art-template'))



  ）自己享用EJS所以我的 04/feedback-demo 的文件尝试使用EJS模板,这东西官网真TM 
  

  app.set('views', path.join(__dirname, '\\views'));



- req.query  可以直接拿到get请求参数 , 用于解析get请求是带的数据的
  console.log(req.query)

- `req.query`: 解析后的 url 中的 querystring，如 `?name=haha`，req.query 的值为 `{name: 'haha'}`
- `req.params`: 解析 url 中的占位符，如 `/:name`，访问 /haha，req.params 的值为 `{name: 'haha'}`
- `req.body`: 解析后请求体，需使用相关的模块，如 [body-parser](https://www.npmjs.com/package/body-parser)，请求体为 `{"name": "haha"}`，则 req.body 为 `{name: 'haha'}`


- express 处理表单POST请求
```html
    <form action="/post" method="POST">
        <input type="text" name="">
        <input type="submit" name="submit" value="提交">
    </form>
```
express没有内置获取post请求的内容的api, 用body-parser
安装:
npm install --save body-parser

配置:
var bodyParser = require('body-parsr')

/* 配置解析post请求内容的 body-parser*/
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());//经过测试这一样也可以不用写也能用

注意, > 配置模板引擎和 sbody-parser 要在 挂在路由之前
  > 拿到表单内容
  var comment = req.body


- CRUD
keyword: 设定静态资源路径问题、  设定模板引擎的拿到文件路径问题

(- 用临时,写文件的方式存储数据.json格式. 


路由方面
| 请求方法| 请求路径| get/post参数 | 备注
|------|----|------|----|
|get|/ |  | 渲染主页面
|post| /update  | id、name、time| 提交表单
| get | /student/edit| id | 根据id拿到单个数据，进行编辑
| post | /student/deit| id、name、time |  提交修改
| DELETE | 课程讲到还有一个这种请求,这里用get代替


- Router中间件

路由方面新建一个router.js 文件
```js
用这种方式暴露出去
module.exports = function(app) {
  server.get('/' , function(req, res) {

  })

}
```
```js
app.js 那边

var router = require('./router')
var app = express()
// 把路由挂载到 app 中
app.use(router)   //由于router暴露出去的是一个函数,所以app.js 这边拿到的就是一个函数,直接调用，把实例化服务器当做参数传递进去
```

更好的写法
```js 
var router = express.Router()

router.get('/', function (req, res) {
  // console.log(req.session.user)
  res.render('index.html', {
    user: req.session.user
  })
})


module.exports = router
```


- todo 最后用art-template 重写留言板

  下面讲获取post的请求体

- Express 内置没有获取表单POST请求体的API, 用一个body-parser 中间件来搞。
  + app.ues(boayParser.json())
  配置了这个, req 请求对象会多一个属性: body, req.body


- 拿到json文件的数据
  ``` js
    fs.readfile('./students.json', (err, data) => {
      //fs 模块读取文件拿到的是二进制数据,或者字符串
      var students = JSON.parse(data) // 手动转成对象格式

    })
  
  ```

- 路由模块单独放一个文件里面
  


# day 5
- 回调函数

- 数组遍历 Array.prorotype
  find、findIndex、forEach  
  every、some、includes、map、reduce
  
- package-lock.json 文件的作用 node.js有一个教程讲过
- js模块化的知识点
  
- 封装Ajax
  对着官网的写的.   onload函数

``` js
  function get(url, callback) {
    var oreq = new XMLHttpResquest()
    oreq.open('GET', url, true)
    oreq.onload = () => {
      callback()
    }
    oreq.send()
  }
```

### MongoDB

关系型数据库 > 表就是关系, 表与表之间有关系,所有关系型数据库都可以使用sql语言操作
              ,需要设计表结构,数据表还支持约束:唯一、主键、默认值、非空
非关系型数据库 > key-value对

安装 > 
配置环境变量 > C:\Program Files\MongoDB\Server\4.2\bin 默认路径


cmd输入 mongod --version  或者mongo 看看能不能进入


(非)关系型数据库
表就是关系
 + 所有关系型数据库都需要sql语言操作、设计表结构、 还要有约束、主键、默认值、非空
 + 非关系型数据库  是key-vaule 键值对

  * 数据库 > 数据库
  * 数据表 > 集合(数组)
  * 表记录 > (文档对象)
  * 不需要设计表结构
  * 

- 下午



使用 mongod 命令(cmd命令需要在C盘路径下执行) 开启数据库需要手动在c盘里面 /data/db 作为数据存储目录
修改 mongod --dpath=路径

连接数据库
mongo 连接本机服务 
exict 退出连接


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

删除数据
1.带条件删除
>db.user.remove({"name":"zhangshan"});
2.删除所有数据
>db.user.remove({})
3.删除集合
>db.user.drop()
4.删除整个数据库
>show dbs;
>db.user.getDB()
>db.dropDatabase()


添加
```js

var one = new User({
    username: 'admin',
    password: '123',
    email: 'joshua@1532.com'
})

one.save(function(err, ret) {
    if (err) throw console.log('err')
    console.log(ret)
})

```




>>>
[配合菜鸟教程理解一下mongodb的概念](https://www.runoob.com/mongodb/mongodb-databases-documents-collections.html)
mongo :> 在cmd 处连接到了mongodb

use demo1 :> 创建数据库  (此时并没有真的创建,除非我们真的存入了得一个数据)
db.createCollection('articles') :>  创建数据库表/集合  db中叫做collection
show collections :>  查看刚才 use 的数据库下面有哪些 数据库表(collection) . 

db.articles.insert({title:'one', body:'one'});

查看表中的内容
db.articles.find() :> (articles 是 show collections 里面的内容)

<<<



node 中如何操作 MongoDB 
  官方提供的方法
  npm install mongodb --save
  推荐使用第三方
  mongoose  (https://mongoosejs.com/)

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

```

mongodb 基本概念
  数据可以看做是对象集合

Schema 常见字段

https://blog.csdn.net/momDIY/article/details/76285369

var schema3 = new Schema({
  test: {
    type: String,
    lowercase: true, // 总是将test的值转化为小写
    uppercase: true, // 总是将test的值转化为大写
    required:true, //设定是否必填
    default:'star', //设定默认值
    index：true, //设定索引值
    unique：true, //索引值唯一
    sparse：true, //是否启用稀疏索引
    match：RegExp, //判断是否通过正则验证
    enum：Array， //判断test值是否包含于enmu对应的数组中
    min：Number， //判断对应值是否大于等于给定值
    max：Number， //判断对应值是否小于等于给定值
    trim:true //去除数据前后的空格
    capped:1024 //限定大小最大为1024字节
    validate：function，为此属性添加一个验证器函数，如demo1所示
    get：function，//为这个属性定义一个定制的getter Object.defineProperty()。如demo2所示
    set：function，//定义此属性的自定义设置Object.defineProperty()。如demo2所示
  }
});




CRUD 示例代码在 day5 里面mongoose/demo2.js 里面有





- 使用node.js 操作Mysql数据库
  https://www.npmjs.com/package/mysql  这个网页的基本就够用了




- Promise
  callback hell
  


# day 6

Node 中的非模块(其他)成员, __dirname(获取当前文件所属目录的绝对路径) , __filename(文件的绝对路径)
讲到这里的时候,彻底了解,前面 readFile() 读取文件时候, 参数是相对路径为什么报错了。和终端当前运行的目录有关系, 
解决办法就是使用绝对路径, 但是又不能写死, 所以用node给的接口




关于模板方面的知识点再讲
[art模板语法的学习](https://www.cnblogs.com/xcsn/p/8301841.html)
[一个简书的文章上](https://www.jianshu.com/p/b5dffff259be)
[简述的文章下](https://www.jianshu.com/p/e7f3d0c93ed3)

layout.html >
```html
<body>
  {{ include './header.html' }}
  {{ block 'content' }}
    <h1> 默认内容 </h1>
  {{ block }}
</body>

```
使用的那边 html
{{ extend './layout.html' }}

{{ block 'content'}}
  <h4>joshua 填充内容</h4>
{{ /block}}



day6-09 用户数据模型 >  user.js

处理注册请求



)-express 提供了 json 返回响应函数  
res.statue(200).json({})


表单的同步请求和异步请求

表单具有默认的提交行为，默认是同步的，同步表单提交，浏览器会锁死（转圈儿）等待服务端的响应结果。
表单的同步提交之后，无论服务端响应的是什么，都会直接把响应的结果覆盖掉当前页面。

后来有人想到了一种办法，来解决这个问题。

? >  前端的表单是用ajax的异步方式,但是,后端处理信息用json()响应前端以后会导致前端页面直接现实json格式的字符串, (如果是form表单默认的提交方式,会导致这种情况,但是这里还是出现了这种情况.)

```js
    $('#uiser-register').on('submit', function(e){
        e.preventDefault()
        var formData = $(this).serialize

        $.ajax({
            url: '/register',
            type: 'post',
            data: formData,
            dataType: 'json',
            success: function(msg) {
                console.log(msg)
            }
        })
    })


return res.status(200).json({
    status_code: 1,
    message: 'finded one, placese try again'
})
```

? > ajax异步请求,那块服务器响应数据不是很明白. 关于res.json导致页面覆盖渲染, 临时保存上一次输入数据,重定向...



session 保存会话,记录状态

对session, cookie, token 理解的文章

[1](https://segmentfault.com/a/1190000009663833)

[2](https://www.cnblogs.com/chenchenluo/p/4197181.html)

[3](https://www.zhihu.com/question/51759560/answer/332128488)

[4](https://zhuanlan.zhihu.com/p/63061864)

[5](https://www.zhihu.com/question/315397046/answer/695069994)

[6](https://segmentfault.com/a/1190000016376558?utm_source=sf-related)

1.npm install --save express-session 中间件

2.配置
  var session = require('express-session')
    app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

3.使用 req.session 来访问设置数据

eg: 添加成员, req.session.isLogin = true  读取成员, req.session.isLogin 

session中间件后面会帮我们处理 cookies的写入和读取的逻辑, 我们只需要知道 req.session.下面直接读取写入就可以了。不过他这个req 有点反逻辑

默认session的内容存储到内存中的。


- 一般案例的基本步骤

其实写的时候一切都从需求出发,

1. 目录结构
```js
-- app.js
-- models/          存放mongoose设计的数据表模型
-- node_modules/    存放包地方
-- package.json     项目配置文件
-- public/          公共的静态文件 html、js、css
-- router.js        处理路由逻辑
-- views/           存放视图(html)目录 ,也可以放到public/里面 
-- REMADE.md        
```
1. 视图页面设计    
2. 数据库方面的表设计       
3. 路由设计 


# day 7


