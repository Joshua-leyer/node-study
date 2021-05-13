const express = require('express')

const ArticleRouter = express.Router()


ArticleRouter.get('/', function(req, res) {
    console.log(req.query)
    
    res.send('/ path get')
})

// _id: 609bccec484d6126b448663a
// url : ?id=609bccec484d6126b448663a
ArticleRouter.get('/:id', function(req, res) {
    // let _id = '609bccec484d6126b448663a'
    // let _id = req.
    console.log(req.params.id)
    Article.findOne({_id: req.params.id}, function(err, data) {
        if (err) throw err;
        console.log('/articles/id is', data)
        res.send('article/id')
    })
    res.send('/articles/id path')
})

ArticleRouter.post('/add', function(req, res) {
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

})

ArticleRouter.get('/list', function(req, res) {
    Article.find({}, function(err, data) {
        if (err) throw err;
        console.log('find data is : ', data)
        res.send(data)
    })
})


ArticleRouter.post('/create', function(req, res) {

    // let article = new Article(req.body) , 在保证数据格式一致的情况可以
    console.log(req.body.title)
    // let article = new Article();
    // article.title = req.body.title;
    // article.author = req.body.author;
    // article.body = req.body.body;
    let article = new Article(req.body)

    article.save(function(err, data) {
        if (err) throw err;
        console.log('save data is', data)
        res.send(data)
    })
})



//不要用 {}导出

module.exports = ArticleRouter 