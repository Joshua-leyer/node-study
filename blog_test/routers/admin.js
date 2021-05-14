const { Article } = require('../models/articles')

const index = (req, res) => {
    Article.find({}, function(err, data) {
        if (err) throw err;
        res.send(data)
    })
    // res.send('articles admin page')
}

const loginPage = (req, res) => {
    res.send('login page')
}

// admin 文章列表管理页面
const articles = (req, res) => {
    Article.find({}, function(err, data) {
        if (err) throw err;
        res.send(data)
    })
}

const addArticle = (req, res) => {
    res.send('addArticle page')
}

const deleteArticle = (req, res) => {
    let id = req.params.id
    res.send('delete Article')
    // Article.findById
}

//编辑页面
const editArticle = (req, res) => {
    let id = req.params.id
    res.send('artilce edit page')
}

//更新文章
const updateArticle = (req, res) => {
    let id = req.params.id
    res.send('article update ')
}


module.exports = {
    index,
    addArticle,
    loginPage,
    articles,
    deleteArticle,
    editArticle,
    updateArticle
}