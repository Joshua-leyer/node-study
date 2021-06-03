
const { Article } = require('../models/articles')
<<<<<<< HEAD
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const log = console.log
=======
let mongoose = require('mongoose');

>>>>>>> 7f5781bcf930042a98179cf3dad5cf008644f33a
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
<<<<<<< HEAD
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
=======
const watchArticle = async (req, res) => {
    // let id = mongoose.Types.ObjectId(req.params.id);
    let id = req.params.id
    console.log(id)
    // let article = await Article.findById(id);
    Article.findById(id, function(err, data) {
        if (err) throw err;
        data = JSON.stringify(data);
        data = JSON.parse(data)
        console.log(data)
        res.render('./user/post.html', {article: data})
>>>>>>> 7f5781bcf930042a98179cf3dad5cf008644f33a
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