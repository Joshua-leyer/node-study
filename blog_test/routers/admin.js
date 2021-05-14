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


// */admin/articles
const articlesManage = (req, res) => {
    Article.find({}, function(err, data) {
        if (err) throw err;
        console.log(data)
        res.render('./admin/articlesList.html',{data})
    })
}

// */admin/article/add
const addArticle = (req, res) => {
    res.render('./admin/createArticle.html')
}

// */admin/article/:id
const deleteArticle = (req, res) => {
    let id = req.params.id
    res.send('delete Article')
}

//编辑页面 */admin/article/edit/:id
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
    login,
    addArticle,
    loginPage,
    articlesManage,
    deleteArticle,
    editArticle,
    updateArticle
}