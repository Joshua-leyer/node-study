const mongoose = require('mongoose')

var Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    auther: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now()
    }
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = { Article }

