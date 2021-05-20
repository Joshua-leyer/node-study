
const { Article } = require('../models/articles')
const ObjectId = require('mongodb').ObjectId;

// get / 
const index = async (req, res) => {
    await Article.find({}, function(err, data) {
        if (err) throw err;
        else {
            console.log('/拿到的文章是', data)
            
            // data.forEach(item => {
            //     console.log(typeof item.title)
            // })

            res.render('./user/index.html', {data})
        }
    })
}

// article page  /post/:id
const watchArticle = (req, res) => {
    let id = req.params.id
    Article.findById({_id: ObjectId(id)}, function(err, data) {
        if (err) throw err;
        else {
            console.log(data)
            // console.log('req.url is ', req.url)
            return res.render('./user/post.html', {data})
        }
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