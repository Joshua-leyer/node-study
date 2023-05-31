
const { Article } = require('../models/articles')
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const log = console.log
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
    let id = mongoose.Types.ObjectId(req.params.id);
    log('----------------------------------')
    Article.findById({_id: id}).lean().exec(function(err, data) {
        log('=========================================')
        if (err) throw err;
        else {
            console.log(data)
            // console.log('req.url is ', req.url)
            res.render('./user/post.html', {data})
        }
    })
    // console.log(article)
    // res.render('./user/post.html', article)
    // var myId = JSON.parse(req.params.id);
    // var id = mongoose.Types.ObjectId(req.params.id);
    // console.log('req,parms is ', id)
    // Article.findOne({"_id": ObjectId(req.params.id).toString() }, function(err, data) {
    //     if (err) throw err;
    //     else {
    //         // data.toObject({ getters: true })
    //         console.log(data)
    //         // console.log('req.url is ', req.url)
    //         return res.render('./user/post.html', {data})
    //     }
    // })
}




const articlesPage = (req, res) => {
    res.send('articles list page')
}


module.exports = {
    index,
    watchArticle,
    articlesPage
}