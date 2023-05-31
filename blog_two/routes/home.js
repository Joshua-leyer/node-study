const express = require('express');
const router = express.Router();

const { Article } = require('../models/articles')
const mongoose = require('mongoose');

const log = console.log;



router.get('/', async (req, res) => {
    log('enter / path')
    await Article.find({}).sort({_id: -1}).then( function(doc) {
        log('/ get articles is >>>>', doc)
        res.render('./home/index.html', {doc: doc})
    }).catch( function(error) {
        throw error
    })
})

router.get('/about', (req, res) => {
    res.render('./home/about.html')
})

router.get('/projects', (req, res) => {
    res.render('./home/project.html')
})

router.get('/post/:id', async (req, res) => {
    log('enter /post/id path')
    let id = mongoose.Types.ObjectId(req.params.id);
    
    try {
        
        let doc = await Article.findById({_id: id}).exec();
        if (doc) {
            let r_doc = await Article.findOne({'_id': {'$lt': id}}).sort({_id: -1}).exec()
            let l_doc = await Article.findOne({'_id': {'$gt': id}}).sort({_id:  1}).exec()
            let data = {
                doc,
                l_doc,
                r_doc
            }   
            log('post/ path get doc is >>>>', data)
            res.render('./home/post.html', {data})
        }
    } catch (err) {
        throw err
    }



    // await Article.findById({_id: id}, function(err, doc) {
    //     if (err) throw err;
    //     let data = {};
    //     Article.findOne({'_id': {'$lt':　id}}).sort({_id: -1}).exec((err, doc) =>{
    //         if (err) throw err;
    //         data.l_doc = doc
    //         log('lArticle is >>>', data)
    //     })
    //     Article.findOne({'_id': { '$gt': req.params._id }}).sort({ _id: 1 }).exec((err, doc) => {
    //         if (err) throw err;
    //         data.r_doc = doc
    //     })

    //     data.doc = doc
    //     log('post/ path get doc is >>>>', data)
    //     // res.send(doc)
    //     res.render('./home/post.html', {data})
    // })
})


module.exports = router;
