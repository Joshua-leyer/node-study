const mongoose = require('mongoose')
const moment = require('moment')

let Schema = mongoose.Schema

const ArticleSchema = new Schema({
    tittle: {
        type: String,
        required: true
    },
    auther: {
        default: '玉米羹',
        type: String,
    },
    body_mk: {
        type: String,
        // required: true
    },
    body_html: {
        type: String,
        // required: true
    },
    // labels: {
    //     type: Array
    // },
    created:{
        type: Date,
        default: Date.now(),
        get(val){
            return moment(val).format('YYYY-MM-DD')
        }
    }
})

ArticleSchema.set('toObject', { virtuals: true })

const Article = mongoose.model('Article', ArticleSchema)


// Article.create({tittle:'派大星和海绵宝宝', body: "jaisdfhjaiosdfasdi"})



module.exports = { Article }

