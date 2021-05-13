const express = require('express')
const { Article } = require('./mongo')

const ArticleRouter = express.Router()


function auth(req, res, next) {
    //核心是判断当前是否登录了
    if (req.session.user){
        return next()
    }
    // if (req.session.user !== false) 
    //没有登录就重定向让他去登录去
    // learnning log> 发现一个有趣的关于路由的问题, 如果res.redirect('user/login') 实际就会到
    // 当前 中间件或者说环境的那个路由下的路径 也就是 /articles/users/login  所以最前面要加上/
    // 知识点express 路由规则
    res.redirect('/users/login')
}


// admin首页, 留着
ArticleRouter.get('/', function(req, res) {
    console.log('/ path')
    res.send('/ path get')
})

// auth用来判断是否登录中间件
// 文章创建页面
ArticleRouter.get('/add', auth, function(req, res) {
    res.send('')

    // one.save(function(err, doc) {
    //     if (err) throw err;

    //     console.log('save success : ', doc)
    // });

})

//文章列表页面
ArticleRouter.get('/list', function(req, res) {
    Article.find({}, function(err, data) {
        if (err) throw err;
        console.log('find data is : ', data)
        res.send(data)
    })
})








//新建文章post请求
ArticleRouter.post('/create', function(req, res) {

    // let article = new Article(req.body) , 在保证数据格式一致的情况可以
    console.log(req.body.title)
    // var one = new Article({
    //     title: 'Felyne',
    //     author: 'joshua',
    //     body: 'jasdiofpasdj'
    // });
    
    let article = new Article(req.body)

    article.save(function(err, data) {
        if (err) throw err;
        console.log('save data is', data)
        res.send(data)
    })
})




// _id: 609bccec484d6126b448663a
// url : ?id=609bccec484d6126b448663a
ArticleRouter.get('/deit/:id', function(req, res) {
    let _id = '609bccec484d6126b448663a'
    console.log(req.params)
    Article.findOne({_id: _id}, function(err, data) {
        if (err) throw err;
        console.log('/articles/id is', data)
        res.send('article/id')
    })
})




//不要用 {}导出

module.exports = ArticleRouter 