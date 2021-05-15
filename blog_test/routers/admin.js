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


// get */admin/articles
const articlesManage = (req, res) => {
    Article.find({}, function(err, data) {
        if (err) throw err;
        console.log(data)
        res.render('./admin/articlesList.html',{data})
    })
}

// get */admin/article/create
const createArticle = (req, res) => {
    res.render('./admin/createArticle.html')
}

// post /admin/article/add
const addArticle = (req, res) => {
    let data = req.body
    console.log(data)

    res.send('get article data')
}

// delete /admin/article/:id
const deleteArticle = (req, res) => {
    res.send('delete Article')
    let query = {_id: req.params.id}
    Article.remove(query, function(err) {
        if (err) throw err
        res.send('delete article ok')
    })
}

// get  /admin/article/edit/:id
const editArticle = (req, res) => {
    let id = req.params.id
    res.send('artilce edit page')
}

// get   /admin/article/update
const updateArticle = (req, res) => {
    let id = req.params.id
    res.send('article update ')
}


module.exports = {
    login,
    createArticle,
    addArticle,
    loginPage,
    articlesManage,
    deleteArticle,
    editArticle,
    updateArticle
}