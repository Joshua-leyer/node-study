
## 资料


[bilibili,1小时搞定NodeJs(Express)的用户注册、登录和授权](https://www.bilibili.com/video/BV1Nb411j7AC?from=search&seid=4522291517950492672)


[一个人的博客文章](https://www.cnblogs.com/500m/category/1477365.html)

[知乎一个文章讲, express 核心原理](https://zhuanlan.zhihu.com/p/56947560)


[求知网的一个node方面的教程](https://www.qiuzhi99.com/playlists?q%5Bnode_id_eq%5D=2)  




## Learning Log 


##### 基本概念

- 中间件: 是一个函数, 在请求和响应周期中被顺序调用

  https://expressjs.com/zh-cn/guide/using-middleware.html
  
  ~~其实最开始看官网并不能看出其中的妙处.~~
  如果是前端转后端，最开始学的，根本看不明白，等回过头来看发现都知道怎么回事了。加上但是没有一点 web server 开发的预备知识。
  
  + app.get 可以看做是特殊的 app.use() ，因为它的特殊，限定了请求类型。
    ```js
    app.use(function(req, res, next) {
        next()  要写上 next(), 否则会导致程序执行中间件完成后不动
    })
    ```
:grey_exclamation: 注意中间件的位置应该写到请求处理函数的前面



- 路由: 应用响应请求的规则
[官网 Router 中间件](https://expressjs.com/zh-cn/guide/using-middleware.html#middleware.router)


#### 知识点

- 异常处理: 本质也是一个中间件，处理异常用的函数

    ```js
    app.get('/', function(req, res) {
    throw new Error('err...')
    })

    function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(500).json({
        error: -1,
        msg: err.toString()
    })
    }
    app.use(errorHandler)
    ！！！ 注意异常处理函数的位置,应该在最后
    ```


- 常规拿参数
    /path/:id,参数在 req.params.id 中
    /path?id=xx,参数在 req.query.id 中
    用json body 或者form 表单传参时参数在req.body中


- express delete路由的知识点
    ```js
    $.ajax({
        type: 'delete',
        url: '/article/' + id,
        success: function() { }
    })

    >>> app.js 
    app.delete('/article/:id', function(req, res) { })
    ```






- 配置静态文件

    需要配置模板引擎才能用 app.render() , 否则就没有render这个函数来使用

    [官网--开启静态文件](https://expressjs.com/zh-cn/starter/static-files.html)

    >app.use(express.static(path.join(__dirname, 'public')))
    >app.use(express.static(path.join(__dirname, 'node_modules')))

- ~~安装art-template模板引擎~~
    + [Express：模板引擎深入研究](https://www.cnblogs.com/chyingp/p/express-render-engine.html)
    + [~ express ~ 模板引擎的配置与使用](https://www.cnblogs.com/500m/p/10980332.html)
    ```js
    npm i art-template && express-art-template
    ```
    ``` js
    //当渲染的文件是 以.html 后缀名的 使用express-art-template引擎
    app.engine('html', require('express-art-template'))
    //修改 views默认的存储目录
    server.set('views', path.join(__dirname, './public/views/')) 
    // 默认就是 ./views 目录
    ```


- express 使用 session

    [前后端接口鉴权全解 Cookie/Session/Token 的区别](https://segmentfault.com/a/1190000039303557?utm_source=sf-related)

    详细的其他笔记会有
    
    :exclamation: 在 node-code 仓库中慕课网个人博客-320 的文件有详细的使用session。 其中最难理解的就是req.session的设置读取方式，奇葩的逻辑。



- 一个简单的通用模板

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
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

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

- ~~关于 flash 信息~~
    keyWord : express 添加flash信息
    基于 session 来实现跳转页面还能保留一些信息

    > npm i express-session
    > npm i connect-flash 
    > npm i express-messages  这个库需要 connect-flash 

    ~~这里 express-messages 基于 express-session 和 connect-flash 中间件上的.最好不要用了。搞不明白.~~
    时候前后端代码开发分离的方式，不需要这个库。


- 这种可以当做拦截器使用，所有的路径都会经过这个中间件函数，在 code 的位置顺序需要注意.
    ```js
    serve.use('*', function(req, res, next) {
        console.log('use my router middleware')
        res.send('router use ok!')
    })
    ```

- body-parser 中间件 , 可以让 express 应用更方便的收到 post 请求的数据内容
	 4.x 以后 body-parser 可以不用引用了，直接引用下面两个内置的函数即可
		
		原来需要引用 body-parser。
		const bodyParser = require('body-parser');
		const app = express();
		// 使用 body-parser 中间件解析 JSON 数据和 URL 编码的数据
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		
		4.x以后不需要引用直接使用内置的
		app.use(express.json())   解析 application/json 格式的数据
        app.use(express.urlencoded({ extended: false }));  解析 x-www-form-urlencoded 格式
        
:sob::weary: 不知道为什么，以前记得笔记，总是把很基础的东西给写在这里，且不系统。 也难怪，当时看的是黑马的一个教程，
培训机构的视频都是这样，告诉你这样这样写，不说为什么。知识点很碎片化，甚至不知道这一块代码写的，属于什么知识。
