const mongoose = require('mongoose')

var Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    auther: {
        default: '玉米羹',
        type: String,
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

// ArticleSchema.set('toObject', { virtuals: true })

const Article = mongoose.model('Article', ArticleSchema)


module.exports = { Article }

