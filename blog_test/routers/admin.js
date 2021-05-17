const { Article } = require('../models/articles')



// post */admin/login
const login = (req, res) =>{
    console.log('get post is', req.body)
    const { username, password } = req.body
    res.send(req.body)
}

// get /admin/login
const loginPage = (req, res) => {
    res.render('./admin/login.html')
}


// get /admin/articles
const articlesManage = (req, res) => {
    Article.find({}, function(err, data) {
        if (err) throw err;
        console.log(data)
        // req.flash('error', '错误')
        res.locals.current = 'home'
        res.render('./admin/articlesList.html',{data})
    })
}

// get /admin/article/add   page
const addArticle = (req, res) => {
    res.render('./admin/createArticle.html')
}

// post /admin/artilce/create
const createArticle = (req, res) => {
    console.log(req.body);
    let article = new Article({
        title: req.body.title,
        body: req.body.body
    })
    article.save(function(err) {
        if (err) {
            console.log(err);
            next(err)
        }
        console.log('save article is', article)
        // res.send('ok')
        // req.flash("info")
        res.redirect('/admin/articles')
    })
}


// delete /admin/article/delete/:id
const deleteArticle = (req, res) => {
    console.log('datele function')
    let query = {_id: req.params.id}
    console.log('delete', query)
    Article.remove(query, function(err) {
        if (err) {
            console.log(err)
        }
        res.send('delete Article')
    })
}

// get */admin/article/edit/:id
const editArticle = (req, res) => {
    Article.findById({_id: req.params.id}, function(err, data) {
        if (err) throw err;
        console.log('edit find article ', data)
        res.render('./admin/editArticle.html', {data})
    })
    // res.send('artilce edit page')
}

// post 更 新文章
const updateArticle = (req, res) => {
    let id = req.params.id
    let query = { _id: req.params.id}
    // let data = {}

    // 这里更新关于mongodb设计存储的问题
    Article.update(query, req.body, function(err) {
        if (err) {
            console.log(err)
            res.send('update article err')
        } else {
            res.send('update ok')
        }
    })
    // res.send('article update ')
}


module.exports = {
    login,
    addArticle,
    createArticle,
    loginPage,
    articlesManage,
    deleteArticle,
    editArticle,
    updateArticle
}