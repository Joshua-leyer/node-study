##

Learn Href : 
[1小时搞定NodeJs(Express)的用户注册、登录和授权](https://www.bilibili.com/video/BV1Nb411j7AC/?spm_id_from=333.999.0.0&vd_source=d91978ae5c46d3cddb533eb8dfa0a7bb)


-------------------

REST Client vscode插件 , 可以在 vscode 代码里发送 http 请求，类似 postman

server.js 核心逻辑都完成了, 不整合代码版本, 方便学习

server_v1.js 多数情况下有很多个接口都会判断是否携带token
，所以需要整理一些代码，把判断的部分抽离处理。（/profile）. 这是利用 express 中间件实现的

# 

结合http请求头, 请求体的知识. 
在解析req的数据的时候. req.body拿到 application/json 格式的表单数据,  body . 经常写req.body 突然发现和前面http请求的知识连起来了.  表单内容在请求体内.


## Mongoose 怎么捕获错误

## bcrypt 加密数据的一个库的使用

```js
    password: {
        type: String,
        set(val){
            // hashSync 操作数据库,  这里我们使用同步的方法.
            return require('bcrypt').hashSync(val, 10)
        }
    }
```



