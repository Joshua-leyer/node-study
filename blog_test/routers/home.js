
const { Article } = require('../models/articles')

// get / 
const index = async (req, res) => {
    await Article.find({}, function(err, data) {
        if (err) throw err;
        else {
            // console.log('/ 拿到的文章是', data)
            res.render('./user/index.html', {data})
        }
    })
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