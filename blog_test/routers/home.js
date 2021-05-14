
const { Article } = require('../models/articles')

const index = (req, res) => {
    res.send('Welcome to my Blog')
}

// article page  url: /id   router: /:id
const watchArticle = (req, res) => {
    let id = req.params.id
    Article.find({id}, function(err, data) {
        if (err) throw err;
        res.send('articles Page is :', data)
    })
}
const articlesPage = (req, res) => {
    res.send('articles list page')
}


module.exports = {
    index,
    watchArticle,
    articlesPage
}