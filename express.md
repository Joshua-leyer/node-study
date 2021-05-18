
# other home

(bilibili的一个黑马的教程)https://www.bilibili.com/video/BV1Ns411N7HU?from=search&seid=15274980466092256358

[bilibili, 1小时搞定NodeJs(Express)的用户注册、登录和授权](https://www.bilibili.com/video/BV1Nb411j7AC?from=search&seid=4522291517950492672)

(求知网的一个 node 方面的教程) https://www.qiuzhi99.com/playlists?q%5Bnode_id_eq%5D=2


(mooc的一个教程)  Node.js 从零开发web server博客项目 

https://www.yiibai.com/nodejs/nodejs_express_framework.html


(b站一个人自己发的教程)https://www.bilibili.com/video/BV1HV41127db?p=47

(一个人的实战视频)https://www.bilibili.com/video/BV1T7411g73H?p=62


https://www.bilibili.com/video/BV1ca4y1n7u3?p=95


[一个人的博客文章](https://www.cnblogs.com/500m/category/1477365.html)

[知乎一个文章讲, express核心原理](https://zhuanlan.zhihu.com/p/56947560)


Vue + Node 前后端商城项目  [https://www.bilibili.com/video/BV1vJ411s7dR?p=148]

（持续更新中）快速掌握Webpack核心概念【Webpack】  https://www.bilibili.com/video/BV12a4y1W76V?from=search&seid=14059220905690217598

# Learning Log start

? > express 中的ues()函数作用
done > 可能需要先理解中间件是什么  ? > znode.md


mongoodb > :

[关于mongodb入手要了解的文章](https://jzleung.github.io/2016/08/13/mongoose-guide/)



session 方面:

https://wiki.jikexueyuan.com/project/node-lessons/cookie-session.html

cookie session token:

https://segmentfault.com/a/1190000039303557?utm_source=sf-related

https://www.cnblogs.com/JamesWang1993/p/8593494.html


? > express 的 app.locals 与res.locals是什么，有什么用？
https://cnodejs.org/topic/579ab34af0d4b46026ba55eb



## router方面

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

## 中间件

app.use('/admin', adminRouter)  
// app.use() 可以用来当做路由拦截一样的东西,门, 当解析到有/admin就走这里面的路由

app.use(function(req, res, next) {
    //注意这里的位置关系.如果我把这里写到被截取的路由后面了.那在解析到这一行之后就已经被别的中间件
    // 拦截了.这一行也不会被执行.
    console.log('* route')
    next()
})



### 




User.db.dropCollection('users')