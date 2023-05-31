### token 
? > [what](https://blog.csdn.net/qq_40884473/article/details/78442377)

### async

关于异步的函数学习


### bcrypt
https://www.jianshu.com/p/ae371c583cca

### jsonwebtoken
[](https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

[](https://segmentfault.com/a/1190000009494020)


### Authorization  

HTTP协议中的 Authorization 请求消息头含有服务器用于验证用户代理身份的凭证，通常会在服务器返回401 Unauthorized 状态码以及WWW-Authenticate 消息头之后在后续请求中发送此消息头。

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Authorization

```js
// 这里的type的地方只是个规范,可写,可不写 (Bearer)
Authorization: Bearer 'token'


```

### ? > 关于中间件 use 等理解

[官网](https://expressjs.com/zh-cn/guide/using-middleware.html)
官网给出了解释,第一次没看懂,看了这个教程案例,复习文档,
使用use 来添加中间件(其实就是个函数),那只要服务器接收到请求就会先执行这段代码,官网对这类中间件函数的分类叫做,应用层中间件.
看下面代码 myLogger函数, 我们使用use来挂载到app上面。
那每次有请求(任何请求)都会先执行myLogger函数(如果本函数不也是最终函数一定要写三个参数,并且最后调用next() )
```js   app2.js
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);

```
可以看到服务器运行以后会打印 LOGGED 字符串。然后想客户端发送hello
现在我们吧use,改成别的写法。不使用use

```js

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

```
此时就是在请求/ 路径时候才会运行myLogger函数,然后运行后面的内容

当然使用use挂载也可以 通过路径进行筛选是否执行
``` js
// 挂载至/user/:id的中间件，任何执行/user/:id的请求都会执行它
app.use('/use/:id',(req,res,next) => {
    console.log('Request Type',req.method);
    next();
})
```



### ?  > mongoose 的使用
专门写到一个大的文件里面。

? > 注册用户的时候 用户验证唯一性是models.js 里面
数据库做的 但是, 具体捕获错误返回给前端,如何捕获错误

###  需要去了解用户登录的机制 , 用户登录常用的机制有哪些?
[文章1](https://www.jianshu.com/p/421e7105a529)


? > 不清楚这个token前端拿到以后应该如何保存到 session 或者sessionStorage里面
