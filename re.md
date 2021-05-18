

# ??



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
